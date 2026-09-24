# Nort-Sun GitHub Banner Forge on GitHub Pages

Static bundle: visual studio + query-param preview renderer. No server needed.

## Deploy

1. Unzip this bundle into your `Nort-Sun-GitHub-Banner-Forge` repo root (keep `index.html`, `api.html`, `samples/`).
2. Repo Settings → Pages → Deploy from a branch → `main` / `/ (root)` → Save.
3. Open `https://stradios.github.io/Nort-Sun-GitHub-Banner-Forge/` for the studio.

## Pages

- `index.html` — the full Nort-Sun studio (design + PNG/GIF/SVG export, all client-side). AI headline buttons hide themselves here.
- `api.html` — renders a banner from capsule-style params entirely in the browser, e.g. `api.html?type=shark&color=auto&height=300&text=Hello&fontSize=90`. Preview + SVG download. Note: Pages cannot serve dynamic images, so this URL itself is not embeddable — download the SVG (or use the Vercel API) for `<img>` embeds.
- `samples/` — pre-rendered SVGs for every type, hotlinkable as images.
