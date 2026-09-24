<p align="center">
  <img src="https://banner-forge-api.vercel.app/api?type=waving&color=auto&height=300&section=header&text=Nort-Sun&fontSize=90&animation=fadeIn&fontAlignY=38&desc=Dynamic%20README%20banners&descAlignY=51&descAlign=62"/>
</p>

<p align="center">
  <a href="https://stradios.github.io/Nort-Sun-GitHub-Banner-Forge/">
    <img src="https://img.shields.io/badge/Generator-%235c86fa.svg?&logoColor=white"/>
  </a>
  <a href="https://github.com/Stradios/Nort-Sun-GitHub-Banner-Forge/graphs/contributors">
    <img alt="Contributors" src="https://img.shields.io/github/contributors/Stradios/Banner-Forge"/>
  </a>
  <a href="https://github.com/Stradios/Nort-Sun-GitHub-Banner-Forge/issues">
    <img alt="Issues" src="https://img.shields.io/github/issues/Stradios/Banner-Forge?color=779669"/>
  </a>
  <a href="https://github.com/Stradios/Nort-Sun-GitHub-Banner-Forge/pulls">
    <img alt="Pull requests" src="https://img.shields.io/github/issues-pr/Stradios/Banner-Forge?color=779669"/>
  </a>
</p>

# Nort-Sun GitHub Banner Forge

Dynamic README banner images through a simple URL API — same parameters as
[capsule-render](https://github.com/kyechan99/capsule-render), plus `rect`,
`scaleIn`/`blinking` animations, and richer text controls. Deploy your own copy
free on Vercel, or design visually with the
[Nort-Sun studio](https://perchance.org/banner-forge) and copy a
compatible URL straight from it.

## Navigation

1. [How to Use](#how-to-use)
2. [Types](#types)
3. [Color](#color)
4. [Custom Color List](#custom-color-list)
5. [Theme](#theme)
6. [Section](#section)
7. [Reversal](#reversal)
8. [Height](#height)
9. [Text](#text)
10. [Desc](#desc)
11. [Text Background](#text-background)
12. [Text Animation](#text-animation)
13. [Font Color](#fontcolor)
14. [Font Family](#fontfamily)
15. [Font Size](#fontsize)
16. [Font Align - X](#fontalign)
17. [Font Align - Y](#fontaligny)
18. [Desc Size](#descsize)
19. [Desc Align - X](#descalign)
20. [Desc Align - Y](#descaligny)
21. [Rotate](#rotate)
22. [Stroke](#stroke)
23. [Stroke Width](#stroke-width)
24. [Demo](#demo)
25. [Deploy your own](#deploy-your-own)
26. [Running tests](#running-tests)

# How to Use

```
https://banner-forge-api.vercel.app/api?
```

Append query parameters. Markdown:

```
![header](https://banner-forge-api.vercel.app/api?type=wave&color=auto&height=300&section=header&text=Nort-Sun&fontSize=90)
```

HTML:

```
<img src="https://banner-forge-api.vercel.app/api?type=wave&color=auto&height=300&section=header&text=Nort-Sun&fontSize=90" />
```

Use `%20` for spaces and `-nl-` for new lines. Avoid `#`, `&`, `/` inside values.

## Types

`&type=` changes the silhouette. Default `wave`.

| | | |
|---|---|---|
| wave ![wave](docs/samples/wave.svg) | egg ![egg](docs/samples/egg.svg) | shark ![shark](docs/samples/shark.svg) |
| slice ![slice](docs/samples/slice.svg) | rect ![rect](docs/samples/rect.svg) | soft ![soft](docs/samples/soft.svg) |
| rounded ![rounded](docs/samples/rounded.svg) | cylinder ![cylinder](docs/samples/cylinder.svg) | waving ![waving](docs/samples/waving.svg) |
| venom ![venom](docs/samples/venom.svg) | speech ![speech](docs/samples/speech.svg) | blur ![blur](docs/samples/blur.svg) |
| pulse ![pulse](docs/samples/pulse.svg) | checkered ![checkered](docs/samples/checkered.svg) | transparent ![transparent](docs/samples/transparent.svg) |

```
![header](https://banner-forge-api.vercel.app/api?type=slice)
```

## Color

- `&color=auto` : curated random color (font color pairs automatically).
- `&color=timeAuto` : curated random color, decided by time — header and footer match when rendered in the same minute.
- `&color=random` : fully random color.
- `&color=gradient` : curated random gradient.
- `&color=timeGradient` : curated random gradient, decided by time.
- `&color=_hexcode` : solid color, e.g. `&color=B897FF` (no `#`).
- `&color=_custom_gradient` : e.g. `&color=0:EEFF00,100:a82da8`.

```
![header](https://banner-forge-api.vercel.app/api?color=auto)
```

## Custom Color List

Restrict `auto`/`gradient` to your favourite entries by `idx` (see
[src/palette.json](src/palette.json) and [src/gradients.json](src/gradients.json)).
Repeat an idx to weight it.

```
![header](https://banner-forge-api.vercel.app/api?color=gradient&customColorList=0,2,2,5,30)
```

## Theme

Named combinations from [src/themes.json](src/themes.json) — overrides `color`
and `fontColor`. Includes `default dark radical merko gruvbox gruvbox_light
tokyonight onedark cobalt`.

```
![header](https://banner-forge-api.vercel.app/api?type=rect&theme=radical)
```

## Section

- `&section=header` : default
- `&section=footer` : flipped vertically

## Reversal

Mirror left/right: `&reversal=true` (default `false`).

## Height

Image height in px, default `200`.

```
![header](https://banner-forge-api.vercel.app/api?height=400)
```

## Text

Headline over the image: `&text=Hello%20World`.

## Desc

Sub-line: `&desc=Hello%20Banner%20Forge`.

## Text Background

`&textBg=true` draws a band behind the headline for contrast.

## Text Animation

`&animation=` — `fadeIn` (1.2s), `scaleIn` (.8s), `blink` (.6s),
`blinking` (1.6s), `twinkling` (4s). Animations play inline on GitHub.

```
![header](https://banner-forge-api.vercel.app/api?text=Nort-Sun&animation=fadeIn)
```

## FontColor

Hex without `#`, default pairs with the background: `&fontColor=d6ace6`.

## FontFamily

CSS `font-family` (rendering depends on available fonts):
`&fontFamily=Segoe%20UI`.

## FontSize

Default `70`: `&fontSize=40` (no `px`).

## FontAlign

Horizontal position `0~100`, default `50`. With `-nl-` lines, comma-separate
per-line values: `&text=a-nl-b&fontAlign=30,70`.

## FontAlignY

Vertical position `0~100`, default `50` (auto-stacked for multiple lines).

## DescSize

Default `20`: `&descSize=30`.

## DescAlign

Horizontal position of the desc, default `50`.

## DescAlignY

Vertical position of the desc, default `62`.

## Rotate

Rotate the copy block, `-360~360`: `&rotate=-12`.

## Stroke

Text outline color: `&stroke=ff0000`.

## Stroke Width

Outline width: `&stroke-width=2`.

## Demo

```
https://banner-forge-api.vercel.app/api?type=waving&color=auto&height=300&section=header&text=Nort-Sun&fontSize=90&animation=fadeIn&fontAlignY=38&desc=Dynamic%20README%20banners&descAlignY=51&descAlign=62
```

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Stradios/Nort-Sun-GitHub-Banner-Forge)

> Name the Vercel project `banner-forge-api` so the endpoint lands on
> `https://banner-forge-api.vercel.app/api` (`banner-forge` alone is taken).

No dependencies, no build step — the endpoint is a single serverless function
(`api/` + `lib/` + `src/`).

## Running tests

```
npm test
```

Renders every type, color mode, and text option headlessly (`node --test`).

## License

MIT — see [LICENSE](LICENSE).
