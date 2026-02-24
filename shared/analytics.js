/* eslint-disable no-undef */
// Google Analytics 4 Integration
// Replace 'G-XXXXXXXXXX' with your actual Measurement ID after deployment

const GA_MEASUREMENT_ID = 'G-GMLMMLZB3Y'; // Doodles Analytics

// Initialize Google Analytics
(function () {
  // Initialize dataLayer first
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);

  // Load gtag.js
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.onload = function () {
    console.log('✓ Google Analytics loaded successfully');
  };
  document.head.appendChild(script);
})();

// Custom event tracking helpers
function trackGameStart(gameName) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'game_start', {
      game_name: gameName
    });
  }
}

function trackGameEnd(gameName, score, duration) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'game_end', {
      game_name: gameName,
      score: score,
      duration_seconds: duration
    });
  }
}

function trackLevelComplete(gameName, level, score) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'level_complete', {
      game_name: gameName,
      level: level,
      score: score
    });
  }
}

// Export for use in games
window.gameAnalytics = {
  trackGameStart,
  trackGameEnd,
  trackLevelComplete
};
