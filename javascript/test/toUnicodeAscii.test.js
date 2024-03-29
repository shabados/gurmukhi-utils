import { toAscii, toUnicode } from '../build/index.js'
import { guutMatch } from './globals.js'
import { suite } from 'uvu'

// test setup and config

const a2a = (str) => toAscii(toUnicode(str, 'Sant Lipi'))

const funcs = { a2a }

const fn = 'toUnicodeAscii'

// re-usable code below

const test = suite(fn)
const data = await import(`../../test/${fn}.json`, {
  assert: { type: 'json' },
})

for (const unit of data.default.tests) {
  if (Array.isArray(unit['assertions'])) {
    for (const func of unit.functions) {
      for (const ele of unit.assertions) {
        test(`${unit.name} - ${func}(${ele}) ${unit.type}`, () => {
          guutMatch(unit.type, funcs[func], ele)
        })
      }
    }
  } else {
    for (const func of unit.functions) {
      for (const [key, value] of Object.entries(unit.assertions)) {
        test(`${unit.name} - ${func}(${key}) ${unit.type} ${value}`, () => {
          guutMatch(unit.type, funcs[func], key, value)
        })
      }
    }
  }
}

test.run()
