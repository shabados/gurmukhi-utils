const { expect } = require( 'chai' )

const { toUnicode } = require( '../index' )

// Test words
const words = [
  [ 'Koj', 'ਖੋਜ' ],
  [ 'ihr', 'ਹਿਰ' ],
]

describe( 'toUnicode()', () => {
  words.map( ( [ ascii, unicode ] ) => it( `should convert ${ascii} to ${unicode}`, () => {
    expect( toUnicode( ascii ) ).to.equal( unicode )
  } ) )
} )
