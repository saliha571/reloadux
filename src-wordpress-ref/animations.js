/**
 * animations.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Handles two concerns:
 *   1. Scroll-reveal (IntersectionObserver) for .reveal elements
 *   2. Unicorn Studio WebGL scene initialization
 *
 * All timing values reference tokens from /design/tokens.json via CSS vars.
 * The module is self-contained — no build step or framework required.
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  /* ========================================================================
     CONFIG — mirrors /design/tokens.json motion values
     ======================================================================== */

  var CONFIG = {
    reveal: {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.15
    },
    stagger: {
      delayMs: 80
    },
    unicorn: {
      fps: 60,
      scale: 1,
      dpi: 1.5,
      mobileDpi: 1,
      mobileBreakpoint: 768,
      lazyLoad: true,
      altText: 'Decorative animated background'
    }
  };


  /* ========================================================================
     1. SCROLL-REVEAL  (IntersectionObserver)
     ======================================================================== */

  /**
   * Assigns --stagger-index CSS custom properties to children of stagger
   * containers so transition-delay works from CSS.
   */
  function assignStaggerIndices() {
    var staggerParents = new Map();

    document.querySelectorAll('[data-stagger]').forEach(function (el) {
      var parent = el.parentElement;
      if (!staggerParents.has(parent)) {
        staggerParents.set(parent, 0);
      }
      var index = staggerParents.get(parent);
      el.style.setProperty('--stagger-index', index);
      staggerParents.set(parent, index + 1);
    });
  }

  /**
   * Creates an IntersectionObserver that adds .is-visible to .reveal
   * elements when they scroll into view.
   */
  function initScrollReveal() {
    if (prefersReducedMotion()) return;

    assignStaggerIndices();

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, CONFIG.reveal);

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }


  /* ========================================================================
     2. UNICORN STUDIO INTEGRATION
     ======================================================================== */

  /**
   * Waits for the UnicornStudio global to become available (the SDK is loaded
   * with `defer`), then initialises all scenes.
   *
   * Scenes are identified by [data-us-project] or [data-us-project-src]
   * attributes on .unicorn-backdrop elements in the HTML.
   *
   * The SDK's own `init()` picks up those elements automatically.
   * We layer on responsive DPI switching and reduced-motion handling.
   */
  function initUnicornStudio() {
    if (prefersReducedMotion()) {
      hideUnicornBackdrops();
      return;
    }

    waitForGlobal('UnicornStudio', function (UnicornStudio) {
      var isMobile = window.innerWidth < CONFIG.unicorn.mobileBreakpoint;

      UnicornStudio.init({
        fps: CONFIG.unicorn.fps,
        scale: CONFIG.unicorn.scale,
        dpi: isMobile ? CONFIG.unicorn.mobileDpi : CONFIG.unicorn.dpi,
        lazyLoad: CONFIG.unicorn.lazyLoad
      });
    });
  }

  /**
   * Hides all Unicorn backdrop containers (for reduced-motion or fallback).
   */
  function hideUnicornBackdrops() {
    document.querySelectorAll('.unicorn-backdrop').forEach(function (el) {
      el.style.display = 'none';
    });
  }

  /**
   * Utility: polls for a global variable (handles the `defer` race).
   * Falls back after ~5 s to avoid hanging.
   *
   * @param {string}   name     Global variable name (e.g. 'UnicornStudio')
   * @param {Function} callback Receives the global when available
   */
  function waitForGlobal(name, callback) {
    var attempts = 0;
    var maxAttempts = 50;
    var intervalMs = 100;

    var check = setInterval(function () {
      attempts++;
      if (window[name]) {
        clearInterval(check);
        callback(window[name]);
      } else if (attempts >= maxAttempts) {
        clearInterval(check);
        console.warn(
          '[animations.js] Unicorn Studio SDK not found after ' +
          (maxAttempts * intervalMs / 1000) + 's. Skipping WebGL scenes.'
        );
      }
    }, intervalMs);
  }


  /* ========================================================================
     3. ACCESSIBILITY HELPERS
     ======================================================================== */

  /**
   * Checks the user's prefers-reduced-motion setting.
   * @returns {boolean}
   */
  function prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  /**
   * Listens for runtime changes to the reduced-motion preference and
   * toggles Unicorn backdrops accordingly.
   */
  function watchReducedMotion() {
    if (!window.matchMedia) return;

    var mq = window.matchMedia('(prefers-reduced-motion: reduce)');

    mq.addEventListener('change', function (e) {
      if (e.matches) {
        hideUnicornBackdrops();
        document.querySelectorAll('.reveal').forEach(function (el) {
          el.classList.add('is-visible');
        });
      }
    });
  }


  /* ========================================================================
     4. WORDPRESS INTEGRATION HELPER
     ======================================================================== */

  /**
   * Checks if this page is loaded inside a WordPress admin preview (e.g.
   * Customizer or block editor iframe). If so, we skip heavy animations
   * to keep the editor responsive.
   */
  function isWordPressPreview() {
    try {
      return (
        window.self !== window.top ||
        document.body.classList.contains('wp-admin') ||
        typeof window.wp !== 'undefined'
      );
    } catch (e) {
      return false;
    }
  }


  /* ========================================================================
     5. BOOTSTRAP
     ======================================================================== */

  function init() {
    if (isWordPressPreview()) {
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    initScrollReveal();
    initUnicornStudio();
    watchReducedMotion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
