const { countSyllables } = require( '../index' )

const tests = [
  [ 'ਅੰਮ੍ਰਿਤਸਰ', 6 ],
  [ 'ਸਾਰਾ ਸਾਰੇ', 8 ],
  [ 'ਪ੍ਰਭੂ ਪ੍ਰੇਮੀ ਪੜ੍ਹ ਚੜ੍ਹ ਦ੍ਵੈਤ', 14 ],
]

describe( 'countSyllables()', () => {
  tests.map( ( [ input, output ] ) => it( `should convert '${input}' to '${output}'`, () => {
    expect( countSyllables( input ) ).toBe( output )
  } ) )
} )
