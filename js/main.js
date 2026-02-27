/* ============================================
   AYUSHMAN DASH — PORTFOLIO JS
============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── PROGRESS BAR ──────────────────────────
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    if (progressBar) progressBar.style.width = pct + '%';
  }, { passive: true });

  // ── NAVBAR SCROLL ─────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }
  }, { passive: true });

  // ── ACTIVE NAV LINKS ──────────────────────
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  const setActiveLink = () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', setActiveLink, { passive: true });

  // ── HAMBURGER MENU ────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', navMenu.classList.contains('open'));
    });
    // close on link click
    navMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navMenu.classList.remove('open'));
    });
  }

  // ── EXPERIENCE TABS ───────────────────────
  const expNavItems = document.querySelectorAll('.exp-nav-item');
  const expPanes    = document.querySelectorAll('.exp-pane');

  expNavItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.dataset.tab;
      expNavItems.forEach(i => i.classList.remove('active'));
      expPanes.forEach(p => p.classList.remove('active'));
      item.classList.add('active');
      const pane = document.getElementById(target);
      if (pane) pane.classList.add('active');
    });
  });

  // ── SCROLL REVEAL ─────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => observer.observe(el));

  // ── STAGGER CHILDREN ──────────────────────
  document.querySelectorAll('.skills-grid, .proj-grid').forEach(grid => {
    const children = grid.children;
    Array.from(children).forEach((child, i) => {
      child.classList.add('reveal');
      child.style.transitionDelay = `${i * 0.08}s`;
      observer.observe(child);
    });
  });

  // ── TYPED HERO SUBTITLE ───────────────────
  const roles = [
    'Applied AI / LLM Engineer',
    'RAG Architecture Specialist',
    'Data Analyst',
    'Fintech Builder'
  ];
  const typedEl = document.getElementById('typed-role');
  if (typedEl) {
    let roleIdx = 0, charIdx = 0, deleting = false;
    const type = () => {
      const current = roles[roleIdx];
      if (!deleting) {
        typedEl.textContent = current.slice(0, ++charIdx);
        if (charIdx === current.length) {
          deleting = true;
          setTimeout(type, 2200); return;
        }
      } else {
        typedEl.textContent = current.slice(0, --charIdx);
        if (charIdx === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
        }
      }
      setTimeout(type, deleting ? 45 : 80);
    };
    setTimeout(type, 1200);
  }

  // ── SMOOTH SCROLL ─────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── SKILL CARD GLOW ON MOUSE ──────────────
  document.querySelectorAll('.skill-card, .proj-card, .contact-link').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });
  });

  // ── PROFILE IMAGE FALLBACK ────────────────
  document.querySelectorAll('.profile-img').forEach(img => {
    img.addEventListener('error', function() {
      const wrap = this.closest('.photo-card') || this.parentElement;
      if (wrap) {
        const ph = document.createElement('div');
        ph.style.cssText = `
          width:100%; height:100%; min-height:480px;
          background: linear-gradient(135deg, #0f1318 0%, #141920 50%, #0d1117 100%);
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          gap:16px;
        `;
        ph.innerHTML = `
          <div style="width:100px;height:100px;border-radius:50%;background:linear-gradient(135deg,#00e5c3,#00b8e6);display:flex;align-items:center;justify-content:center;font-size:2.5rem;font-family:'Clash Display',serif;font-weight:700;color:#000;">AD</div>
          <div style="font-family:'JetBrains Mono',monospace;font-size:0.75rem;color:#5a6473;letter-spacing:0.1em;">AYUSHMAN DASH</div>
        `;
        this.replaceWith(ph);
      }
    });
  });

  console.log('%c Ayushman Dash — Portfolio ', 'background:#00e5c3;color:#000;font-weight:bold;padding:4px 8px;border-radius:4px;');
});
