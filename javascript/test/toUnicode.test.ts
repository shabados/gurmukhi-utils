import { suite } from 'node:test'

import { run, type TestUnit } from './guut.ts'

import { toUnicode } from '../src/index.ts'
import testUnits from '../../test/toUnicode.json' with { type: 'json' }

const santlipi = (str: string) => toUnicode(str, 'Sant Lipi')
const unisant = (str: string) => toUnicode(santlipi(str))

const funcs = {
  unicode: toUnicode,
  unicode3: (str: string) => toUnicode(toUnicode(toUnicode(str))),
  santlipi,
  santlipi3: (str: string) => santlipi(santlipi(santlipi(str))),
  unisant,
  unisant2: (str: string) => unisant(unisant(str)),
}

suite('toUnicode', () => run(testUnits as TestUnit[], funcs))
