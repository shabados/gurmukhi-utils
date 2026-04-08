/**
 * Post-processes uniffi-bindgen-node-js output to camelCase exported function names.
 * This keeps the native JS API consistent with the WASM API (uniffi-bindgen-js).
 *
 * Usage: npx tsx scripts/camelcase-exports.ts <generated-dir>
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const dir = process.argv[2]
if (!dir) {
  console.error('Usage: npx tsx scripts/camelcase-exports.ts <generated-dir>')
  process.exit(1)
}

const toCamelCase = (s: string) => s.replace(/_([a-z])/g, (_, c) => c.toUpperCase())

const targets = ['gurmukhi.js', 'gurmukhi.d.ts']

for (const file of targets) {
  const path = join(dir, file)
  const code = readFileSync(path, 'utf8')

  // Match exported function declarations and rename snake_case to camelCase
  const patched = code.replace(
    /\b(export (?:declare )?function )([a-z][a-z_]*[a-z])\b/g,
    (_, prefix, name) => `${prefix}${toCamelCase(name)}`
  )

  writeFileSync(path, patched)
}

console.log(`camelCased exports in ${dir}`)
