# Prerender Home at build time with React's own server renderer

Home is rendered to static HTML during `npm run build`, so its headline and text appear before any JavaScript downloads; the browser then takes over that markup (hydration). Every other route still gets a blank app shell (`app-shell.html`) and renders in the browser, and the catch-all rewrite in `vercel.json` points at that shell, because `index.html` is now Home.

This uses React's `renderToPipeableStream` through a small server bundle (`src/entry-server.tsx`) and `scripts/prerender.mjs`, with no new dependency. The first screen was blank until JavaScript ran, which set a floor of about 1.4 s on every route (see `perf/BASELINE.md`), and the goal is a 1.0 s first-visit LCP (#26).

## Considered Options

- **A framework or plugin (Next.js, vike, a Vite prerender plugin):** rejected for now; it brings a new dependency and a routing rewrite for the sake of one page. Worth revisiting if #38 and #39 end up prerendering most routes.
- **A headless-browser snapshot (react-snap style):** rejected; it needs Chrome during every build and runs the app's client code, including its Supabase calls, at build time.

## Consequences

- Anything prerendered must render identically on the server and in the browser, or hydration fails. Concretely: `ThemeProvider` no longer reads `localStorage` during the first render (`index.html`'s inline script already sets the light or dark class before first paint), and Home's hero text no longer starts at `opacity: 0`.
- A prerender error fails the build instead of shipping a broken page. The build also refuses a Home page that has no `<h1>`, still shows the loading spinner, or has no `<title>`.
- Routes other than Home must keep being served the blank shell. Serving them `index.html` would flash Home's content before the app replaced it. `scripts/test-prerender.mjs` checks this, including the rewrite in `vercel.json`.
- The `/` page is now only as fresh as the last build. That is fine today because Home makes no Supabase calls; a data-driven section on Home would need a rebuild trigger or a client fetch.
