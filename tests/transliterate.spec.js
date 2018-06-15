const { expect } = require( 'chai' )

const { transliterate } = require( '../index' )

// Test lines
const transliterations = [
  [ 'ikv sicAwrw hoeIAY ikv kUVY qutY pwil ]', "kiv sachiaaraa hoe'eeaai kiv kooRai tuTai paal ||" ],
  // [ 'ਕਿਵ ਸਚਿਆਰਾ ਹੋਈਐ ਕਿਵ ਕੂੜੈ ਤੁਟੈ ਪਾਲਿ ॥', 'kiv sachiaaraa hoeeeaai kiv kooRai tuTai paal ||' ],
]

describe( 'transliterate()', () => {
  transliterations.map( ( [ gurmukhi, transliteration ] ) => it( `should transliterate '${gurmukhi}' to '${transliteration}'`, () => {
    expect( transliterate( gurmukhi ) ).to.equal( transliteration )
  } ) )
} )
