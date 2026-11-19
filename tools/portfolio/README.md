# Projects section

Builds `src/projects.html`, the top-six block in `src/index.html` and the mock-ups in `src/img/projects/` from `projects.json`. Firebase deploys only `src/`, so this folder never ships.

```bash
cd tools/portfolio
npm install            # playwright + sharp; uses the installed Chrome, no browser download
npm run build          # render every mock-up and rebuild the pages
node build.mjs --only=tickmark,medfeed   # re-render a few mock-ups
npm run pages          # rebuild the pages without rendering
```

The renders load Google Fonts, so they need a network connection.

## projects.json

One entry per product. Where a product spans several repositories (web, mobile, admin, API, or a mirror in another organisation), it is still one entry.

| Field | What it holds |
|---|---|
| `id` | Used for the image file name and the page anchor. It is public, so it must never contain a client's product name. |
| `name`, `summary`, `sector` | Shown on the card. Written in the site's lowercase voice. Name a client only if they are already public. |
| `platforms`, `stack` | Shown on the card; `platforms` also feeds the score. |
| `url` | A production address that was checked to load. Never a preview or private-repo link. |
| `live` | `true` when the product was checked live but its address is not shown. |
| `pin` | 1–3 pins the products on the GitHub profile's "Now" list to the top. |
| `ds` | Design system for the mock-up, one of the keys of `SYSTEMS` in `designs.mjs`. |
| `seed` / `tint` | Material 3 seed (`teal`, `green`, `amber`, `blue`, `red`) or HIG tint (`blue`, `orange`, `green`, `teal`, `red`). |
| `g` | What the mock-up shows: app title, navigation, page heading, rows. Use the product's real module names. |
| `stats` | Commits, people, repositories and first/last month, counted from GitHub contributor stats. Mirrored repositories are counted once. |

## Ranking

`score()` in `build.mjs` gives each product up to 100 points:

| Points | Signal |
|---|---|
| 40 | Commits, on a log scale |
| 15 | People who committed |
| 15 | Years in development, capped at six. A year only counts when about 250 commits back it. |
| 10 | Platforms it ships on, capped at four |
| 20 | Live today (full marks), or worked on in the last six months (half) |

The page states the same rule, so keep the two in step.

## Design systems

`designs.mjs` has one renderer per system: Carbon, Ant Design, Material 3, Apple HIG, Fluent 2, Polaris, Lightning, GOV.UK, NHS, USWDS, Elastic UI, Spectrum, Geist, Primer, Atlassian and Base Web. Each one follows that system's published tokens and components. Fonts are open-licensed (IBM Plex, Roboto, Inter, Source Sans 3, Public Sans, Geist), or the system font stack where a system's own typeface cannot be served. No logos or wordmarks are drawn.
