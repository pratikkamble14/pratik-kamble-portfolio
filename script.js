/* ── THEME TOGGLE ──────────────────────────────────────────── */
const html   = document.documentElement;
const toggle = document.getElementById('themeToggle');
const icon   = toggle.querySelector('.theme-icon');

const saved = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', saved);
icon.textContent = saved === 'dark' ? '☀️' : '🌙';

toggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  icon.textContent = next === 'dark' ? '☀️' : '🌙';
});

/* ── MOBILE MENU ───────────────────────────────────────────── */
const menuBtn  = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuBtn.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── SCROLL: HEADER + ACTIVE NAV ─────────────────────────── */
const header       = document.getElementById('header');
const scrollTopBtn = document.getElementById('scrollTop');
const sections     = document.querySelectorAll('section[id]');
const navItems     = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 60);
  scrollTopBtn.classList.toggle('show', y > 400);

  let current = '';
  sections.forEach(sec => {
    if (y >= sec.offsetTop - 140) current = sec.id;
  });
  navItems.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── SMOOTH SCROLL ─────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ── INTERSECTION OBSERVER ─────────────────────────────────── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(s => observer.observe(s));

/* ── CONTACT FORM ──────────────────────────────────────────── */
const form     = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', e => {
  e.preventDefault();
  const name  = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg   = document.getElementById('message').value.trim();

  if (!name || !email || !msg) {
    formNote.textContent = 'Please fill in all fields.';
    formNote.style.color = '#f87171';
    return;
  }

  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body    = encodeURIComponent(`Hi Pratik,\n\n${msg}\n\nFrom: ${name} (${email})`);
  window.location.href = `mailto:pratikkamble1404004@gmail.com?subject=${subject}&body=${body}`;

  formNote.textContent = '✓ Opening your mail client...';
  formNote.style.color = '#4f8ef7';
  form.reset();
});

/* ── TYPED EFFECT ──────────────────────────────────────────── */
const roles = [
  'DevOps Engineer',
  'Cloud Enthusiast',
  'CI/CD Pipeline Builder',
  'AWS Practitioner',
  'Linux & Bash Scripter',
  'Open Source Contributor',
];
const typedEl = document.getElementById('typedText');
let roleIndex = 0, charIndex = 0, isDeleting = false;

function runTyped() {
  const word = roles[roleIndex];
  if (!isDeleting) {
    typedEl.textContent = word.slice(0, ++charIndex);
    if (charIndex === word.length) {
      isDeleting = true;
      setTimeout(runTyped, 2200);
      return;
    }
  } else {
    typedEl.textContent = word.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(runTyped, isDeleting ? 38 : 88);
}

/* Clear any hardcoded text first, then start */
if (typedEl) {
  typedEl.textContent = '';
  runTyped();
}
