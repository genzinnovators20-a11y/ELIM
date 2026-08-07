# Brand assets

Drop the supplied ELIM Forge artwork into this folder using **exactly** these filenames.
The site already references them; until a file exists, a hand-authored SVG stand-in of the
same mark is rendered automatically, so nothing ever breaks.

| Filename                 | Artwork                                                              | Recommended |
| ------------------------ | -------------------------------------------------------------------- | ----------- |
| `elimforge-emblem.png`   | Chrome / iridescent **ELIM FORGE — FORGED WITH BLOCKCHAIN** badge      | 1200×1200, transparent PNG |
| `elimcoin-gold.png`      | Gold **ELIM COIN · BINANCE NETWORK** coin                              | 1000×1000, transparent PNG |
| `og-image.png`           | Social share card                                                     | 1200×630 PNG |
| `apple-touch-icon.png`   | iOS home-screen icon                                                  | 180×180 PNG |

Transparent backgrounds are strongly preferred — both marks are composited over dark,
lit surfaces and are never cropped, stretched, or letter-boxed.

Optional, and picked up automatically if present (served ahead of the PNG by
`<picture>` source order for a smaller payload):

- `elimforge-emblem.webp`
- `elimcoin-gold.webp`
