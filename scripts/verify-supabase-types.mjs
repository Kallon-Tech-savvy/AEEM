#!/usr/bin/env node

import fs from 'node:fs'

const [generatedPath, checkedInPath] = process.argv.slice(2)

if (!generatedPath || !checkedInPath) {
  console.error('Usage: node scripts/verify-supabase-types.mjs <generated> <checked-in>')
  process.exit(2)
}

const generated = fs.readFileSync(generatedPath, 'utf8')
const checkedIn = fs.readFileSync(checkedInPath, 'utf8')

function extractTables(source) {
  const tablesMatch = source.match(/Tables:\s*\{([\s\S]*?)\n\s*\}\n\s*Views:/)
  if (!tablesMatch) throw new Error('Could not locate Database.public.Tables')

  const tables = {}
  const tablePattern = /^\s{6}([A-Za-z_][A-Za-z0-9_]*): \{\n\s{8}Row: \{([\s\S]*?)\n\s{8}\}\n\s{8}Insert:/gm

  for (const match of tablesMatch[1].matchAll(tablePattern)) {
    const [, name, rowBlock] = match
    const fields = {}

    for (const line of rowBlock.split('\n')) {
      const field = line.match(/^\s{10}([A-Za-z_][A-Za-z0-9_]*)\??:\s*(.+)$/)
      if (field) fields[field[1]] = field[2].trim().replace(/\s+/g, ' ')
    }

    tables[name] = fields
  }

  return tables
}

const actual = extractTables(generated)
const expected = extractTables(checkedIn)

const actualNames = Object.keys(actual).sort()
const expectedNames = Object.keys(expected).sort()

if (JSON.stringify(actualNames) !== JSON.stringify(expectedNames)) {
  console.error('Database table contract mismatch.')
  console.error('Generated:', actualNames)
  console.error('Checked in:', expectedNames)
  process.exit(1)
}

for (const table of actualNames) {
  const actualFields = Object.keys(actual[table]).sort()
  const expectedFields = Object.keys(expected[table]).sort()

  if (JSON.stringify(actualFields) !== JSON.stringify(expectedFields)) {
    console.error(`Row field mismatch for public.${table}`)
    console.error('Generated:', actualFields)
    console.error('Checked in:', expectedFields)
    process.exit(1)
  }

  for (const field of actualFields) {
    if (actual[table][field] !== expected[table][field]) {
      console.error(
        `Row type mismatch for public.${table}.${field}: generated="${actual[table][field]}" checked-in="${expected[table][field]}"`,
      )
      process.exit(1)
    }
  }
}

console.log('Supabase row type contract matches the generated public schema.')
