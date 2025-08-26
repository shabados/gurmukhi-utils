import { suite } from 'node:test'

import { toAscii } from '../src/index.ts'
import { run, type TestUnit } from './guut.ts'

import testUnits from '../../test/toAscii.json' with { type: 'json' }

const funcs = { ascii: toAscii }

suite('toAscii', () => run(testUnits as TestUnit[], funcs))
