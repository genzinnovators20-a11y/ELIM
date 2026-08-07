# ELIM FORGE

**Forged with blockchain – forged in code. Fuelled by BSC.**

Marketing and product site for ELIM FORGE and the ELIM Coin (ELM) ecosystem.
React 19 · Material UI v9 · Vite 8 · Framer Motion · React Three Fiber.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production bundle → dist/
npm run preview    # serve dist/ locally on :4173
npm run lint
```

Requires **Node 20.19+** (developed on Node 24).

---

## Brand artwork

The supplied ELIM Forge artwork goes in `public/brand/` using these exact names:

| File                     | Artwork                                              |
| ------------------------ | ---------------------------------------------------- |
| `elimforge-emblem.png`   | Chrome **ELIM FORGE — FORGED WITH BLOCKCHAIN** badge  |
| `elimcoin-gold.png`      | Gold **ELIM COIN** coin                               |
| `og-image.png`           | 1200×630 social share card                            |
| `apple-touch-icon.png`   | 180×180 iOS icon                                      |

Until a file is present the site renders a hand-authored SVG of the same mark, so
nothing breaks and no broken-image placeholder ever appears. Drop the PNGs in and
every surface picks them up automatically — no rebuild needed for `public/` in dev,
and a normal `npm run build` for production. See `public/brand/README.md`.

---

## Content

`src/constants/content.js` is the single source of truth and holds every string
from the official ELIM FORGE document **verbatim** — wording, punctuation
(`–` vs `—`), British spellings and all figures. Components never inline copy.

> Do not rewrite, summarise, shorten or "fix" anything in that file. Where the
> source used colour for emphasis, the hierarchy is carried structurally
> (`label` / `body` pairs, `emphasis` flags) and expressed visually in the
> components.

---

## Architecture

```
src/
├─ animations/     Shared motion vocabulary (variants, easings, viewport config)
├─ components/
│  ├─ background/  Fixed ground: grid, film grain, light rig
│  ├─ brand/       Logo, monogram, artwork loader + vector fallbacks
│  ├─ charts/      Hand-built SVG donut, allocation meters, radial gauge
│  ├─ three/       Lazily loaded WebGL coin (R3F) + procedural face texture
│  ├─ ui/          Section, Reveal, GlassCard, Eyebrow, Icon, layout primitives…
│  └─ visuals/     Forge rings, market pulse canvas, hero forge stage
├─ constants/      content.js (verbatim copy), nav.js, seo.js
├─ hooks/          useSeo, useSmoothScroll, useCountUp, useActiveSection…
├─ layouts/        RootLayout, Navbar, MobileNav, Footer, AuthLayout
├─ pages/          Home, ElimCoin, Ecosystem, News, Login, Signup, NotFound
├─ sections/       Page sections grouped by area (home / elimcoin / ecosystem / staking)
├─ theme/          Design tokens, palette, typography, component overrides
└─ utils/          Accent ramps
```

**Routes** — `/` · `/elimcoin` · `/ecosystem` · `/news` · `/login` · `/signup`,
matching the navigation defined in the source document. All non-home routes are
code-split.

### Two things worth knowing before editing

1. **Material UI v9 removed system props from `Stack` and `Grid`.** `justifyContent`,
   `alignItems`, `flexWrap` and friends are silently dropped if passed as props to
   the MUI components directly. Import them from `@/components/ui/layout` instead —
   those wrappers hoist the props into `sx`.
2. **Spacing props multiply by 8.** `pt: 132` is 1056px, not 132px. Section rhythm
   values in `theme/tokens.js` are px strings for exactly this reason.

### Path alias

`@` resolves to `src/` (configured in `vite.config.js` and `jsconfig.json`).

---

## Performance

- Route-level code splitting; the WebGL bundle is dynamically imported and only
  on desktop, non-touch, non-reduced-motion clients, after the browser is idle.
- Deterministic vendor chunks (`vendor-react`, `vendor-mui`, `vendor-motion`,
  `vendor-three`) so long-lived assets stay cached across releases.
- Self-hosted variable fonts (`@fontsource`) — no third-party font CDN, no
  render-blocking request, subset per unicode-range.
- Animation is transform/opacity only; canvas and WebGL loops pause when
  off-screen or when the tab is hidden.
- Every motion path has a `prefers-reduced-motion` branch, including the
  smooth-scroll layer, which is disabled outright.

---

## Deployment (Contabo VPS)

```bash
# one-time on the server
sudo mkdir -p /var/www/elimforge/releases
sudo chown -R "$USER":"$USER" /var/www/elimforge
sudo cp deploy/nginx.conf /etc/nginx/sites-available/elimforge
sudo ln -s /etc/nginx/sites-available/elimforge /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d elimforge.com -d www.elimforge.com

# every release, from your machine
./deploy/deploy.sh user@your-server-ip
```

`deploy/nginx.conf` includes the **SPA fallback** (`try_files $uri /index.html`),
which is required — without it, refreshing `/elimcoin` returns 404 — plus
long-lived immutable caching for hashed assets and a `no-store` rule for
`index.html`.

The build is fully static: any host that can serve a directory with an SPA
fallback works (Nginx, Caddy, Apache, S3 + CloudFront).

---

## Integration points

Two places are intentionally UI-only and marked in the source:

- `src/pages/Login.jsx` / `src/pages/Signup.jsx` — client-side validation is
  complete; the submit handler is where the auth service call goes.
- `src/pages/News.jsx` — a designed empty state. Replace the placeholder panel
  with the article list once a CMS or feed endpoint exists. No articles are
  fabricated.

Social links in `src/constants/nav.js` are placeholders (`#`) pending real URLs.
