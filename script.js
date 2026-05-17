// ═══════════════════════════════════════════════════════
// Tolu Agent Gallery — Interactive Engine
// ═══════════════════════════════════════════════════════

// === GALLERY DATA (preserved) ===
const galleryData = {
  crypto: {
    title: 'Crypto Scanner',
    subtitle: 'Autonomous DeFi scanner with signal triage and fast edge detection.',
    payload: {
      mission: 'scan-onchain-opportunities',
      mode: 'preloaded-json',
      strengths: ['signal parsing', 'cross-chain awareness', 'risk tagging'],
      output: 'actionable watchlist',
    },
  },
  xmonitor: {
    title: 'X Monitor',
    subtitle: 'Narrative radar for trends, social signals, and founder movement.',
    payload: {
      mission: 'track-x-signals',
      mode: 'preloaded-json',
      strengths: ['topic clustering', 'trend surfacing', 'founder discovery'],
      output: 'daily signal digest',
    },
  },
  agenttrust: {
    title: 'AgentTrust',
    subtitle: 'Trust infrastructure for agents, workflows, and wallet-native permissions.',
    payload: {
      mission: 'coordinate-trust',
      mode: 'architecture-first',
      strengths: ['permissions', 'wallet flows', 'agent policy'],
      output: 'secure coordination layer',
    },
  },
  memory: {
    title: 'Memory Palace',
    subtitle: 'Durable recall system that keeps context alive across sessions.',
    payload: {
      mission: 'store-and-recall',
      mode: 'preloaded-json',
      strengths: ['knowledge indexing', 'spatial recall', 'context reuse'],
      output: 'searchable memory rooms',
    },
  },
  skills: {
    title: 'Agent Skills',
    subtitle: 'Twenty-plus reusable skills packaged as shipping power.',
    payload: {
      mission: 'ship-reusable-workflows',
      mode: 'skill-gallery',
      strengths: ['frontend', 'solidity', 'remotion', 'deslop'],
      output: 'portfolio of proof',
    },
  },
};

// === DEMO PANEL ===
const demoTitle = document.getElementById('demo-title');
const demoSubtitle = document.getElementById('demo-subtitle');
const demoOutput = document.getElementById('demo-output');
const demoButtons = document.querySelectorAll('.demo-toggle');

function renderDemo(key) {
  const demo = galleryData[key];
  if (!demo) return;
  demoTitle.textContent = demo.title;
  demoSubtitle.textContent = demo.subtitle;
  demoOutput.textContent = JSON.stringify(demo.payload, null, 2);
}

demoButtons.forEach((button) => {
  button.addEventListener('click', () => renderDemo(button.dataset.demo));
});

renderDemo('crypto');

// === MOUSE POSITION TRACKING ===
const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// === SCROLL PROGRESS BAR ===
const scrollProgress = document.getElementById('scrollProgress');
const siteHeader = document.getElementById('siteHeader');

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = progress + '%';

  // Header background on scroll
  if (scrollTop > 50) {
    siteHeader.classList.add('scrolled');
  } else {
    siteHeader.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

// === SCROLL REVEAL (IntersectionObserver) ===
const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// === MAGNETIC BUTTONS ===
document.querySelectorAll('.magnetic').forEach((el) => {
  const strength = parseFloat(el.dataset.strength) || 15;

  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * (strength / 100)}px, ${y * (strength / 100)}px)`;
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
  });
});

// === 3D TILT CARDS ===
document.querySelectorAll('.tilt-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -12;
    const rotateY = (x - 0.5) * 12;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// === HERO ORB MOUSE TRACKING ===
const heroOrb = document.querySelector('.hero-orb');
if (heroOrb) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    heroOrb.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// === CANVAS PARTICLE SYSTEM (with mouse interaction) ===
const canvas = document.getElementById('nebula');
const ctx = canvas.getContext('2d');
let particles = [];
let canvasW = 0;
let canvasH = 0;
const dpr = window.devicePixelRatio || 1;

function resize() {
  canvasW = window.innerWidth;
  canvasH = window.innerHeight;
  canvas.width = canvasW * dpr;
  canvas.height = canvasH * dpr;
  canvas.style.width = canvasW + 'px';
  canvas.style.height = canvasH + 'px';
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);

  const count = Math.min(60, Math.floor(canvasW / 25));
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvasW,
      y: Math.random() * canvasH,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      hue: Math.random() > 0.5 ? 188 : 266,
      alpha: Math.random() * 0.4 + 0.3,
    });
  }
}

const CONNECTION_DIST = 140;
const MOUSE_RADIUS = 180;

function tick() {
  ctx.clearRect(0, 0, canvasW, canvasH);

  // Get scroll-adjusted mouse position for canvas
  const mx = mouse.x;
  const my = mouse.y;

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];

    // Mouse repulsion
    const dmx = p.x - mx;
    const dmy = p.y - my;
    const mouseDist = Math.sqrt(dmx * dmx + dmy * dmy);
    if (mouseDist < MOUSE_RADIUS && mouseDist > 0) {
      const force = (MOUSE_RADIUS - mouseDist) / MOUSE_RADIUS;
      p.vx += (dmx / mouseDist) * force * 0.3;
      p.vy += (dmy / mouseDist) * force * 0.3;
    }

    // Dampen velocity
    p.vx *= 0.98;
    p.vy *= 0.98;

    // Apply velocity
    p.x += p.vx;
    p.y += p.vy;

    // Wrap edges
    if (p.x < -20) p.x = canvasW + 20;
    if (p.x > canvasW + 20) p.x = -20;
    if (p.y < -20) p.y = canvasH + 20;
    if (p.y > canvasH + 20) p.y = -20;

    // Draw particle
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${p.hue}, 100%, 72%, ${p.alpha})`;
    ctx.fill();

    // Draw connections
    for (let j = i + 1; j < particles.length; j++) {
      const b = particles[j];
      const dx = p.x - b.x;
      const dy = p.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONNECTION_DIST) {
        const opacity = 0.08 * (1 - dist / CONNECTION_DIST);
        ctx.strokeStyle = `rgba(134, 179, 255, ${opacity})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(tick);
}

window.addEventListener('resize', resize);
resize();
tick();

// === SMOOTH SCROLL FOR NAV LINKS ===
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
