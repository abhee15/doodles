/* eslint-disable no-undef */
// Error Tracking for Production Monitoring
// Captures runtime errors and async rejection errors, reports to GA4
// Load this FIRST in the <body> of every game HTML, before analytics.js and game.js

(function () {
  // Game name detection from URL path
  function getGameName() {
    const match = window.location.pathname.match(/\/games\/([^/]+)\//);
    return match ? match[1] : 'unknown';
  }

  // Track seen errors to prevent spam (expires after 30s)
  const seenErrors = new Set();
  const errorExpiryMap = new Map();

  function isErrorDuplicate(signature) {
    if (seenErrors.has(signature)) {
      return true;
    }

    seenErrors.add(signature);
    const expiryTimer = setTimeout(() => {
      seenErrors.delete(signature);
      errorExpiryMap.delete(signature);
    }, 30000); // 30 second expiry

    errorExpiryMap.set(signature, expiryTimer);
    return false;
  }

  // Buffer for pending errors (gtag may not be ready yet)
  const pendingErrors = [];
  let gtag_ready = false;

  // Monitor for gtag availability
  function waitForGtag() {
    if (typeof gtag !== 'undefined') {
      gtag_ready = true;
      flushPendingErrors();
      return;
    }
    setTimeout(waitForGtag, 100);
  }

  // Start waiting for gtag immediately
  waitForGtag();

  // Report pending errors once gtag is ready
  function flushPendingErrors() {
    while (pendingErrors.length > 0) {
      const errorData = pendingErrors.shift();
      reportToGA4(errorData);
    }
  }

  // Send error to GA4
  function reportToGA4(errorData) {
    if (gtag_ready && typeof gtag !== 'undefined') {
      gtag('event', 'game_error', errorData);
    } else {
      pendingErrors.push(errorData);
    }
  }

  // Crash overlay (fatal errors only)
  let overlayShown = false;

  function showCrashOverlay() {
    if (overlayShown) {
      return;
    }
    overlayShown = true;

    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      font-family: system-ui, -apple-system, sans-serif;
    `;

    const content = document.createElement('div');
    content.style.cssText = `
      background: white;
      padding: 40px 30px;
      border-radius: 12px;
      text-align: center;
      max-width: 400px;
      box-sizing: border-box;
    `;

    const title = document.createElement('h2');
    title.textContent = 'Oops! Something went wrong.';
    title.style.cssText = `
      margin: 0 0 20px 0;
      color: #1e293b;
      font-size: 1.5rem;
    `;

    const backLink = document.createElement('a');
    backLink.href = '../../index.html';
    backLink.textContent = '← Back to Games';
    backLink.style.cssText = `
      display: inline-block;
      padding: 12px 24px;
      background: #06b6d4;
      color: white;
      border-radius: 8px;
      text-decoration: none;
      font-weight: bold;
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;
    `;

    backLink.onmouseover = function () {
      this.style.background = '#0891b2';
      this.style.transform = 'translateY(-2px)';
    };
    backLink.onmouseout = function () {
      this.style.background = '#06b6d4';
      this.style.transform = 'translateY(0)';
    };

    content.appendChild(title);
    content.appendChild(backLink);
    overlay.appendChild(content);
    document.body.appendChild(overlay);
  }

  // Fatal error handler (script errors)
  window.onerror = function (message, source, lineno, colno, error) {
    // Skip CDN/internal errors
    if (source && (source.includes('googletagmanager') || source.includes('gtag'))) {
      return false;
    }

    const gameName = getGameName();
    const errorSignature = `${message}|${lineno}|${colno}`;

    // Check for duplicates
    if (isErrorDuplicate(errorSignature)) {
      return false;
    }

    const errorData = {
      game_name: gameName,
      error_message: message,
      error_source: source || 'unknown',
      error_line: lineno || 0,
      error_type: 'fatal'
    };

    reportToGA4(errorData);
    showCrashOverlay();

    return true; // Prevent default error handling
  };

  // Async rejection handler
  window.addEventListener('unhandledrejection', function (event) {
    const gameName = getGameName();
    const message = event.reason ? String(event.reason) : 'Unhandled Promise Rejection';
    const errorSignature = `${message}|async`;

    // Check for duplicates
    if (isErrorDuplicate(errorSignature)) {
      return;
    }

    const errorData = {
      game_name: gameName,
      error_message: message,
      error_source: 'promise',
      error_line: 0,
      error_type: 'async'
    };

    reportToGA4(errorData);
    // No overlay for async errors — they may not affect gameplay
  });

  // Public API for games to manually report caught errors
  window.errorTracker = {
    report(message, context = {}) {
      const gameName = getGameName();
      const errorSignature = `${message}|manual`;

      if (isErrorDuplicate(errorSignature)) {
        return;
      }

      const errorData = {
        game_name: gameName,
        error_message: message,
        error_source: context.source || 'manual',
        error_line: context.line || 0,
        error_type: 'manual',
        ...context
      };

      reportToGA4(errorData);
    }
  };
})();
