'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const hero = document.getElementById('hero');

  // Shrink / elevate nav on scroll
  const handleScroll = () => {
    if (!nav || !hero) return;
    const trigger = hero.offsetHeight * 0.15;
    if (window.scrollY > trigger) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.18,
      }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  // Smooth scroll for same-page nav links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href') || '';
      if (targetId.length <= 1) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const rect = target.getBoundingClientRect();
      const offset = window.scrollY + rect.top - 96;

      window.scrollTo({
        top: offset,
        behavior: 'smooth',
      });
    });
  });
});

