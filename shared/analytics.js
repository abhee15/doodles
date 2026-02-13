// Google Analytics 4 Integration
// Replace 'G-XXXXXXXXXX' with your actual Measurement ID after deployment

const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Replace with real ID

// Initialize Google Analytics
(function() {
    if (GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
        console.log('⚠️ Google Analytics not configured yet. Add your Measurement ID to shared/analytics.js');
        return;
    }

    // Load gtag.js
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);

    console.log('✓ Google Analytics initialized');
})();

// Custom event tracking helpers
function trackGameStart(gameName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'game_start', {
            'game_name': gameName
        });
    }
}

function trackGameEnd(gameName, score, duration) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'game_end', {
            'game_name': gameName,
            'score': score,
            'duration_seconds': duration
        });
    }
}

function trackLevelComplete(gameName, level, score) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'level_complete', {
            'game_name': gameName,
            'level': level,
            'score': score
        });
    }
}

// Export for use in games
window.gameAnalytics = {
    trackGameStart,
    trackGameEnd,
    trackLevelComplete
};
