/**
 * Strips the `export namespace GurmukhiUtils { ... }` wrapper from uniffi-bindgen-js output,
 * promoting all functions to top-level ESM exports.
 *
 * Usage: npx tsx scripts/flatten-wasm-namespace.ts <generated-dir>
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const dir = process.argv[2]
if (!dir) {
  console.error('Usage: npx tsx scripts/flatten-wasm-namespace.ts <generated-dir>')
  process.exit(1)
}

const file = join(dir, 'gurmukhi.ts')
const code = readFileSync(file, 'utf8')

const patched = code
  // Remove the opening namespace line
  .replace(/^export namespace \w+ \{\n/m, '')
  // Remove the closing brace (last non-empty line)
  .replace(/\n\}\n*$/, '\n')
  // Un-indent the namespace body (2 spaces)
  .replace(/^  /gm, '')

writeFileSync(file, patched)
console.log(`Flattened namespace in ${file}`)
