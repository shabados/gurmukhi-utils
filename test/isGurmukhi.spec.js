const { expect } = require( 'chai' )

const { isGurmukhi } = require( '../index' )

// Test strings
const strings = [
  [ 'ਗੁਰਮੁਖੀ', true ],
  [ 'ਮੈਂ ਗੁਰਮੁਖੀ ਵਿਚ ਲਿਖ ਰਿਹਾ ਹਾਂ।', true ],
  [ 'ਲੜੀਵਾਰ​ਗੁਰਬਾਣੀ', true ], // Has U+200B, Zero Width Space
  [ 'मैं हिंदी में लिख रहा हूँ।', false ],
  [ 'میں شاہ رخ میں لکھ رہا ہوں۔', false ],
  [ 'ਗੁਰਮੁਖੀ & English', false ],
]

describe( 'isGurmukhi()', () => {
  strings.map( ( [ string, result ] ) => it( `should convert '${string}' to ${result}`, () => {
    expect( isGurmukhi( string, true ) ).to.equal( result )
  } ) )
} )
