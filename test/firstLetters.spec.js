const { firstLetters, toUnicode, toHindi, toEnglish } = require( '../index' )

describe( 'firstLetters(gurmukhi)', () => {
  const lines = [
    [ 'ਗੁਰਮੁਖਿ  ਲਾਧਾ ਮਨਮੁਖਿ   ਗਵਾਇਆ ॥', 'ਗਲਮਗ॥' ],
    [ 'ਗੁਰਮੁਖਿ ਲਾਧਾ ਮਨਮੁਖਿ ਗਵਾਇਆ ॥', 'ਗਲਮਗ॥' ],
    [ 'ਜਿਨਿ ਹਰਿ ਸੇਵਿਆ ਤਿਨਿ ਸੁਖੁ ਪਾਇਆ ॥', 'ਜਹਸਤਸਪ॥' ],
    [ 'ਗ਼ੈਰਿ ਹਮਦਿ ਹੱਕ ਨਿਆਇਦ ਬਰ ਜ਼ਬਾਨਮ ਹੀਚ ਗਾਹ', 'ਗ਼ਹਹਨਬਜ਼ਹਗ' ],
    [ 'ਸਬਦਿ ਮਰੈ. ਸੋ ਮਰਿ ਰਹੈ; ਫਿਰਿ. ਮਰੈ ਨ, ਦੂਜੀ ਵਾਰ ॥', 'ਸਮ.ਸਮਰ;ਫ.ਮਨ,ਦਵ॥' ],
    [ 'ਇਕਨਾ. ਹੁਕਮੀ ਬਖਸੀਸ; ਇਕਿ, ਹੁਕਮੀ ਸਦਾ ਭਵਾਈਅਹਿ ॥', 'ੲ.ਹਬ;ੲ,ਹਸਭ॥' ],
    [ toUnicode( 'ik hr hSqo Ssq Awmdw cwkrS [148[' ), 'ਕਹਹਸ਼ਅਚ।' ],
  ]

  lines.map( ( [ line, expectedFirstLetters ] ) => it(
    `should generate first letters for '${line}' as '${expectedFirstLetters}'`,
    () => {
      expect( firstLetters( line ) ).toBe( expectedFirstLetters )
    },
  ) )
} )

describe( 'firstLetters(hindi)', () => {
  const lines = [
    [ 'ਗੁਰਮੁਖਿ ਲਾਧਾ ਮਨਮੁਖਿ ਗਵਾਇਆ ॥', 'गलमग॥' ],
    [ 'ਜਿਨਿ ਹਰਿ ਸੇਵਿਆ ਤਿਨਿ ਸੁਖੁ ਪਾਇਆ ॥', 'जहसतसप॥' ],
    [ 'ਗ਼ੈਰਿ ਹਮਦਿ ਹੱਕ ਨਿਆਇਦ ਬਰ ਜ਼ਬਾਨਮ ਹੀਚ ਗਾਹ', 'ग़हहनबज़हग' ],
    [ 'ਸਬਦਿ ਮਰੈ. ਸੋ ਮਰਿ ਰਹੈ; ਫਿਰਿ. ਮਰੈ ਨ, ਦੂਜੀ ਵਾਰ ॥', 'सम.समर;फ.मन,दव॥' ],
  ].map( ( [ input, output ] ) => [ toHindi( input ), output ] )

  lines.map( ( [ line, expectedFirstLetters ] ) => it(
    `should generate first letters for '${line}' as '${expectedFirstLetters}'`,
    () => {
      expect( firstLetters( line ) ).toBe( expectedFirstLetters )
    },
  ) )
} )

describe( 'firstLetters(english)', () => {
  const lines = [
    [ 'ਗੁਰਮੁਖਿ ਲਾਧਾ ਮਨਮੁਖਿ ਗਵਾਇਆ ॥', 'glmg|' ],
    [ 'ਜਿਨਿ ਹਰਿ ਸੇਵਿਆ ਤਿਨਿ ਸੁਖੁ ਪਾਇਆ ॥', 'jhstsp|' ],
    [ 'ਗ਼ੈਰਿ ਹਮਦਿ ਹੱਕ ਨਿਆਇਦ ਬਰ ਜ਼ਬਾਨਮ ਹੀਚ ਗਾਹ', 'ghhnbzhg' ],
    [ 'ਸਬਦਿ ਮਰੈ. ਸੋ ਮਰਿ ਰਹੈ; ਫਿਰਿ. ਮਰੈ ਨ, ਦੂਜੀ ਵਾਰ ॥', 'sm.smr;f.mn,dv|' ],
  ].map( ( [ input, output ] ) => [ toEnglish( input ), output ] )

  lines.map( ( [ line, expectedFirstLetters ] ) => it(
    `should generate first letters for '${line}' as '${expectedFirstLetters}'`,
    () => {
      expect( firstLetters( line ) ).toBe( expectedFirstLetters )
    },
  ) )
} )
