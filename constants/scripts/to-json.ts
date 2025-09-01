import json5 from 'json5'

import { mkdirSync, readdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { parse } from 'node:path'

const SRC_DIR = 'src'
const BUILD_DIR = 'build'

rmSync(BUILD_DIR, { recursive: true, force: true })
mkdirSync(BUILD_DIR, { recursive: true })

const files = readdirSync(SRC_DIR)

for (const file of files) {
  if (!file.endsWith('.jsonc')) continue

  const data = json5.parse(readFileSync(`${SRC_DIR}/${file}`, 'utf-8'))
  const { name } = parse(file)

  writeFileSync(`${BUILD_DIR}/${name}.json`, JSON.stringify(data, null, 2))
}
