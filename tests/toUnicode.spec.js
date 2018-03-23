const { expect } = require( 'chai' )

const { toUnicode } = require( '../index' )

// Test words
const words = [
  [ 'Koj', 'ਖੋਜ' ],
  [ 'ihr', 'ਹਿਰ' ],
]

describe( 'toUnicode()', function () {
  words.map( ( [ ascii, unicode ] ) => it( `should convert ${ascii} to ${unicode}`, function () {
    expect( toUnicode( ascii ) ).to.equal( unicode )
  } ) )
} )
