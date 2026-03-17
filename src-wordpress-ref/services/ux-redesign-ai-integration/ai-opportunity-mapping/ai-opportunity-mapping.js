/**
 * ai-opportunity-mapping.js
 * Page-specific interactions: cursor glow, magnetic buttons, parallax shapes,
 * smooth anchor scrolling, number counter animation, and tilt on cards.
 */

(function () {
  'use strict';

  function prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  /* =======================================================================
     1. CURSOR GLOW — radial gradient follows pointer on dark sections
     ======================================================================= */

  function initCursorGlow() {
    if (prefersReducedMotion()) return;

    var darkSections = document.querySelectorAll(
      '.section--dark, .cta-glow'
    );

    darkSections.forEach(function (section) {
      section.addEventListener('mousemove', function (e) {
        var rect = section.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        section.style.setProperty('--glow-x', x + 'px');
        section.style.setProperty('--glow-y', y + 'px');
      });
    });

    var style = document.createElement('style');
    style.textContent =
      '.section--dark, .cta-glow {' +
      '  --glow-x: 50%; --glow-y: 50%;' +
      '}' +
      '.section--dark::after, .cta-glow .aom-cta__title::after { content: none; }' +
      '.section--dark { background-image: radial-gradient(600px circle at var(--glow-x) var(--glow-y), rgba(150,98,255,0.04) 0%, transparent 60%); }';
    document.head.appendChild(style);
  }


  /* =======================================================================
     2. MAGNETIC BUTTONS — buttons subtly shift toward the cursor
     ======================================================================= */

  function initMagneticButtons() {
    if (prefersReducedMotion()) return;

    var buttons = document.querySelectorAll('.aom-hero .btn--primary, .aom-cta-section .btn--primary');
    var strength = 0.3;

    buttons.forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var dx = e.clientX - (rect.left + rect.width / 2);
        var dy = e.clientY - (rect.top + rect.height / 2);
        btn.style.transform =
          'translate(' + dx * strength + 'px, ' + dy * strength + 'px)';
      });

      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
      });
    });
  }


  /* =======================================================================
     3. PARALLAX HOLO SHAPES — subtle float on scroll
     ======================================================================= */

  function initParallaxShapes() {
    if (prefersReducedMotion()) return;

    var shapes = document.querySelectorAll('.aom-vector-shape, .aom-glow-orb');
    if (!shapes.length) return;

    var ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(function () {
        var scrollY = window.scrollY;
        shapes.forEach(function (shape) {
          var isVector = shape.classList.contains('aom-vector-shape');
          var isOrb = shape.classList.contains('aom-glow-orb');
          var rect = shape.parentElement.getBoundingClientRect();
          var inView = rect.top < window.innerHeight && rect.bottom > 0;

          if (!inView) return;

          var offset = scrollY - shape.parentElement.offsetTop;

          if (isVector) {
            var baseRotation = shape.classList.contains('aom-vector-shape--hero') ? 9.6 : -5;
            if (shape.classList.contains('aom-vector-shape--cta')) baseRotation = 12;
            shape.style.transform =
              'rotate(' + (baseRotation + offset * 0.005) + 'deg)';
          } else if (isOrb) {
            var speed = 0.03;
            shape.style.transform += ' translateY(' + offset * speed + 'px)';
          }
        });
        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }


  /* =======================================================================
     4. SMOOTH ANCHOR SCROLL
     ======================================================================= */

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('href');
        if (id.length <= 1) return;

        var target = document.querySelector(id);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        if (history.pushState) {
          history.pushState(null, '', id);
        }
      });
    });
  }


  /* =======================================================================
     5. COUNTER ANIMATION — animates stat numbers in Why Us section
     ======================================================================= */

  function initCounterAnimation() {
    if (prefersReducedMotion()) return;

    var stats = document.querySelectorAll('.aom-why-card__stat');
    if (!stats.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          var el = entry.target;
          var text = el.textContent.trim();
          var match = text.match(/^(\d+)(\+?)$/);

          if (match) {
            var end = parseInt(match[1], 10);
            var suffix = match[2] || '';
            animateNumber(el, 0, end, suffix, 1200);
          }

          observer.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    stats.forEach(function (stat) { observer.observe(stat); });
  }

  function animateNumber(el, start, end, suffix, duration) {
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(start + (end - start) * eased) + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }


  /* =======================================================================
     6. CARD TILT — subtle 3D tilt on deliverable cards
     ======================================================================= */

  function initCardTilt() {
    if (prefersReducedMotion()) return;

    var cards = document.querySelectorAll('.aom-deliverable, .aom-glass-card');
    var maxTilt = 4;

    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var xPct = (e.clientX - rect.left) / rect.width - 0.5;
        var yPct = (e.clientY - rect.top) / rect.height - 0.5;

        card.style.transform =
          'perspective(800px) rotateY(' + xPct * maxTilt + 'deg) rotateX(' + -yPct * maxTilt + 'deg) translateY(-4px)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }


  /* =======================================================================
     7. PROGRESS BAR — reading progress at top of page
     ======================================================================= */

  function initProgressBar() {
    if (prefersReducedMotion()) return;

    var bar = document.createElement('div');
    bar.setAttribute('role', 'progressbar');
    bar.setAttribute('aria-label', 'Reading progress');
    bar.style.cssText =
      'position:fixed;top:0;left:0;height:2px;width:0;' +
      'background:linear-gradient(90deg,#9662FF,#A401B7);' +
      'z-index:9999;transition:width 0.1s linear;pointer-events:none;';
    document.body.appendChild(bar);

    var ticking = false;

    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(function () {
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
        bar.style.width = pct + '%';
        ticking = false;
      });
    }, { passive: true });
  }


  /* =======================================================================
     8. ACTIVE NAV HIGHLIGHT — highlight section tags on scroll
     ======================================================================= */

  function initActiveSection() {
    var sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var tag = entry.target.querySelector('.aom-section-tag');
          if (!tag) return;

          if (entry.isIntersecting) {
            tag.classList.add('is-active');
          } else {
            tag.classList.remove('is-active');
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    sections.forEach(function (sec) { observer.observe(sec); });

    var style = document.createElement('style');
    style.textContent =
      '.aom-section-tag { transition: color 0.3s ease, transform 0.3s ease; }' +
      '.aom-section-tag.is-active { color: #9662FF; transform: translateX(4px); }';
    document.head.appendChild(style);
  }


  /* =======================================================================
     BOOTSTRAP
     ======================================================================= */

  function init() {
    initCursorGlow();
    initMagneticButtons();
    initParallaxShapes();
    initSmoothScroll();
    initCounterAnimation();
    initCardTilt();
    initProgressBar();
    initActiveSection();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
