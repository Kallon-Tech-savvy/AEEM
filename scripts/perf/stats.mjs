// Pure helpers for turning repeated runs into one reported number per route.

export function median(values) {
  if (!values.length) throw new Error('median of no values')
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

// runs: [{ lcp, fcp, tbt, bytes, requests, lcpElement, benchmarkIndex }]
// Returns the medians, plus the LCP element of the run closest to the median
// LCP (the element can differ between runs, and the median run is the honest one).
export function summarize(runs) {
  const lcps = runs.map((r) => r.lcp)
  const med = median(lcps)
  const closest = runs.reduce((best, r) => (Math.abs(r.lcp - med) < Math.abs(best.lcp - med) ? r : best))
  return {
    runs: runs.length,
    lcpMs: Math.round(med),
    lcpMinMs: Math.round(Math.min(...lcps)),
    lcpMaxMs: Math.round(Math.max(...lcps)),
    fcpMs: Math.round(median(runs.map((r) => r.fcp))),
    tbtMs: Math.round(median(runs.map((r) => r.tbt))),
    transferKB: Math.round(median(runs.map((r) => r.bytes)) / 1024),
    requests: Math.round(median(runs.map((r) => r.requests))),
    lcpElement: closest.lcpElement ?? 'unknown',
    benchmarkIndex: Math.round(median(runs.map((r) => r.benchmarkIndex ?? 0))),
  }
}

export function markdownTable(results, budgetMs) {
  const lines = [
    '| Route | LCP median (ms) | min-max | FCP (ms) | TBT (ms) | Transfer (KB) | Requests | LCP element | Budget |',
    '|---|---:|---:|---:|---:|---:|---:|---|:--:|',
  ]
  for (const [key, s] of Object.entries(results)) {
    const ok = s.lcpMs <= budgetMs ? 'pass' : 'over'
    const el = String(s.lcpElement).replace(/\|/g, '\\|').slice(0, 60)
    lines.push(`| ${key} | ${s.lcpMs} | ${s.lcpMinMs}-${s.lcpMaxMs} | ${s.fcpMs} | ${s.tbtMs} | ${s.transferKB} | ${s.requests} | \`${el}\` | ${ok} |`)
  }
  return lines.join('\n')
}
