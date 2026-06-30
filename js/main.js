/* ============================================================
   Development Strategies — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ---- Navbar: transparent → solid on scroll ---- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const isHomepage = navbar.classList.contains('transparent');

    function handleScroll() {
      if (isHomepage) {
        if (window.scrollY > 60) {
          navbar.classList.add('scrolled');
          navbar.classList.remove('transparent');
        } else {
          navbar.classList.remove('scrolled');
          navbar.classList.add('transparent');
        }
      }
      // Back to top
      const btt = document.getElementById('back-to-top');
      if (btt) {
        if (window.scrollY > 400) btt.classList.add('visible');
        else btt.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ---- Mobile Hamburger ---- */
  const hamburger = document.querySelector('.hamburger');
  const navMenu   = document.querySelector('.nav-menu');
  const overlay   = document.querySelector('.nav-overlay');

  function openMenu() {
    hamburger.classList.add('open');
    navMenu.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.contains('open') ? closeMenu() : openMenu();
    });
  }
  if (overlay) overlay.addEventListener('click', closeMenu);

  /* ---- Desktop: delayed close so mouse can reach dropdown items ---- */
  document.querySelectorAll('.nav-item.has-dropdown').forEach(item => {
    let closeTimer = null;

    item.addEventListener('mouseenter', () => {
      clearTimeout(closeTimer);
      item.classList.add('open');
    });
    item.addEventListener('mouseleave', () => {
      closeTimer = setTimeout(() => item.classList.remove('open'), 120);
    });
  });

  /* ---- Mobile: toggle dropdown on click ---- */
  document.querySelectorAll('.nav-item').forEach(item => {
    const link = item.querySelector('.nav-link');
    if (item.querySelector('.dropdown') && link) {
      link.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          item.classList.toggle('open');
        }
      });
    }
  });

  /* ---- Active nav link ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    if (link.dataset.page === currentPage) link.classList.add('active');
  });

  /* ---- Back to top ---- */
  const btt = document.getElementById('back-to-top');
  if (btt) {
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---- Fade-in on scroll (IntersectionObserver) ---- */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    fadeEls.forEach(el => observer.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* ---- Counter animation ---- */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = (Number.isInteger(target) ? Math.round(value) : value.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counterEls = document.querySelectorAll('[data-target]');
  if (counterEls.length && 'IntersectionObserver' in window) {
    const counterObs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counterEls.forEach(el => counterObs.observe(el));
  }

  /* ---- Tabs (About page) ---- */
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    const buttons = tabGroup.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        // Deactivate all
        buttons.forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        // Activate clicked
        btn.classList.add('active');
        const content = document.getElementById(target);
        if (content) content.classList.add('active');
      });
    });
  });

  /* ---- Contact form ---- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      // Simulate send (replace with actual backend integration)
      setTimeout(() => {
        btn.textContent = 'Message Sent ✓';
        btn.style.background = '#1B8A6B';
        this.reset();
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
          btn.style.background = '';
        }, 3000);
      }, 1500);
    });
  }

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeMenu();
      }
    });
  });

})();
