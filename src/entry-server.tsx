// Build-time prerender entry (see ADR 0002). Not used by the browser.
//
// scripts/prerender.mjs imports this after an SSR build and calls render('/')
// to get the Home page as HTML plus the <head> tags its <Helmet> declares.
// Everything renders inside this one bundle, so React is only loaded once.
import { Writable } from 'node:stream'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async'
import { ThemeProvider } from './ThemeProvider'
import { AppShell } from './App'

export interface PrerenderResult {
  /** The markup that goes inside <div id="root"> */
  html: string
  /** <title>, <meta> and <link> tags declared by the page's <Helmet> */
  head: { title: string; meta: string; link: string }
}

export function render(url: string): Promise<PrerenderResult> {
  const helmetContext: { helmet?: HelmetServerState } = {}

  return new Promise((resolve, reject) => {
    let html = ''
    const sink = new Writable({
      write(chunk, _encoding, done) {
        html += chunk.toString()
        done()
      },
    })
    sink.on('finish', () => {
      const helmet = helmetContext.helmet
      resolve({
        html,
        head: {
          title: helmet?.title.toString() ?? '',
          meta: helmet?.meta.toString() ?? '',
          link: helmet?.link.toString() ?? '',
        },
      })
    })

    const { pipe } = renderToPipeableStream(
      <ThemeProvider>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url}>
            <AppShell />
          </StaticRouter>
        </HelmetProvider>
      </ThemeProvider>,
      {
        // Wait for lazily loaded sections too, so the HTML is complete and
        // never contains a loading spinner.
        onAllReady() {
          pipe(sink)
        },
        onShellError: reject,
        // Any render error fails the build instead of shipping a broken page.
        onError: reject,
      },
    )
  })
}
