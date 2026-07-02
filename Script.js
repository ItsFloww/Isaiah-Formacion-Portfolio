/* ============================================================
   Isaiah Daniel Formacion — Portfolio Script v3
   ============================================================ */

/* ---- CERTIFICATE DATA ------------------------------------ */
const certData = {
  'smart-systems': {
    title: 'Smart Systems & IoT',
    org:   'GrayVantage — January 2026',
    img:   '../Materials/certificates/smart-systems.jpg',
    pdf:   '../Materials/certificates/smart-systems.pdf',
  },
  'cloud-computing': {
    title: 'Cloud Computing',
    org:   'GrayVantage — January 2026',
    img:   '../Materials/certificates/cloud-computing.jpg',
    pdf:   '../Materials/certificates/cloud-computing.pdf',
  },
  'green-it': {
    title: 'Green IT',
    org:   'GrayVantage — January 2026',
    img:   '../Materials/certificates/green-it.jpg',
    pdf:   '../Materials/certificates/green-it.pdf',
  },
  'cybersecurity': {
    title: 'Cybersecurity 101',
    org:   'R. Abinal Impact Learning — January 2026',
    img:   '../Materials/certificates/cybersecurity.jpg',
    pdf:   '../Materials/certificates/cybersecurity.pdf',
  },
  'hour-of-code': {
    title: 'AI Ready ASEAN: Hour of Code',
    org:   'ASEAN Foundation — January 2026',
    img:   '../Materials/certificates/hour-of-code.jpg',
    pdf:   '../Materials/certificates/hour-of-code.pdf',
  },
};

/* ---- SCROLL REVEAL --------------------------------------- */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

/* ---- METER RING ------------------------------------------ */
function initMeter() {
  const ring = document.getElementById('meterFg');
  if (!ring) return;

  const pct = parseInt(ring.dataset.pct, 10) || 95;
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (circumference * pct / 100);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        ring.style.strokeDasharray = circumference;
        ring.style.strokeDashoffset = offset;
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });

  const wrap = ring.closest('.fp-ring');
  if (wrap) observer.observe(wrap);
}

/* ---- COUNTERS -------------------------------------------- */
function initCounters() {
  const nums = document.querySelectorAll('.stat-num');
  if (!nums.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        if (isNaN(target)) return;
        observer.unobserve(el);
        animate(el, target);
      }
    });
  }, { threshold: 0.5 });

  nums.forEach(el => observer.observe(el));
}

function animate(el, target) {
  const start = performance.now();
  const dur = 1000;
  function tick(now) {
    const t = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(eased * target);
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}

/* ---- HAMBURGER ------------------------------------------- */
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  function toggle(open) {
    const isOpen = open !== undefined ? open : !menu.classList.contains('open');
    btn.classList.toggle('open', isOpen);
    menu.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
    menu.setAttribute('aria-hidden', !isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen) menu.style.display = 'block';
    else setTimeout(() => { if (!menu.classList.contains('open')) menu.style.display = 'none'; }, 250);
  }

  btn.addEventListener('click', () => toggle());
  document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => toggle(false)));
  document.addEventListener('click', e => { if (!btn.contains(e.target) && !menu.contains(e.target)) toggle(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) { toggle(false); btn.focus(); } });
}

/* ---- CERT MODAL ------------------------------------------ */
function initModal() {
  const overlay = document.getElementById('certModal');
  if (!overlay) return;

  const title = document.getElementById('modalTitle');
  const org = document.getElementById('modalOrg');
  const img = document.getElementById('modalImg');
  const loading = document.getElementById('modalLoading');
  const pdf = document.getElementById('modalPdfLink');
  const close = document.getElementById('modalClose');
  const closeBtn = document.getElementById('modalCloseBtn');

  let lastFocus = null;
  let closeTimer = null;

  function open(key) {
    const cert = certData[key];
    if (!cert) return;

    if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
    lastFocus = document.activeElement;

    title.textContent = cert.title;
    org.textContent = cert.org;
    pdf.href = cert.pdf;

    img.style.opacity = '0';
    loading.classList.add('visible');

    img.onload = () => { loading.classList.remove('visible'); img.style.opacity = '1'; };
    img.onerror = () => { loading.textContent = 'Image not found.'; };
    img.src = cert.img;

    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => close.focus());
  }

  function closeModal() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    closeTimer = setTimeout(() => {
      img.src = '';
      loading.innerHTML = '<span class="spinner" aria-hidden="true"></span> Loading&hellip;';
      loading.classList.remove('visible');
      if (lastFocus) lastFocus.focus();
      closeTimer = null;
    }, 300);
  }

  document.querySelectorAll('.cert-card').forEach(c => {
    c.addEventListener('click', () => open(c.dataset.cert));
    c.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(c.dataset.cert); } });
  });

  close.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal(); });
}

/* ---- NAV SCROLL + ACTIVE LINKS --------------------------- */
function initNav() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  const links = document.querySelectorAll('.nav-link');
  const sections = [];
  links.forEach(l => {
    const id = l.getAttribute('href');
    if (id && id.startsWith('#')) {
      const s = document.querySelector(id);
      if (s) sections.push({ el: s, link: l });
    }
  });

  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 30);

    let active = '';
    sections.forEach(s => {
      const top = s.el.offsetTop - 120;
      const bottom = top + s.el.offsetHeight;
      if (y >= top && y < bottom) active = s.link.getAttribute('href');
    });

    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === active));
    ticking = false;
  }

  window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();
}

/* ---- SMOOTH ANCHORS -------------------------------------- */
function initAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    a.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    });
  });
}

/* ---- LOADER ---------------------------------------------- */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  setTimeout(() => {
    loader.classList.add('done');
    document.body.classList.add('loaded');
    setTimeout(() => { loader.style.display = 'none'; }, 500);
  }, 2200);
}

/* ---- INIT ------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initReveal();
  initMeter();
  initCounters();
  initHamburger();
  initModal();
  initNav();
  initAnchors();
});
