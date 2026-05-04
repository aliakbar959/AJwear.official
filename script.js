/* =============================================
   AJ WEAR — script.js
   Animations, Particles, Cursor, Scroll
   ============================================= */

/* ── NAV SCROLL BEHAVIOUR ─────────────────── */
const navEl = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navEl.classList.add('scrolled');
  } else {
    navEl.classList.remove('scrolled');
  }
});


/* ── CUSTOM CURSOR ────────────────────────── */
const cursor    = document.getElementById('cursor');
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

// Ring grows on interactive elements
document.querySelectorAll('a, button, .product-card, .usp-card, .order-channel')
  .forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
  });


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
    heroBg.style.transform = `scale(1) translateY(${scrollY * 0.3}px)`;
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
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));