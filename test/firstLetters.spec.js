const { expect } = require( 'chai' )

const { firstLetters } = require( '../index' )


describe( 'firstLetters()', () => {
  const lines = [
    [ 'hir hir nwmu jphu mn myry muiK gurmuiK pRIiq lgwqI ]', 'hhnjmmmgpl' ],
    [ 'iZir&qym sMdUk* drIXw AmIk* ]', 'gsdA' ],
    [ 'ijs no ik®pw krih iqin nwmu rqnu pwieAw ]', 'jnkkqnrp' ],
  ]

  lines.map( ( [ line, expectedFirstLetters ] ) => it( `should generate first letters for '${line}' as '${expectedFirstLetters}'`, () => {
    expect( firstLetters( line ) ).to.equal( expectedFirstLetters )
  } ) )
} )

describe( 'firstLetters() with stripNukta=false', () => {
  const lines = [
    [ 'iZir&qym sMdUk* drIXw AmIk* ]', 'ZsdA' ],
  ]

  lines.map( ( [ line, expectedFirstLetters ] ) => it( `should generate first letters for '${line}' as '${expectedFirstLetters}'`, () => {
    expect( firstLetters( line, false ) ).to.equal( expectedFirstLetters )
  } ) )
} )

describe( 'firstLetters() with stripNukta=true and stripVishraams=false', () => {
  const lines = [
    [ 'sbid mrY. so mir rhY; iPir. mrY n, dUjI vwr ]', 'sm.smr;P.mn,dv' ],
  ]

  lines.map( ( [ line, expectedFirstLetters ] ) => it( `should generate first letters for '${line}' as '${expectedFirstLetters}'`, () => {
    expect( firstLetters( line, true, false ) ).to.equal( expectedFirstLetters )
  } ) )
} )

describe( 'firstLetters() with unicode strings', () => {
  const lines = [
    [ 'ਗੁਰਮੁਖਿ ਲਾਧਾ ਮਨਮੁਖਿ ਗਵਾਇਆ ॥', 'ਗਲਮਗ' ],
    [ 'ਜਿਨਿ ਹਰਿ ਸੇਵਿਆ ਤਿਨਿ ਸੁਖੁ ਪਾਇਆ ॥', 'ਜਹਸਤਸਪ' ],
    [ 'ਗ਼ੈਰਿ ਹਮਦਿ ਹੱਕ ਨਿਆਇਦ ਬਰ ਜ਼ਬਾਨਮ ਹੀਚ ਗਾਹ', 'ਗਹਹਨਬਜਹਗ' ],
  ]

  lines.map( ( [ line, expectedFirstLetters ] ) => it( `should generate first letters for '${line}' as '${expectedFirstLetters}'`, () => {
    expect( firstLetters( line ) ).to.equal( expectedFirstLetters )
  } ) )
} )

describe( 'firstLetters() with unicode strings and stripNukta=false', () => {
  const lines = [
    [ 'ਗ਼ੈਰਿ ਹਮਦਿ ਹੱਕ ਨਿਆਇਦ ਬਰ ਜ਼ਬਾਨਮ ਹੀਚ ਗਾਹ,', 'ਗ਼ਹਹਨਬਜ਼ਹਗ' ],
  ]

  lines.map( ( [ line, expectedFirstLetters ] ) => it( `should generate first letters for '${line}' as '${expectedFirstLetters}'`, () => {
    expect( firstLetters( line, false ) ).to.equal( expectedFirstLetters )
  } ) )
} )

describe( 'firstLetters() with unicode strings, stripNukta=true, and stripVishraams=false', () => {
  const lines = [
    [ 'ਸਬਦਿ ਮਰੈ. ਸੋ ਮਰਿ ਰਹੈ; ਫਿਰਿ. ਮਰੈ ਨ, ਦੂਜੀ ਵਾਰ ॥', 'ਸਮ.ਸਮਰ;ਫ.ਮਨ,ਦਵ' ],
  ]

  lines.map( ( [ line, expectedFirstLetters ] ) => it( `should generate first letters for '${line}' as '${expectedFirstLetters}'`, () => {
    expect( firstLetters( line, true, false ) ).to.equal( expectedFirstLetters )
  } ) )
} )
