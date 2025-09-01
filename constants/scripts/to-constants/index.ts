import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, parse } from 'node:path'
import * as generators from './generators.ts'

const BUILD_DIR = 'build'

const inputs = readdirSync(BUILD_DIR).map((file) => ({
  name: parse(file).name,
  variables: JSON.parse(readFileSync(join(BUILD_DIR, file), 'utf-8')) as Record<string, unknown>,
}))

Object.values(generators)
  .flatMap((generator) => generator(inputs))
  .forEach((file) => {
    mkdirSync(join('..', dirname(file.path)), { recursive: true })
    writeFileSync(join('..', file.path), file.content)
  })
