/**
 * Doodles Portal Renderer
 *
 * Dynamically renders game cards, filter pills, and footer from the manifest.
 * Initializes on DOMContentLoaded.
 */

(function() {
  'use strict';

  /**
   * Check if a game is "new" based on its newUntil date
   */
  function isNew(game) {
    if (!game.newUntil) return false;
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var expiryDate = new Date(game.newUntil);
    expiryDate.setHours(0, 0, 0, 0);
    return today < expiryDate;
  }

  /**
   * Inject dynamic CSS for game thumbnails and patterns
   */
  function injectThumbStyles() {
    var style = document.createElement('style');
    var css = '';

    GAMES.forEach(function(game) {
      if (game.thumbClass) {
        // Game has a CSS class, generate styles
        css += '.thumb.' + game.thumbClass + ' { background: ' + game.gradient + '; }\n';

        if (game.pattern) {
          css += '.thumb.' + game.thumbClass + '::before { ';
          css += 'content: \'\'; ';
          css += 'position: absolute; inset: 0; ';
          css += 'background: ' + game.pattern + '; ';
          if (game.patternSize) {
            css += 'background-size: ' + game.patternSize + '; ';
          }
          if (game.patternPosition) {
            css += 'background-position: ' + game.patternPosition + '; ';
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
    CATEGORIES.forEach(function(cat) {
      var container = document.querySelector('[data-cat="' + cat.id + '"] .cards-row');
      if (!container) return;

      var gamesInCat = GAMES.filter(function(g) { return g.category === cat.id; });

      gamesInCat.forEach(function(game) {
        var card = document.createElement('a');
        card.className = 'game-card';
        card.href = 'games/' + game.id + '/index.html';
        card.id = game.id;

        var thumbClass = game.thumbClass ? ' ' + game.thumbClass : '';
        var thumbStyle = game.thumbClass ? '' : ' style="background: ' + game.gradient + '"';

        var newBadge = isNew(game) ? '<span class="badge-new">New</span>' : '';
        var iconStyle = game.iconColor ? ' style="color: ' + game.iconColor + ';"' : '';

        card.innerHTML =
          '<div class="thumb' + thumbClass + '"' + thumbStyle + '>' +
          newBadge +
          '<i class="ti ' + game.icon + '"' + iconStyle + '></i>' +
          '</div>' +
          '<div class="card-overlay">' +
          '<div class="card-title">' + game.name + '</div>' +
          '<div class="card-desc">' + game.desc + '</div>' +
          '<span class="card-play"><i class="ti ti-player-play"></i> Play</span>' +
          '</div>';

        container.appendChild(card);
      });
    });
  }

  /**
   * Update nav counter (games count and subjects count)
   */
  function updateNavCount() {
    var navCount = document.getElementById('nav-count');
    if (navCount) {
      navCount.textContent = GAMES.length + ' games · ' + CATEGORIES.length + ' subjects';
    }
  }

  /**
   * Update section counters
   */
  function updateSectionCounts() {
    CATEGORIES.forEach(function(cat) {
      var section = document.querySelector('[data-cat="' + cat.id + '"]');
      if (!section) return;

      var countSpan = section.querySelector('.sec-count');
      if (!countSpan) return;

      var count = GAMES.filter(function(g) { return g.category === cat.id; }).length;
      var text = count + ' game' + (count !== 1 ? 's' : '');
      countSpan.textContent = text;
    });
  }

  /**
   * Render filter pills
   */
  function renderFilterPills() {
    var filterBar = document.getElementById('filter-bar');
    if (!filterBar) return;

    // Clear existing buttons if any
    filterBar.innerHTML = '';

    // "All Games" pill
    var allBtn = document.createElement('button');
    allBtn.className = 'pill active';
    allBtn.setAttribute('data-cat', 'all');
    allBtn.setAttribute('data-label', 'All Games');
    allBtn.innerHTML = '<i class="ti ti-layout-grid"></i> <span class="pill-text">All Games</span>';
    filterBar.appendChild(allBtn);

    // Category pills
    CATEGORIES.forEach(function(cat) {
      var btn = document.createElement('button');
      btn.className = 'pill';
      btn.setAttribute('data-cat', cat.id);
      btn.setAttribute('data-label', cat.label);

      var icon = '';
      switch (cat.id) {
        case 'math': icon = 'ti-calculator'; break;
        case 'geo': icon = 'ti-world'; break;
        case 'words': icon = 'ti-book'; break;
        case 'science': icon = 'ti-leaf'; break;
        case 'memory': icon = 'ti-brain'; break;
        case 'art': icon = 'ti-palette'; break;
      }

      btn.innerHTML = '<i class="ti ' + icon + '"></i> <span class="pill-text">' + cat.label + '</span>';
      filterBar.appendChild(btn);
    });

    // Attach filter listeners
    attachFilterListeners();
  }

  /**
   * Attach click listeners to filter pills
   */
  function attachFilterListeners() {
    var pills = document.querySelectorAll('.pill');
    var sections = document.querySelectorAll('.cat-section');
    var empty = document.getElementById('empty');

    pills.forEach(function(pill) {
      pill.addEventListener('click', function() {
        var cat = this.getAttribute('data-cat');

        // Update active pill
        pills.forEach(function(p) { p.classList.remove('active'); });
        this.classList.add('active');

        if (cat === 'all') {
          sections.forEach(function(s) { s.classList.remove('hidden'); });
          if (empty) empty.style.display = 'none';
          return;
        }

        // Show only matching category
        var found = false;
        sections.forEach(function(s) {
          if (s.getAttribute('data-cat') === cat) {
            s.classList.remove('hidden');
            found = true;
          } else {
            s.classList.add('hidden');
          }
        });

        if (empty) empty.style.display = found ? 'none' : 'block';
      });
    });
  }

  /**
   * Render footer columns
   */
  function renderFooter() {
    var footerGames = document.getElementById('footer-games');
    if (!footerGames) return;

    CATEGORIES.forEach(function(cat) {
      var col = document.createElement('div');
      col.className = 'footer-col';

      var heading = document.createElement('h3');
      heading.textContent = cat.footerHeading;
      col.appendChild(heading);

      var ul = document.createElement('ul');
      var gamesInCat = GAMES.filter(function(g) { return g.category === cat.id; });

      gamesInCat.forEach(function(game) {
        var li = document.createElement('li');
        var link = document.createElement('a');
        link.href = 'games/' + game.id + '/index.html';
        link.textContent = game.footerName;
        li.appendChild(link);
        ul.appendChild(li);
      });

      col.appendChild(ul);
      footerGames.appendChild(col);
    });
  }

  /**
   * Initialize on DOM ready
   */
  document.addEventListener('DOMContentLoaded', function() {
    injectThumbStyles();
    renderCards();
    updateNavCount();
    updateSectionCounts();
    renderFilterPills();
    renderFooter();
  });
})();
