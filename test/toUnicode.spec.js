const { expect } = require( 'chai' )

const { toUnicode } = require( '../index' )

// Test words
const words = [
  [ 'Koj', 'ਖੋਜ' ],
  [ 'ihr', 'ਹਿਰ' ],
  [ 'imil´o', 'ਮਿਲੵੋਿ' ],
  [ 'qU pRB dwqw dwin miq pUrw hm Qwry ByKwrI jIau ]', 'ਤੂ ਪ੍ਰਭ ਦਾਤਾ ਦਾਨਿ ਮਤਿ ਪੂਰਾ ਹਮ ਥਾਰੇ ਭੇਖਾਰੀ ਜੀਉ ॥' ],
  [ 'so bRhmu AjonI hY BI honI Gt BIqir dyKu murwrI jIau ]2]', 'ਸੋ ਬ੍ਰਹਮੁ ਅਜੋਨੀ ਹੈ ਭੀ ਹੋਨੀ ਘਟ ਭੀਤਰਿ ਦੇਖੁ ਮੁਰਾਰੀ ਜੀਉ ॥੨॥' ],
  [ 'zny pyc dsqwr rw qwbdwd ]', 'ਜ਼ਨੇ ਪੇਚ ਦਸਤਾਰ ਰਾ ਤਾਬਦਾਦ ॥' ],

]

describe( 'toUnicode()', () => {
  words.map( ( [ ascii, unicode ] ) => it( `should convert '${ascii}' to '${unicode}'`, () => {
    expect( toUnicode( ascii ) ).to.equal( unicode )
  } ) )
} )
