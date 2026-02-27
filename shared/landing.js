/* eslint-disable no-undef */
/**
 * SEO Landing Page Renderer
 *
 * Reads window.LANDING_CONFIG, window.LANDING_CONTENT, window.GAMES, window.CATEGORIES
 * Renders category pages and grade-specific sub-pages
 * Injects JSON-LD, breadcrumbs, grade pills, game cards, FAQs, and footer
 */

(function () {
  'use strict';

  /**
   * Get the base path for resources (computed from rootPath in config)
   */
  function getResourcePath(resource) {
    const config = window.LANDING_CONFIG || {};
    const root = config.rootPath || '../../../';
    return root + resource;
  }

  /**
   * Get path to a game's page
   */
  function gamePath(gameId) {
    const config = window.LANDING_CONFIG || {};
    const root = config.rootPath || '../../../';
    return `${root}games/${gameId}/index.html`;
  }

  /**
   * Get path to portal
   */
  function portalPath() {
    const config = window.LANDING_CONFIG || {};
    const root = config.rootPath || '../../../';
    return `${root}index.html`;
  }

  /**
   * Get path to category page (used by grade pages)
   */
  function categoryPath() {
    return '../index.html';
  }

  /**
   * Check if a game is "new"
   */
  function isNew(game) {
    if (!game.newUntil) {
      return false;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiryDate = new Date(game.newUntil);
    expiryDate.setHours(0, 0, 0, 0);
    return today < expiryDate;
  }

  /**
   * Inject dynamic CSS for game thumbnails and patterns
   * Copy of portal.js:injectThumbStyles()
   */
  function injectThumbStyles() {
    const style = document.createElement('style');
    let css = '';

    (window.GAMES || []).forEach(function (game) {
      if (game.thumbClass) {
        css += `.thumb.${game.thumbClass} { background: ${game.gradient}; }\n`;

        if (game.pattern) {
          css += `.thumb.${game.thumbClass}::before { `;
          css += "content: ''; ";
          css += 'position: absolute; inset: 0; ';
          css += `background: ${game.pattern}; `;
          if (game.patternSize) {
            css += `background-size: ${game.patternSize}; `;
          }
          if (game.patternPosition) {
            css += `background-position: ${game.patternPosition}; `;
          }
          css += '}\n';
        }
      }
    });

    style.textContent = css;
    document.head.appendChild(style);
  }

  /**
   * Get games for this landing page
   * If grade is set, filter by game.grades array (single source of truth: GAMES)
   * Otherwise, return all games in category
   *
   * SMART: Grades are declared in GAMES entries, not duplicated in landing-content.js
   */
  function getGamesForPage() {
    const config = window.LANDING_CONFIG || {};
    const games = window.GAMES || [];
    const categoryId = config.categoryId;

    if (!categoryId) {
      console.error('LANDING_CONFIG.categoryId is required');
      return [];
    }

    // Filter games by category
    const categoryGames = games.filter(function (g) {
      return g.category === categoryId;
    });

    // If no grade, return all category games
    if (!config.grade) {
      return categoryGames;
    }

    // Filter by grade: games must have this grade in their grades array
    const grade = config.grade;
    const gradeGames = categoryGames.filter(function (g) {
      return g.grades && g.grades.includes(grade);
    });

    // If no games for this grade, fall back to all category games
    if (gradeGames.length === 0) {
      console.warn(
        `No games with grade ${grade} in category ${categoryId}; showing all ${categoryId} games`
      );
      return categoryGames;
    }

    return gradeGames;
  }

  /**
   * Build game card HTML (identical to portal.js)
   */
  function buildGameCard(game) {
    const thumbClass = game.thumbClass ? ` ${game.thumbClass}` : '';
    const thumbStyle = game.thumbClass ? '' : ` style="background: ${game.gradient}"`;
    const newBadge = isNew(game) ? '<span class="badge-new">New</span>' : '';
    const iconStyle = game.iconColor ? ` style="color: ${game.iconColor};"` : '';

    const html =
      `<a class="game-card" href="${gamePath(game.id)}" id="${game.id}">` +
      `<div class="thumb${thumbClass}"${thumbStyle}>${newBadge}` +
      `<i class="ti ${game.icon}"${iconStyle}></i></div>` +
      '<div class="card-overlay">' +
      `<div class="card-title">${game.name}</div>` +
      `<div class="card-desc">${game.desc}</div>` +
      '<span class="card-play"><i class="ti ti-player-play"></i> Play</span>' +
      '</div></a>';

    return html;
  }

  /**
   * Render navbar with back link and nav count
   */
  function renderNavbar(root) {
    const config = window.LANDING_CONFIG || {};
    const categories = window.CATEGORIES || [];
    const games = window.GAMES || [];
    const content = window.LANDING_CONTENT || {};

    const navbar = root.querySelector('.navbar');
    if (!navbar) {
      return;
    }

    const gameCount = games.length;
    const catCount = categories.length;

    navbar.innerHTML =
      '<div class="navbar-inner">' +
      `<a href="${portalPath()}" class="brand">` +
      '<div class="brand-mark"><i class="ti ti-palette-2"></i></div>' +
      '<div class="brand-name">Doodles</div>' +
      '</a>' +
      `<div class="nav-count">${gameCount} games · ${catCount} subjects</div>` +
      '</div>';
  }

  /**
   * Render hero section with gradient, title, subtitle, and breadcrumb
   */
  function renderHero(root, categoryId, gradeLabel) {
    const categories = window.CATEGORIES || [];
    const content = window.LANDING_CONTENT || {};

    const cat = categories.find(function (c) {
      return c.id === categoryId;
    });
    if (!cat) {
      return;
    }

    const heroContent = content[categoryId];
    if (!heroContent) {
      return;
    }

    const hero = root.querySelector('.lp-hero');
    if (!hero) {
      return;
    }

    // Set gradient inline
    hero.style.background = cat.gradient;

    let html = '<div class="lp-hero-content">';

    // Breadcrumb (only on grade pages)
    if (gradeLabel) {
      html += '<nav class="lp-breadcrumb">';
      html += `<a href="${portalPath()}">Doodles</a>`;
      html += '<span class="sep">›</span>';
      html += `<a href="${categoryPath()}">${cat.label}</a>`;
      html += '<span class="sep">›</span>';
      html += `<span class="lp-breadcrumb-current">${gradeLabel}</span>`;
      html += '</nav>';
    }

    // H1
    let h1Text = '';
    if (gradeLabel) {
      h1Text = `Free ${cat.label.toLowerCase()} Games for ${gradeLabel}`;
    } else {
      h1Text = `${cat.label} Games for Kids`;
    }
    html += `<h1>${h1Text}</h1>`;

    // Subtitle
    html += `<p class="lp-hero-subtitle">${heroContent.heroSubtitle}</p>`;

    html += '</div>';
    hero.innerHTML = html;
  }

  /**
   * Render main article content
   */
  function renderArticle(root, categoryId, gradeLabel, games) {
    const categories = window.CATEGORIES || [];
    const content = window.LANDING_CONTENT || {};

    const cat = categories.find(function (c) {
      return c.id === categoryId;
    });
    if (!cat) {
      return;
    }

    const heroContent = content[categoryId];
    if (!heroContent) {
      return;
    }

    const article = root.querySelector('.lp-article');
    if (!article) {
      return;
    }

    let html = '';

    // Intro paragraphs
    html += '<div class="lp-intro">';
    (heroContent.introParagraphs || []).forEach(function (para) {
      html += `<p>${para}</p>`;
    });
    html += '</div>';

    // Grade pills (only on category pages, not grade pages)
    if (!gradeLabel && heroContent.grades && heroContent.grades.length > 0) {
      html += '<div class="lp-grade-nav">';
      html += '<h2><i class="ti ti-school"></i> Browse by Grade</h2>';
      html += '<div class="lp-grade-pills">';
      heroContent.grades.forEach(function (grade) {
        html += `<a href="${grade.slug}/index.html" class="lp-grade-pill">${grade.label}</a>`;
      });
      html += '</div>';
      html += '</div>';
    }

    // Games section
    html += '<section class="lp-games">';
    html += `<h2><i class="ti ti-gamepad-2"></i> All ${cat.label} Games</h2>`;
    html += '<div class="cards-row">';
    games.forEach(function (game) {
      html += buildGameCard(game);
    });
    html += '</div>';
    html += '</section>';

    // Why It Works section
    if (heroContent.whyItWorks) {
      html += '<section class="lp-detail">';
      html += `<h2><i class="ti ti-lightbulb"></i> ${heroContent.whyItWorks.heading}</h2>`;
      (heroContent.whyItWorks.paragraphs || []).forEach(function (para) {
        html += `<p>${para}</p>`;
      });

      if (heroContent.whyItWorks.gameBlurbs) {
        html += '<div class="lp-game-blurbs">';
        heroContent.whyItWorks.gameBlurbs.forEach(function (blurb) {
          // Find game name
          const g = (window.GAMES || []).find(function (game) {
            return game.id === blurb.gameId;
          });
          const gameName = g ? g.name : blurb.gameId;
          html += '<div class="lp-game-blurb">';
          html += `<h3>${gameName}</h3>`;
          html += `<p>${blurb.blurb}</p>`;
          html += '</div>';
        });
        html += '</div>';
      }
      html += '</section>';
    }

    // FAQ section
    if (heroContent.faqs && heroContent.faqs.length > 0) {
      html += '<section class="lp-faq">';
      html += '<h2><i class="ti ti-help-circle"></i> Frequently Asked Questions</h2>';
      heroContent.faqs.forEach(function (item) {
        html += '<details class="lp-faq-item">';
        html += `<summary class="lp-faq-q">${item.q}</summary>`;
        html += `<p class="lp-faq-a">${item.a}</p>`;
        html += '</details>';
      });
      html += '</section>';
    }

    article.innerHTML = html;
  }

  /**
   * Render footer with game links grouped by category
   */
  function renderFooter(root) {
    const categories = window.CATEGORIES || [];
    const games = window.GAMES || [];

    const footer = root.querySelector('footer');
    if (!footer) {
      return;
    }

    let html = '<div class="footer-inner">';
    html += '<div class="footer-games">';

    categories.forEach(function (cat) {
      html += '<div class="footer-col">';
      html += `<h3>${cat.footerHeading}</h3>`;
      html += '<ul>';

      const catGames = games.filter(function (g) {
        return g.category === cat.id;
      });

      catGames.forEach(function (game) {
        html += `<li><a href="${gamePath(game.id)}">${game.footerName}</a></li>`;
      });

      html += '</ul>';
      html += '</div>';
    });

    html += '</div>';
    html += '</div>';

    footer.innerHTML = html;
  }

  /**
   * Inject JSON-LD structured data
   */
  function injectJsonLd(categoryId, gradeLabel, games) {
    const categories = window.CATEGORIES || [];
    const content = window.LANDING_CONTENT || {};

    const cat = categories.find(function (c) {
      return c.id === categoryId;
    });
    if (!cat) {
      return;
    }

    const heroContent = content[categoryId];
    if (!heroContent) {
      return;
    }

    let title = '';
    let description = '';
    if (gradeLabel) {
      title = `Free ${cat.label.toLowerCase()} Games for ${gradeLabel}`;
      description = `Explore our collection of ${gradeLabel.toLowerCase()} ${cat.label.toLowerCase()} games.`;
    } else {
      title = `${cat.label} Games for Kids`;
      description = heroContent.seoDescription;
    }

    // CollectionPage
    const collectionPage = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: title,
      description: description,
      hasPart: games.map(function (game) {
        return {
          '@type': 'Game',
          name: game.name,
          description: game.desc,
          url: gamePath(game.id)
        };
      })
    };

    // BreadcrumbList (grade pages only)
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';

    if (gradeLabel) {
      const breadcrumb = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Doodles',
            item: portalPath()
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: cat.label,
            item: categoryPath()
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: gradeLabel,
            item: window.location.pathname
          }
        ]
      };
      breadcrumbScript.textContent = JSON.stringify(breadcrumb);
      document.head.appendChild(breadcrumbScript);
    }

    const collectionScript = document.createElement('script');
    collectionScript.type = 'application/ld+json';
    collectionScript.textContent = JSON.stringify(collectionPage);
    document.head.appendChild(collectionScript);
  }

  /**
   * Validate config and content
   */
  function validate() {
    const config = window.LANDING_CONFIG || {};
    const content = window.LANDING_CONTENT || {};

    if (!config.categoryId) {
      console.error('❌ LANDING_CONFIG.categoryId is required');
      return false;
    }

    if (!window.GAMES) {
      console.error('❌ GAMES manifest not loaded');
      return false;
    }

    if (!content[config.categoryId]) {
      console.error(`❌ No content found for category: ${config.categoryId}`);
      console.warn('Available categories:', Object.keys(content));
      return false;
    }

    return true;
  }

  /**
   * Show error message if validation fails
   */
  function showError(message) {
    const root = document.documentElement;
    const article = root.querySelector('.lp-article');
    if (article) {
      article.innerHTML = `
        <div style="padding: 40px 20px; text-align: center; color: #d32f2f;">
          <h2>⚠️ Page Error</h2>
          <p>${message}</p>
          <p style="font-size: 13px; color: #666; margin-top: 16px;">
            Please try refreshing the page or <a href="../../index.html" style="color: #1976d2;">return to home</a>
          </p>
        </div>
      `;
    }
  }

  /**
   * Initialize on DOM ready with retry logic for script loading
   */
  function initializeLanding() {
    if (!validate()) {
      showError(
        'Content failed to load. Some scripts may not have loaded correctly. ' +
          'This sometimes happens on slow connections. Try refreshing the page.'
      );
      return;
    }

    try {
      const config = window.LANDING_CONFIG || {};
      const root = document.documentElement;

      injectThumbStyles();

      const games = getGamesForPage();
      renderNavbar(root);
      renderHero(root, config.categoryId, config.gradeLabel || null);
      renderArticle(root, config.categoryId, config.gradeLabel || null, games);
      renderFooter(root);
      injectJsonLd(config.categoryId, config.gradeLabel || null, games);

      console.log('✅ Landing page initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing landing page:', error);
      showError('An error occurred while loading the page. Please refresh and try again.');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Try immediately
    if (!validate()) {
      // If validation fails, wait up to 2 seconds for scripts to load
      let retries = 0;
      const maxRetries = 20; // 20 * 100ms = 2 seconds

      const retryInit = setInterval(function () {
        retries++;
        console.log(`Retry ${retries}/${maxRetries}: Waiting for scripts to load...`);

        if (validate() || retries >= maxRetries) {
          clearInterval(retryInit);
          initializeLanding();
        }
      }, 100);
    } else {
      initializeLanding();
    }
  });
})();
