// Ad Integration Placeholder
// This file prepares your games for future monetization

// Google AdSense configuration (add later)
const ADSENSE_CLIENT_ID = 'ca-pub-XXXXXXXXXXXXXXXX'; // TODO: Replace with your AdSense ID
const ADS_ENABLED = false; // Set to true when ready to show ads

// Ad slots configuration
// eslint-disable-next-line no-unused-vars
const AD_SLOTS = {
  BANNER_TOP: 'slot-1',
  BANNER_BOTTOM: 'slot-2',
  INTERSTITIAL: 'slot-3' // Shows between levels
};

// Initialize ads
(function () {
  if (!ADS_ENABLED) {
    console.log('💰 Ads disabled. Enable in shared/ads.js when ready to monetize.');
    return;
  }

  // Load AdSense script when ready
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);

  console.log('✓ AdSense initialized');
})();

// Helper to show interstitial ad between levels
function showInterstitialAd(callback) {
  if (!ADS_ENABLED) {
    if (callback) {
      callback();
    }
    return;
  }

  // Show ad, then execute callback
  // Implementation depends on ad network
  console.log('Showing interstitial ad...');

  // For now, just callback
  setTimeout(() => {
    if (callback) {
      callback();
    }
  }, 100);
}

// Export
window.gameAds = {
  showInterstitialAd
};
