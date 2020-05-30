const { expect } = require( 'chai' )

const { isGurmukhi } = require( '../index' )

describe( 'isGurmukhi(line)', () => {
  const lines = [
    [ 'ਗੁਰਮੁਖੀ', true ],
    [ 'ਮੈਂ ਗੁਰਮੁਖੀ ਵਿਚ ਲਿਖ ਰਿਹਾ ਹਾਂ।', true ],
    [ 'ਲੜੀਵਾਰ​ਗੁਰਬਾਣੀ', true ], // Has U+200B, Zero Width Space
    [ 'मैं हिंदी में लिख रहा हूँ।', false ],
    [ 'میں شاہ رخ میں لکھ رہا ہوں۔', false ],
    [ 'ਗੁਰਮੁਖੀ & English', true ],
    [ 'English & ਗੁਰਮੁਖੀ', false ],
  ]

  lines.map( ( [ string, result ] ) => it( `should convert '${string}' to ${result}`, () => {
    expect( isGurmukhi( string ) ).to.equal( result )
  } ) )
} )

describe( 'isGurmukhi(line, true)', () => {
  const lines = [
    [ 'ਗੁਰਮੁਖੀ', true ],
    [ 'ਮੈਂ ਗੁਰਮੁਖੀ ਵਿਚ ਲਿਖ ਰਿਹਾ ਹਾਂ।', true ],
    [ 'ਲੜੀਵਾਰ​ਗੁਰਬਾਣੀ', true ], // Has U+200B, Zero Width Space
    [ 'मैं हिंदी में लिख रहा हूँ।', false ],
    [ 'میں شاہ رخ میں لکھ رہا ہوں۔', false ],
    [ 'ਗੁਰਮੁਖੀ & English', false ],
    [ 'English & ਗੁਰਮੁਖੀ', false ],
  ]

  lines.map( ( [ string, result ] ) => it( `should convert '${string}' to ${result}`, () => {
    expect( isGurmukhi( string, true ) ).to.equal( result )
  } ) )
} )
