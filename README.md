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
├─ layouts/        RootLayout, Navbar, MobileNav, AuthLayout
│  └─ footer/      Footer + its brand plate, link columns and social rail
├─ pages/          Home (the landing page), News, Login, Signup, NotFound
├─ sections/       Landing-page sections grouped by area
│                  (home / ecosystem / elimcoin / staking / shared)
├─ theme/          Design tokens, palette, typography, component overrides
└─ utils/          Accent ramps
```

### Single landing page

Everything the navigation points at lives on `/`. ELIMCOIN, Ecosystem and
Roadmap are **sections**, reached by anchor:

| Nav item  | Target        |
| --------- | ------------- |
| HOME      | `#home`       |
| ELIMCOIN  | `#elimcoin`   |
| ECOSYSTEM | `#ecosystem`  |
| ROADMAP   | `#roadmap`    |

`src/pages/Home.jsx` composes the sections in the order of the source document;
each section keeps its own module, so the page is a table of contents, not a
monolith. The former standalone URLs (`/elimcoin`, `/ecosystem`, `/roadmap`)
redirect into the matching anchor — see `legacyRedirects` in `constants/nav.js`.

Remaining routes: `/login`, `/signup`, and `/news` (retained but no longer part
of the primary journey).

### The footer

The footer is the closing section of the site rather than a utility strip. Its
centrepiece, `layouts/footer/BrandPlate.jsx`, is a hand-built recreation of the
ELIM FORGE corporate plate — **no image of that card is used anywhere**. The
beveled double frame is two concentric masked gradient hairlines, the emerald
ground and navy chevron are CSS gradients, the geometric lattice is three
repeating gradients, the chevron cut is a `clip-path` polygon with its gold edge
stroked by an overlaid SVG (`vectorEffect="non-scaling-stroke"`), the twin palm
is a drawn vector (`components/brand/PalmMark.jsx`) and the coin is the site's
existing ELIM COIN asset, held static.

Below the plate: navigation, resources, account, the social rail, the strapline
and the legal line. The registered office, mobile number and website come from
`contact` in `constants/content.js` and are mirrored in the `Organization`
structured data in `index.html` — change both together.

Anchor scrolling is centralised: `scrollToTarget()` in `hooks/useSmoothScroll.js`
resolves the destination and drives Lenis; `ScrollManager` in `RootLayout` handles
deep links and cross-route hashes, waiting for the anchor to exist *and* settle
before scrolling.

### Design system

Everything visual resolves from `theme/`. Components should reach for a token or
a variant, not invent a value.

**Type.** `theme/typography.js` owns the whole scale. Sizes are fluid `clamp()`,
tracking tightens as type grows (`tracking.display` → `tracking.relaxed`), and
leading opens as it shrinks. Beyond MUI's own variants there are:

| Variant | Role |
| --- | --- |
| `display1` / `display2` | Hero and chapter openers |
| `quoteLg` / `quote` / `quoteSm` | The serif statement voice, in its three real sizes |
| `stat` / `statSm` | Figures — `tabular-nums`, so counters don't shiver |
| `mono` | Addresses and technical data |

Set type with `variant`, not with `sx={{ fontSize }}`. Headings carry
`text-wrap: balance` and prose carries `text-wrap: pretty` by default, so ragged
last lines and one-word orphans are handled by the system.

Long-form copy is capped by **reading measure** (`layout.measure`, 68ch) rather
than by pixel width — `SectionHeading` applies it to every lede automatically.

**Surface.** `elevation[0..3]` moves background, border and shadow together; a
card that steps up in light also steps up in edge definition. Translucent whites
come from the `alpha` ramp.

**Motion.** Durations and easings live in `durations` / `easings` / `motion`.
Reveals travel 18px, not 30 — opacity carries the entrance and distance only
supplies direction. Every variant has a reduced-motion branch.

**Hero choreography.** `sections/home/Hero.jsx` exports a `CUE` map holding the
entrance timeline in seconds. It is grouped, not evenly stepped — identity,
message, action — and the whole masthead is settled by **~1.5s**, with the coin
landing at ~1.6s. Treat that as a budget: an even stagger across the nine
elements pushed the last of them past 2s, which spends the entire first
impression watching the page assemble itself. Blur is animated in one place, the
headline, because animating `filter` repaints every frame.

### Cursor lighting

Two layers, one mechanism. `CursorLight` publishes the pointer position to
`--ef-cursor-x/y` on the root element and paints a soft bloom that eases toward
the cursor at ~14% per frame — the lag is what makes it read as light rather
than as a cursor attachment. `usePointerSpotlight` does the same per surface,
writing element-local `--ef-spot-x/y`, and `GlassCard` uses it to wash the face
and brighten the border where the pointer is.

Three rules hold this together, and any new lit surface must keep them:

1. **Pointer events never touch React state.** Coordinates land in a ref and one
   `requestAnimationFrame` writes CSS variables. Nothing re-renders while the
   pointer moves.
2. **The loop parks.** When the light catches up and the pointer stops, the
   frame is released. Idle cost is zero.
3. **It is opt-out at the source.** `lightingEnabled()` requires a fine pointer
   and no `prefers-reduced-motion`. When it is false the spotlight layer is not
   rendered at all, so touch and reduced-motion clients carry no dead DOM.

### Three things worth knowing before editing

1. **Material UI v9 removed system props from `Stack` and `Grid`.** `justifyContent`,
   `alignItems`, `flexWrap` and friends are silently dropped if passed as props to
   the MUI components directly. Import them from `@/components/ui/layout` instead —
   those wrappers hoist the props into `sx`.
2. **Spacing props multiply by 8.** `pt: 132` is 1056px, not 132px. Section rhythm
   values in `theme/tokens.js` are px strings for exactly this reason.
3. **Sections retained from spec v1.** Compliance & Safety and the staking-protocol
   chapter (Smart Staking Rewards Visualizer, Elite Staking Bridge, Hybrid Asset
   Architecture, Algorithmic Forex Strategy, Reward Distribution) are not in spec v2
   but are kept on the page by client instruction. Their copy is flagged as such in
   `constants/content.js`; remove the corresponding lines from `pages/Home.jsx` to
   drop them.

### Path alias

`@` resolves to `src/` (configured in `vite.config.js` and `jsconfig.json`).

---

## Performance

- The landing page is one route, so there is no cross-page hop; the WebGL bundle
  is still dynamically imported, and only on desktop, non-touch, non-reduced-motion
  clients, after the browser is idle. Account routes and the newsroom stay split out.
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
which is required — without it, refreshing `/login` or hitting the legacy
`/elimcoin` redirect returns 404 — plus long-lived immutable caching for hashed
assets and a `no-store` rule for `index.html`.

The build is fully static: any host that can serve a directory with an SPA
fallback works (Nginx, Caddy, Apache, S3 + CloudFront).

---

## Integration points

Two places are intentionally UI-only and marked in the source:

- `src/pages/Login.jsx` / `src/pages/Signup.jsx` — client-side validation is
  complete; the submit handler is where the auth service call goes.
- `src/pages/News.jsx` — a designed empty state, retained but unlinked from the
  navigation. Replace the placeholder panel with the article list once a CMS or
  feed endpoint exists. No articles are fabricated.

Social links (`constants/nav.js` and the `community` block in `constants/content.js`),
the **Read Whitepaper** buttons, and the footer policy links are placeholders (`#`)
pending real URLs.
