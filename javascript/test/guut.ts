import { deepStrictEqual, notDeepStrictEqual } from 'node:assert'
import { suite, describe, it } from 'node:test'

type TestParameters =
  | {
      type: 'is' | 'is not'
      assertions: Record<string, string | undefined>
    }
  | {
      type: 'is-self'
      assertions: string[]
    }

const assert = (unit: TestParameters, fn: (...args: unknown[]) => unknown) => {
  if (unit.type === 'is' || unit.type === 'is not')
    Object.entries(unit.assertions).forEach(([input, expected]) =>
      it(`${fn.name}(${input}) ${unit.type} ${expected}`, () => {
        if (unit.type === 'is') deepStrictEqual(fn(input), expected)
        if (unit.type === 'is not') notDeepStrictEqual(fn(input), expected)
      }),
    )

  if (unit.type === 'is-self')
    Object.entries(unit.assertions).forEach(([input, expected]) =>
      it(`${fn.name}(${input}) ${unit.type} ${expected}`, () => {
        deepStrictEqual(fn(input), input)
      }),
    )
}

export type TestUnit = {
  name: string
  functions: string[]
} & TestParameters

export const run = (units: TestUnit[], fns: Record<string, any>) =>
  units.forEach(({ name, functions, ...unit }) =>
    describe(name, () =>
      functions.forEach((func) =>
        describe(func, () => assert(unit, fns[func])),
      ),
    ),
  )
