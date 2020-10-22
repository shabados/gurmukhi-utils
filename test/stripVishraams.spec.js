const { stripVishraams } = require( '../index' )

describe( 'stripVishraams(line)', () => {
  const lines = [
    [ 'Anhd sbd vjwey, hir jIau Gir Awey; hir gux gwvhu nwrI ]', 'Anhd sbd vjwey hir jIau Gir Awey hir gux gwvhu nwrI ]' ],
    [ 'Anhd sbd vjwey hir jIau Gir Awey hir gux gwvhu nwrI ]', 'Anhd sbd vjwey hir jIau Gir Awey hir gux gwvhu nwrI ]' ],
  ]

  lines.map( ( [ line, expected ] ) => it( `should generate first letters for '${line}' as '${expected}'`, () => {
    expect( stripVishraams( line ) ).toBe( expected )
  } ) )
} )

describe( 'stripVishraams(line, { heavy: true })', () => {
  const lines = [
    [ 'Anhd sbd vjwey, hir jIau Gir Awey; hir gux gwvhu nwrI ]', 'Anhd sbd vjwey, hir jIau Gir Awey hir gux gwvhu nwrI ]' ],
    [ 'ਸਬਦਿ ਮਰੈ. ਸੋ ਮਰਿ ਰਹੈ; ]', 'ਸਬਦਿ ਮਰੈ. ਸੋ ਮਰਿ ਰਹੈ ]' ],
  ]

  lines.map( ( [ line, expected ] ) => it( `should strip all heavy vishraams for '${line}' to '${expected}'`, () => {
    expect( stripVishraams( line, { heavy: true } ) ).toBe( expected )
  } ) )
} )

describe( 'stripVishraams(line, { medium: true })', () => {
  const lines = [
    [ 'Anhd sbd vjwey, hir jIau Gir Awey; hir gux gwvhu nwrI ]', 'Anhd sbd vjwey hir jIau Gir Awey; hir gux gwvhu nwrI ]' ],
  ]

  lines.map( ( [ line, expected ] ) => it(
    `should strip all medium vishraams for '${line}' to '${expected}'`,
    () => {
      expect( stripVishraams( line, { medium: true } ) ).toBe( expected )
    },
  ) )
} )

describe( 'stripVishraams(line, { light: true })', () => {
  const lines = [
    [ 'Anhd sbd vjwey, hir jIau Gir Awey; hir gux gwvhu nwrI ]', 'Anhd sbd vjwey, hir jIau Gir Awey; hir gux gwvhu nwrI ]' ],
    [ 'ਸਬਦਿ ਮਰੈ. ਸੋ ਮਰਿ ਰਹੈ; ]', 'ਸਬਦਿ ਮਰੈ ਸੋ ਮਰਿ ਰਹੈ; ]' ],
  ]

  lines.map( ( [ line, expected ] ) => it( `should strip all light vishraams for '${line}' to '${expected}'`, () => {
    expect( stripVishraams( line, { light: true } ) ).toBe( expected )
  } ) )
} )

describe( 'stripVishraams(line, { medium: true, heavy: true })', () => {
  const lines = [
    [ 'Anhd sbd vjwey, hir jIau Gir Awey; hir gux gwvhu nwrI ]', 'Anhd sbd vjwey hir jIau Gir Awey hir gux gwvhu nwrI ]' ],
    [ 'ਸਬਦਿ ਮਰੈ. ਸੋ ਮਰਿ ਰਹੈ; ]', 'ਸਬਦਿ ਮਰੈ. ਸੋ ਮਰਿ ਰਹੈ ]' ],
  ]

  lines.map( ( [ line, expected ] ) => it(
    `should strip all heavy and medium vishraams for '${line}' to '${expected}'`,
    () => {
      expect( stripVishraams( line, { heavy: true, medium: true } ) ).toBe( expected )
    },
  ) )
} )
