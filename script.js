/* =============================================
   AJ WEAR — script.js  (Upgraded v2)
   Animations, Particles, Cursor, Scroll, Nav
   ============================================= */

/* ── NAV SCROLL BEHAVIOUR ─────────────────── */
const navEl = document.querySelector('nav');
window.addEventListener('scroll', () => {
  navEl.classList.toggle('scrolled', window.scrollY > 60);
});


/* ── HAMBURGER / MOBILE MENU ──────────────── */
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});


/* ── CUSTOM CURSOR ────────────────────────── */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX - 4 + 'px';
  cursor.style.top  = mouseY - 4 + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .product-card, .usp-card, .order-channel, .review-card')
  .forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
  });

// Hide cursor on mobile
if ('ontouchstart' in window) {
  cursor.style.display     = 'none';
  cursorRing.style.display = 'none';
  document.body.style.cursor = 'auto';
}


/* ── HERO CINEMATIC ZOOM-IN ───────────────── */
window.addEventListener('load', () => {
  const heroBg = document.getElementById('heroBg');
  if (heroBg) heroBg.classList.add('loaded');
});


/* ── FLOATING PARTICLES ───────────────────── */
const canvas = document.getElementById('particles');
const ctx    = canvas.getContext('2d');

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
for (let i = 0; i < 55; i++) {
  particles.push({
    x:  Math.random() * canvas.width,
    y:  Math.random() * canvas.height,
    r:  Math.random() * 1.2 + 0.3,
    dx: (Math.random() - 0.5) * 0.25,
    dy: (Math.random() - 0.5) * 0.25,
    o:  Math.random() * 0.4 + 0.1
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200, 169, 110, ${p.o})`;
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

window.addEventListener('resize', () => {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
});


/* ── PARALLAX HERO SCROLL ─────────────────── */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroBg  = document.getElementById('heroBg');
  if (heroBg) {
    heroBg.style.transform = `scale(1) translateY(${scrollY * 0.28}px)`;
  }
});


/* ── SCROLL REVEAL ────────────────────────── */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));


/* ── PRODUCT CARD — always visible on touch ─ */
// On mobile, product info is always shown (handled via CSS),
// but we also make sure reveal class doesn't block it.
if ('ontouchstart' in window) {
  document.querySelectorAll('.product-overlay').forEach(el => {
    el.style.opacity = '1';
  });
}
