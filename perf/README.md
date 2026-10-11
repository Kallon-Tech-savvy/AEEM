# Load measurement

Measures how long each AEEM page takes to show its main content, so the 1-second goal (#26) is checked against numbers instead of guesses. This is the harness from #33. It only reports; a later ticket (#40) turns the budget into a failing check.

## Run it

```
npm run perf                              # all 13 pages, 5 runs each, mid-4g profile
npm run perf -- --routes home,about       # some pages only
npm run perf -- --runs 3                  # fewer runs, faster and noisier
npm run perf -- --profile slow-4g         # Lighthouse's own "Slow 4G" for comparison
npm run perf -- --baseline                # also rewrite perf/baseline.json and perf/BASELINE.md
npm run perf:test                         # quick self-check of the harness itself
```

Needs a Chrome or Chromium. If Chrome is not found automatically, set `CHROME_PATH` to its executable. A full run takes about 10 minutes. Scratch output goes to `.perf/` (ignored by git).

## What is measured

- **Metric:** Largest Contentful Paint (LCP), the moment the biggest piece of content on screen (usually a headline, paragraph or image) has been drawn. Lower is better. The budget is **1000 ms**.
- **First visit, empty cache.** Lighthouse clears storage before every run. Repeat visits are faster and do not set the budget.
- **Median of 5 runs per page**, with the min-max shown so you can see how noisy a page is.
- **Pages:** the 12 pages a visitor can land on, plus the "not found" page the router shows for unknown addresses.

## The pinned profile

Defined in `scripts/perf/config.mjs`. Change numbers there and nowhere else.

| | `mid-4g` (default) | `slow-4g` |
|---|---|---|
| Device | Lighthouse mobile emulation (412 x 823 screen, 1.75x pixels) | same |
| CPU | 4x slowdown, a mid-range Android phone | same |
| Round-trip time | 150 ms | 150 ms |
| Download speed | 9 Mbps | 1.6 Mbps |

"Mid-range 4G" is our reading of the target, not a measured fact about visitors. If most visitors are on slower connections, switch the default to `slow-4g` or lower the speed in the config.

Lighthouse is run in **simulate** mode: it loads the page once at full speed and models what the load would cost under the profile above. That makes runs repeatable, but it is a model, not a real phone.

## What the harness serves

- **The site** is a production build (`vite build`) served the way Vercel serves it: brotli compression, long-lived caching for `/assets`, and the same catch-all page rewrite as `vercel.json`. It does not model Vercel's CDN distance from Sierra Leone.
- **Supabase** is replaced by a small local fixture API that returns three events, three resources and three impact stories. That keeps runs identical and makes them work without internet access. Detail pages are measured with the slugs `sample-event`, `sample-story` and `sample-resource`. The fixtures answer instantly, so the real Supabase's network distance is not included, although the modelled round-trip time is still applied to the extra connection.

## Reading the numbers

- Compare numbers only between runs on a similar machine. `perf/BASELINE.md` records the measuring machine's CPU benchmark index; a much slower or faster machine shifts results even with simulated throttling.
- Treat differences smaller than the min-max spread as noise.
- The "LCP element" column says what the browser considered the main content. It is the first thing to look at when a page is slow.
- This does not replace testing on a real phone. It is a repeatable yardstick for deciding whether a change helped.
