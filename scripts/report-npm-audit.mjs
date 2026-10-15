import { spawnSync } from 'node:child_process'

const result = spawnSync('npm', ['audit', '--json'], { encoding: 'utf8' })
let report

try {
  report = JSON.parse(result.stdout)
} catch {
  console.error('npm audit did not return valid JSON.')
  if (result.stderr) console.error(result.stderr.trim())
  console.error('Dependency audit report unavailable; CI continues without treating this informational check as a gate.')
  process.exit(0)
}

const totals = report.metadata?.vulnerabilities
if (!totals) {
  console.error('npm audit returned no vulnerability summary.')
  process.exit(0)
}

console.log('Dependency audit summary (informational; does not fail CI):')
console.log(JSON.stringify(totals, null, 2))

for (const [name, item] of Object.entries(report.vulnerabilities ?? {})) {
  const advisories = (item.via ?? []).filter((entry) => typeof entry === 'object')
  const titles = advisories.map((entry) => entry.title).filter(Boolean)
  const urls = advisories.map((entry) => entry.url).filter(Boolean)
  console.log(JSON.stringify({
    name,
    severity: item.severity,
    direct: item.isDirect,
    range: item.range,
    advisories: titles,
    urls,
    fixAvailable: item.fixAvailable,
  }))
}