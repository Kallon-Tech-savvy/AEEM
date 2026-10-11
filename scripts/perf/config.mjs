// Pinned measurement settings for the load budget (issue #33, goal #26).
// Change numbers here, nowhere else. perf/README.md explains each one.

export const BUDGET_LCP_MS = 1000

// Lighthouse "simulate" throttling: it loads the page once at full speed and
// models what the load would cost under these constraints, which is far more
// repeatable than throttling live traffic.
export const PROFILES = {
  // Default. A typical mid-range Android phone on a decent 4G connection.
  'mid-4g': {
    description: 'mid-range Android, typical 4G',
    rttMs: 150,
    throughputKbps: 9000,
    cpuSlowdownMultiplier: 4,
  },
  // Lighthouse's own mobile default, for comparison with other tools' numbers.
  'slow-4g': {
    description: 'mid-range Android, Lighthouse "Slow 4G"',
    rttMs: 150,
    throughputKbps: 1638.4,
    cpuSlowdownMultiplier: 4,
  },
}

// Lighthouse's Moto G Power mobile emulation, spelled out so it cannot drift.
export const SCREEN = { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75, disabled: false }

export const DEFAULT_RUNS = 5

// Slugs served by the fixture API (see fixtures.mjs). Detail pages are measured
// with these so every run sees the same data.
export const SLUGS = { story: 'sample-story', event: 'sample-event', resource: 'sample-resource' }

// One entry per page a visitor can land on. The router also has a catch-all
// for unknown addresses, measured here as "not-found".
export const ROUTES = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'impact', path: '/impact' },
  { key: 'impact-detail', path: `/impact/${SLUGS.story}` },
  { key: 'events', path: '/events' },
  { key: 'event-detail', path: `/events/${SLUGS.event}` },
  { key: 'get-involved', path: '/get-involved' },
  { key: 'resources', path: '/resources' },
  { key: 'resource-detail', path: `/resources/${SLUGS.resource}` },
  { key: 'press-kit', path: '/press-kit' },
  { key: 'contact', path: '/contact' },
  { key: 'privacy', path: '/privacy' },
  { key: 'not-found', path: '/this-page-does-not-exist' },
]

export const SITE_PORT = 4173
export const API_PORT = 4174
