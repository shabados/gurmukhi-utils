const { stripAccents } = require( '../index' )

// Test words
const words = [
  [ 'ਜ਼ਫ਼ੈਸ਼ਸਓ', 'ਜਫੈਸਸੳ' ],
  [ 'Z^Svb', 'gKsvb' ],
]

describe( 'stripAccents()', () => {
  words.map( ( [ complex, simple ] ) => it( `should transform '${complex}' to '${simple}'`, () => {
    expect( stripAccents( complex ) ).toBe( simple )
  } ) )
} )
