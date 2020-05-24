const { expect } = require( 'chai' )

const { toAkhar } = require( '../index' )

// Test words
const words = [
  [ 'ਜ਼ਫ਼ੈਸ਼ਸ', 'ਜਫੈਸਸ' ],
  [ 'Z^Svb', 'gKsvb' ],
]

describe( 'toAkhar()', () => {
  words.map( ( [ complex, simple ] ) => it( `should transform '${complex}' to '${simple}'`, () => {
    expect( toAkhar( complex ) ).to.equal( simple )
  } ) )
} )
