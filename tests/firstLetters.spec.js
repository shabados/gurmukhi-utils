const { expect } = require( 'chai' )

const { firstLetters } = require( '../index' )


describe( 'firstLetters()', () => {
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

describe( 'firstLetters() with unicode strings', () => {
  // Test lines with mappings for baseLetters = true
  const lines = [
    [ 'ਗੁਰਮੁਖਿ ਲਾਧਾ ਮਨਮੁਖਿ ਗਵਾਇਆ ॥', 'ਗਲਮਗ' ],
    [ 'ਜਿਨਿ ਹਰਿ ਸੇਵਿਆ ਤਿਨਿ ਸੁਖੁ ਪਾਇਆ ॥', 'ਜਹਸਤਸਪ' ],
    [ 'ਗ਼ੈਰਿ ਹਮਦਿ ਹੱਕ ਨਿਆਇਦ ਬਰ ਜ਼ਬਾਨਮ ਹੀਚ ਗਾਹ', 'ਗਹਹਨਬਜਹਗ' ],
  ]

  lines.map( ( [ line, expectedFirstLetters ] ) =>
    it( `should generate first letters for '${line}' as '${expectedFirstLetters}'`, () => {
      expect( firstLetters( line ) ).to.equal( expectedFirstLetters )
    } ) )
} )

describe( 'firstLetters() with unicode strings and baseLetters=false', () => {
  // Test lines with mappings for baseLetters = true
  const lines = [
    [ 'ਗ਼ੈਰਿ ਹਮਦਿ ਹੱਕ ਨਿਆਇਦ ਬਰ ਜ਼ਬਾਨਮ ਹੀਚ ਗਾਹ,', 'ਗ਼ਹਹਨਬਜ਼ਹਗ' ],
  ]

  lines.map( ( [ line, expectedFirstLetters ] ) =>
    it( `should generate first letters for '${line}' as '${expectedFirstLetters}'`, () => {
      expect( firstLetters( line, false ) ).to.equal( expectedFirstLetters )
    } ) )
} )
