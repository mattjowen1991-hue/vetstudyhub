/* ============================================
   VetStudyHub — Main JavaScript
   ============================================ */

/**
 * Mobile hamburger menu toggle
 */
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.querySelector('.hamburger');
  const isOpen = menu.classList.contains('open');

  if (isOpen) {
    menu.style.opacity = '0';
    setTimeout(() => { menu.classList.remove('open'); }, 300);
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  } else {
    menu.classList.add('open');
    requestAnimationFrame(() => { menu.style.opacity = '1'; });
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Close mobile menu on Escape key
 */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const menu = document.getElementById('mobileMenu');
    if (menu.classList.contains('open')) toggleMenu();
  }
});

/**
 * Scroll-triggered fade-in animations
 * Uses IntersectionObserver for performant scroll detection
 */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

/**
 * Founder carousel
 * Swipe between founder cards
 */
(function() {
  const cards = document.querySelectorAll('.founder-card');
  const dots = document.querySelectorAll('.founder-dot');
  const prevBtn = document.getElementById('founderPrev');
  const nextBtn = document.getElementById('founderNext');
  if (!cards.length) return;

  let current = 0;

  function showCard(index) {
    cards.forEach((c, i) => {
      c.classList.remove('active');
      c.style.transform = i < index ? 'translateX(-60px)' : 'translateX(60px)';
    });
    cards[index].classList.add('active');
    cards[index].style.transform = 'translateX(0)';
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    current = index;
  }

  prevBtn.addEventListener('click', () => showCard(current === 0 ? cards.length - 1 : current - 1));
  nextBtn.addEventListener('click', () => showCard(current === cards.length - 1 ? 0 : current + 1));

  // Touch swipe support
  let startX = 0;
  const track = document.getElementById('founderTrack');
  track.addEventListener('touchstart', e => startX = e.touches[0].clientX, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextBtn.click() : prevBtn.click();
    }
  }, { passive: true });
})();
document.querySelectorAll('.option').forEach(opt => {
  opt.addEventListener('click', function () {
    // Prevent re-answering once answered
    if (document.querySelector('.option.answered')) return;

    // Mark all as answered to lock in the choice
    document.querySelectorAll('.option').forEach(o => o.classList.add('answered'));

    // Highlight the correct answer green
    document.querySelectorAll('.option').forEach(o => {
      if (o.dataset.correct === 'true') {
        o.style.borderColor = '#7a9e7e';
        o.style.background = 'rgba(122,158,126,0.08)';
        o.querySelector('.option-letter').style.background = '#1a3a2a';
        o.querySelector('.option-letter').style.color = '#d4a853';
        o.style.fontWeight = '600';
        o.style.color = '#1a3a2a';
      }
    });

    // If this was wrong, highlight it in coral
    if (this.dataset.correct !== 'true') {
      this.style.borderColor = '#e87461';
      this.style.background = 'rgba(232,116,97,0.06)';
      this.querySelector('.option-letter').style.background = '#e87461';
      this.querySelector('.option-letter').style.color = '#ffffff';
    }
  });
});

/**
 * Smooth scroll for anchor links
 * Accounts for fixed nav height offset
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navHeight = document.querySelector('nav').offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

/**
 * Nav shadow on scroll
 * Adds subtle shadow when scrolled past 50px
 */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.style.boxShadow = '0 4px 20px rgba(26,58,42,0.08)';
  } else {
    nav.style.boxShadow = 'none';
  }
}, { passive: true });
