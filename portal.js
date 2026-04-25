/* eslint-disable no-undef */
/**
 * Doodles Portal Renderer
 *
 * Dynamically renders game cards, filter pills, and footer from the manifest.
 * Initializes on DOMContentLoaded.
 */

(function () {
  'use strict';

  /**
   * Check if a game is "new" based on its newUntil date
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
   */
  function injectThumbStyles() {
    const style = document.createElement('style');
    let css = '';

    GAMES.forEach(function (game) {
      if (game.thumbClass) {
        // Game has a CSS class, generate styles
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
   * Render all game cards from manifest
   */
  function renderCards() {
    CATEGORIES.forEach(function (cat) {
      const container = document.querySelector(`[data-cat="${cat.id}"] .cards-row`);
      if (!container) {
        return;
      }

      const gamesInCat = GAMES.filter(function (g) {
        return g.category === cat.id;
      });

      gamesInCat.forEach(function (game) {
        const card = document.createElement('a');
        card.className = 'game-card';
        card.href = `games/${game.id}/index.html`;
        card.id = game.id;

        const thumbClass = game.thumbClass ? ` ${game.thumbClass}` : '';
        const thumbStyle = game.thumbClass ? '' : ` style="background: ${game.gradient}"`;

        const newBadge = isNew(game) ? '<span class="badge-new">New</span>' : '';
        const iconStyle = game.iconColor ? ` style="color: ${game.iconColor};"` : '';

        card.innerHTML =
          `<div class="thumb${thumbClass}"${thumbStyle}>${
            newBadge
          }<i class="ti ${game.icon}"${iconStyle}></i>` +
          '</div>' +
          '<div class="card-overlay">' +
          `<div class="card-title">${game.name}</div>` +
          `<div class="card-desc">${game.desc}</div>` +
          '<span class="card-play"><i class="ti ti-player-play"></i> Play</span>' +
          '</div>';

        container.appendChild(card);
      });

      // Add "See all →" link to section header (only if more than 1 game in category)
      const section = container.closest('.cat-section');
      if (section) {
        const header = section.querySelector('.sec-header');
        // Only show "See all" link if category has more than one game
        if (header && !header.querySelector('.sec-see-all') && gamesInCat.length > 1) {
          const link = document.createElement('a');
          link.href = `games/${cat.id}/index.html`;
          link.className = 'sec-see-all';
          link.textContent = 'See all →';
          header.appendChild(link);
        }
      }
    });
  }

  /**
   * Update nav counter (games count and subjects count)
   */
  function updateNavCount() {
    const navCount = document.getElementById('nav-count');
    if (navCount) {
      navCount.textContent = `${GAMES.length} games · ${CATEGORIES.length} subjects`;
    }
    const heroCount = document.getElementById('hero-game-count');
    if (heroCount) {
      heroCount.textContent = GAMES.length;
    }
  }

  /**
   * Update section counters
   */
  function updateSectionCounts() {
    CATEGORIES.forEach(function (cat) {
      const section = document.querySelector(`[data-cat="${cat.id}"]`);
      if (!section) {
        return;
      }

      const countSpan = section.querySelector('.sec-count');
      if (!countSpan) {
        return;
      }

      const count = GAMES.filter(function (g) {
        return g.category === cat.id;
      }).length;
      const text = `${count} game${count !== 1 ? 's' : ''}`;
      countSpan.textContent = text;
    });
  }

  /**
   * Render filter pills
   */
  function renderFilterPills() {
    const filterBar = document.getElementById('filter-bar');
    if (!filterBar) {
      return;
    }

    // Clear existing buttons if any
    filterBar.innerHTML = '';

    // "All Games" pill
    const allBtn = document.createElement('button');
    allBtn.className = 'pill active';
    allBtn.setAttribute('data-cat', 'all');
    allBtn.setAttribute('data-label', 'All Games');
    allBtn.innerHTML = '<i class="ti ti-layout-grid"></i> <span class="pill-text">All Games</span>';
    filterBar.appendChild(allBtn);

    // Category pills - use icon from manifest (single source of truth)
    CATEGORIES.forEach(function (cat) {
      const btn = document.createElement('button');
      btn.className = 'pill';
      btn.setAttribute('data-cat', cat.id);
      btn.setAttribute('data-label', cat.label);

      // Use icon from manifest - no hardcoding needed!
      const icon = cat.icon || 'ti-tag'; // Fallback icon if not specified in manifest
      btn.innerHTML = `<i class="ti ${icon}"></i> <span class="pill-text">${cat.label}</span>`;
      filterBar.appendChild(btn);
    });

    // Attach filter listeners
    attachFilterListeners();
  }

  /**
   * Attach click listeners to filter pills
   */
  function attachFilterListeners() {
    const pills = document.querySelectorAll('.pill');

    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        // Update active pill
        pills.forEach(function (p) {
          p.classList.remove('active');
        });
        this.classList.add('active');

        applyFilters();
      });
    });
  }

  /**
   * Attach click listeners to age filter pills
   */
  function attachAgeFilterListeners() {
    const agePills = document.querySelectorAll('.age-pill');
    agePills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        agePills.forEach(function (p) {
          p.classList.remove('active');
        });
        this.classList.add('active');
        applyFilters();
      });
    });
  }

  /**
   * Get currently active age filter
   */
  function getActiveAge() {
    const active = document.querySelector('.age-pill.active');
    return active ? active.getAttribute('data-age') : 'all';
  }

  /**
   * Get currently active category filter
   */
  function getActiveCat() {
    const active = document.querySelector('.pill.active');
    return active ? active.getAttribute('data-cat') : 'all';
  }

  /**
   * Apply both age and category filters
   */
  function applyFilters() {
    const age = getActiveAge();
    const cat = getActiveCat();
    const sections = document.querySelectorAll('.cat-section');
    const empty = document.getElementById('empty');
    let anyVisible = false;

    sections.forEach(function (section) {
      const sectionCat = section.getAttribute('data-cat');
      const catMatch = cat === 'all' || sectionCat === cat;
      if (!catMatch) {
        section.classList.add('hidden');
        return;
      }

      const cards = section.querySelectorAll('.game-card');
      let visibleCount = 0;
      cards.forEach(function (card) {
        const gameId = card.id;
        const game = GAMES.find(function (g) {
          return g.id === gameId;
        });
        const ageMatch =
          age === 'all' || (game && game.ageGroup && game.ageGroup.indexOf(age) !== -1);
        card.style.display = ageMatch ? '' : 'none';
        if (ageMatch) {
          visibleCount++;
        }
      });

      if (visibleCount > 0) {
        section.classList.remove('hidden');
        anyVisible = true;
      } else {
        section.classList.add('hidden');
      }
    });

    if (empty) {
      empty.style.display = anyVisible ? 'none' : 'block';
    }
  }

  /**
   * Render footer columns
   */
  function renderFooter() {
    const footerGames = document.getElementById('footer-games');
    if (!footerGames) {
      return;
    }

    CATEGORIES.forEach(function (cat) {
      const col = document.createElement('div');
      col.className = 'footer-col';

      const heading = document.createElement('h3');
      heading.textContent = cat.footerHeading;
      col.appendChild(heading);

      const ul = document.createElement('ul');
      const gamesInCat = GAMES.filter(function (g) {
        return g.category === cat.id;
      });

      gamesInCat.forEach(function (game) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = `games/${game.id}/index.html`;
        link.textContent = game.footerName;
        li.appendChild(link);
        ul.appendChild(li);
      });

      col.appendChild(ul);
      footerGames.appendChild(col);
    });

    // Attach accordion toggle listeners for mobile
    attachFooterAccordionListeners();
  }

  /**
   * Attach accordion toggle listeners to footer headings (mobile only)
   */
  function attachFooterAccordionListeners() {
    const cols = document.querySelectorAll('.footer-col');

    cols.forEach(function (col) {
      const heading = col.querySelector('h3');
      if (!heading) {
        return;
      }

      heading.addEventListener('click', function () {
        // Check if mobile (768px or less)
        if (window.innerWidth > 768) {
          return; // Don't toggle on desktop/tablet
        }

        col.classList.toggle('expanded');
      });
    });
  }

  /**
   * Initialize on DOM ready
   */
  document.addEventListener('DOMContentLoaded', function () {
    // Verify manifest is loaded
    if (typeof GAMES === 'undefined' || typeof CATEGORIES === 'undefined') {
      console.error('Portal: GAMES or CATEGORIES manifest not loaded');
      return;
    }

    injectThumbStyles();
    renderCards();
    updateNavCount();
    updateSectionCounts();
    renderFilterPills();
    attachAgeFilterListeners();
    renderFooter();

    // Smooth page-leave transition on game card clicks
    document.querySelectorAll('.game-card').forEach(function (card) {
      card.addEventListener('click', function (e) {
        e.preventDefault();
        const href = card.href;
        document.body.classList.add('page-leaving');
        setTimeout(function () {
          window.location.href = href;
        }, 200);
      });
    });
  });
})();
