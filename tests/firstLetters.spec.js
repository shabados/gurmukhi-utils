const { expect } = require( 'chai' )

const { firstLetters } = require( '../index' )


describe( 'firstLetters() with baseLetters=true', () => {
  // Test lines with mappings for baseLetters = true
  const lines = [
    [ 'hir hir nwmu jphu mn myry muiK gurmuiK pRIiq lgwqI ]', 'hhnjmmmgpl' ],
    [ 'iZir&qym sMdUk* drIXw AmIk* ]', 'gsdA' ],
    [ 'ijs no ik®pw krih iqin nwmu rqnu pwieAw ]', 'jnkkqnrp' ],
  ]

  lines.map( ( [ line, expectedFirstLetters ] ) =>
    it( `should generate first letters for '${line}' as '${expectedFirstLetters}'`, () => {
      expect( firstLetters( line ) ).to.equal( expectedFirstLetters )
    } ) )
} )

describe( 'firstLetters() with baseLetters=false', () => {
  const lines = [
    [ 'iZir&qym sMdUk* drIXw AmIk* ]', 'ZsdA' ],
  ]

  lines.map( ( [ line, expectedFirstLetters ] ) =>
    it( `should generate first letters for '${line}' as '${expectedFirstLetters}'`, () => {
      expect( firstLetters( line, false ) ).to.equal( expectedFirstLetters )
    } ) )
} )
