import { suite } from 'node:test'

import { run, type TestUnit } from './guut.ts'

import { toAscii, toUnicode } from '../src/index.ts'
import testUnits from '../../test/toUnicodeAscii.json' with { type: 'json' }

const funcs = {
  a2a: (str: string) => toAscii(toUnicode(str, 'Sant Lipi')),
}

suite('toUnicodeAscii', () => run(testUnits as TestUnit[], funcs))
