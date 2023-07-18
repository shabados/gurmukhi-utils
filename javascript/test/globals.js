import * as assert from 'uvu/assert'

export const guutIs = (f, a, b) => assert.is(f(a), b)

export const guutIsNot = (f, a, b) => assert.is.not(f(a), b)

export const guutThrows = (f, a) =>
  assert.throws(() => {
    f(a)
  })

export const guutMatch = (t, f, a, b = '') => {
  switch (t) {
    case 'is':
      guutIs(f, a, b)
      break
    case 'is not':
      guutIsNot(f, a, b)
      break
    case 'throws':
      guutThrows(f, a)
      break
  }
}
