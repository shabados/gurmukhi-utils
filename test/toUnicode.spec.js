const { expect } = require( 'chai' )

const { toUnicode } = require( '../index' )

// Test words
const words = [
  [ 'Koj', 'ਖੋਜ' ],
  [ 'ihr', 'ਹਿਰ' ],
  [ 'imil´o', 'ਮਿਲੵੋਿ' ],
  [ 'kul jn mDy imil´o swrg pwn ry ]', 'ਕੁਲ ਜਨ ਮਧੇ ਮਿਲੵੋਿ ਸਾਰਗ ਪਾਨ ਰੇ ॥' ],
  [ 'qU pRB dwqw dwin miq pUrw hm Qwry ByKwrI jIau ]', 'ਤੂ ਪ੍ਰਭ ਦਾਤਾ ਦਾਨਿ ਮਤਿ ਪੂਰਾ ਹਮ ਥਾਰੇ ਭੇਖਾਰੀ ਜੀਉ ॥' ],
  [ 'so bRhmu AjonI hY BI honI Gt BIqir dyKu murwrI jIau ]2]', 'ਸੋ ਬ੍ਰਹਮੁ ਅਜੋਨੀ ਹੈ ਭੀ ਹੋਨੀ ਘਟ ਭੀਤਰਿ ਦੇਖੁ ਮੁਰਾਰੀ ਜੀਉ ॥੨॥' ],
  [ 'zny pyc dsqwr rw qwbdwd ]', 'ਜ਼ਨੇ ਪੇਚ ਦਸਤਾਰ ਰਾ ਤਾਬਦਾਦ ॥' ],
  [ 'sauifsies ies iesxI Awid bKwin kY ]', 'ਸਉਡਿਸਇਸ ਇਸ ਇਸਣੀ ਆਦਿ ਬਖਾਨਿ ਕੈ ॥' ],
  [ 'Azo gSqw hr z`rrw ^urSYd qwb ]96]', 'ਅਜ਼ੋ ਗਸ਼ਤਾ ਹਰ ਜ਼ੱਰਰਾ ਖ਼ੁਰਸ਼ੈਦ ਤਾਬ ॥੯੬॥' ],
  [ 'hmw swieil luqi& hk prvrS ]', 'ਹਮਾ ਸਾਇਲਿ ਲੁਤਫ਼ਿ ਹਕ ਪਰਵਰਸ਼ ॥' ],
  [ 'su bYiT iekMqR ]578]', 'ਸੁ ਬੈਠਿ ਇਕੰਤ੍ਰ ॥੫੭੮॥' ],
  [ 'ieiq sRI bicqR nwtky mnu rwjw ko rwj smwpqM ]1]5]', 'ਇਤਿ ਸ੍ਰੀ ਬਚਿਤ੍ਰ ਨਾਟਕੇ ਮਨੁ ਰਾਜਾ ਕੋ ਰਾਜ ਸਮਾਪਤੰ ॥੧॥੫॥' ],
  [ 'Fwknhwry pRBU hmwry jIA pRwn suKdwqy ]', 'ਢਾਕਨਹਾਰੇ ਪ੍ਰਭੂ ਹਮਾਰੇ ਜੀਅ ਪ੍ਰਾਨ ਸੁਖਦਾਤੇ ॥' ],
]

describe( 'toUnicode()', () => {
  words.map( ( [ ascii, unicode ] ) => it( `should convert '${ascii}' to '${unicode}'`, () => {
    expect( toUnicode( ascii ) ).to.equal( unicode )
  } ) )
} )
