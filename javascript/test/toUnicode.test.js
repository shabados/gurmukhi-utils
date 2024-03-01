import { toUnicode } from '../build/index.js'
import { guutMatch } from './globals.js'
import { suite } from 'uvu'

// test setup and config

const unicode = (str) => toUnicode(str)
const unicode3 = (str) => unicode(unicode(unicode(str)))
const santlipi = (str) => toUnicode(str, 'Sant Lipi')
const santlipi3 = (str) => santlipi(santlipi(santlipi(str)))
const unisant = (str) => unicode(santlipi(str))
const unisant2 = (str) => unisant(unisant(str))

const funcs = { unicode, unicode3, santlipi, santlipi3, unisant, unisant2 }

const fn = 'toUnicode'

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
