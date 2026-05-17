# agent-workflows

Interactive Agent Gallery portfolio — Tolu's showcase for agentic systems, blockchain, and full-stack engineering.

**Live site:** [tolu.is-a.dev](https://tolu.is-a.dev)

## What This Is

An interactive portfolio built as a single-page application with:

- **5 flagship exhibits** — Crypto Scanner, X Monitor, AgentTrust, Memory Palace, Agent Skills
- **Interactive demo panel** — Pre-recorded JSON payloads for each exhibit
- **3D motion** — Animated canvas background with floating orbs and particle network
- **Ryan Luo-inspired design** — Dark theme, blur-card system, scroll-driven reveals
- **Zero dependencies** — Plain HTML, CSS, and JavaScript for fast load and easy deploy

## Quick Start

```bash
# Serve locally
python3 -m http.server 8080
# Open http://localhost:8080

# Or use Docker
docker build -t agent-gallery .
docker run -p 8080:80 agent-gallery
```

## Deploy to Akash

```bash
# Build and push to GHCR
docker build -t ghcr.io/toxmon/agent-workflows:latest .
docker push ghcr.io/toxmon/agent-workflows:latest

# Deploy using Akash SDL
provider-services tx deployment create akash-sdl.yaml --from wallet
```

## Tech Stack

| Layer | Choice |
|-------|--------|
| Runtime | Vanilla HTML/CSS/JS |
| Server | nginx:1.25.3-alpine |
| Container | Docker |
| Hosting | Akash Network (decentralized cloud) |
| Registry | GitHub Container Registry (GHCR) |
| DNS | is-a.dev subdomain |

## File Structure

```
├── index.html      # Main page with all sections
├── script.js       # Demo data, scroll reveals, canvas animation
├── styles.css      # Design system, layout, animations
├── Dockerfile      # nginx container
├── nginx.conf      # Security headers, caching, routing
├── akash-sdl.yaml  # Akash deployment config
├── CHANGELOG.md
└── README.md
```

## License

MIT
