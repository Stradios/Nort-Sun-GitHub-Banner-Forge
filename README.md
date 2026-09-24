# Nort-Sun GitHub Banner Forge

Design a README banner — pick a shape, palette, and font, then export a crisp PNG, GIF, or SVG.
Or render banners on the fly with the capsule-render-compatible URL API.

- Studio: `https://stradios.github.io/Nort-Sun-GitHub-Banner-Forge/`
- API: `https://banner-forge-api.vercel.app/api?type=wave&color=auto&height=200&text=Hi`
- Perchance: `https://perchance.org/banner-forge`

The snippet box in the studio now prints a live API URL for your open design —
every tweak rewrites it, ready to paste into your profile README.

## Repo layout (unzip this release straight into the repo root)

- `index.html` — the visual studio (GitHub Pages serves it, all client-side)
- `api.html` — in-browser renderer for capsule-style params (preview + SVG download)
- `samples/` — pre-rendered SVGs, hotlinkable as images
- `capsule-api/` — Vercel URL API backend (`api/` + `lib/` + `src/`)
- `nort-sun-standalone.html` — offline single-file build (double-click, no server)
- `perchance-source/` — Perchance generator source (`main.pjs` + `index.html`)

## Deploy the site (GitHub Pages)

Repo Settings → Pages → Deploy from a branch → `main` / `/(root)` → Save.

## Deploy the API (Vercel)

1. Vercel → Add New → Project → import `Stradios/Nort-Sun-GitHub-Banner-Forge`.
2. Set **Root Directory** to `capsule-api`, project name to `banner-forge-api`.
3. Test: `https://banner-forge-api.vercel.app/api?type=wave&color=auto&height=200&text=Hi`
