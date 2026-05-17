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

const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    }
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const canvas = document.getElementById('nebula');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  particles = Array.from({ length: Math.min(42, Math.floor(window.innerWidth / 30)) }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.8 + 0.5,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22,
    hue: Math.random() > 0.5 ? 188 : 266,
  }));
}

function tick() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < -20) p.x = window.innerWidth + 20;
    if (p.x > window.innerWidth + 20) p.x = -20;
    if (p.y < -20) p.y = window.innerHeight + 20;
    if (p.y > window.innerHeight + 20) p.y = -20;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${p.hue}, 100%, 72%, 0.65)`;
    ctx.fill();
  });

  for (let i = 0; i < particles.length; i += 1) {
    for (let j = i + 1; j < particles.length; j += 1) {
      const a = particles[i];
      const b = particles[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 135) {
        ctx.strokeStyle = `rgba(134, 179, 255, ${0.1 * (1 - distance / 135)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
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
