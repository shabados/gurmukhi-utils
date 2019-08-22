const { expect } = require( 'chai' )

const { toAscii } = require( '../index' )

// Test words
const words = [
  [ 'ਖੋਜ', 'Koj' ],
  [ 'ਹਿਰ', 'ihr' ],
  [ 'ਮਿਲੵਿੋ', 'imil´o' ],
  [ 'ਕੁਲ ਜਨ ਮਧੇ ਮਿਲੵਿੋ ਸਾਰਗ ਪਾਨ ਰੇ ॥', 'kul jn mDy imil´o swrg pwn ry ]' ],
  [ 'ਤੂ ਪ੍ਰਭ ਦਾਤਾ ਦਾਨਿ ਮਤਿ ਪੂਰਾ ਹਮ ਥਾਰੇ ਭੇਖਾਰੀ ਜੀਉ ॥', 'qU pRB dwqw dwin miq pUrw hm Qwry ByKwrI jIau ]' ],
  [ 'ਸੋ ਬ੍ਰਹਮੁ ਅਜੋਨੀ ਹੈ ਭੀ ਹੋਨੀ ਘਟ ਭੀਤਰਿ ਦੇਖੁ ਮੁਰਾਰੀ ਜੀਉ ॥੨॥', 'so bRhmu AjonI hY BI honI Gt BIqir dyKu murwrI jIau ]2]' ],
  [ 'ਜ਼ਨੇ ਪੇਚ ਦਸਤਾਰ ਰਾ ਤਾਬਦਾਦ ॥', 'zny pyc dsqwr rw qwbdwd ]' ],
  [ 'ਸਉਡਿਸਇਸ ਇਸ ਇਸਣੀ ਆਦਿ ਬਖਾਨਿ ਕੈ ॥', 'sauifsies ies iesxI Awid bKwin kY ]' ],
  [ 'ਅਜ਼ੋ ਗਸ਼ਤਾ ਹਰ ਜ਼ੱਰਰਾ ਖ਼ੁਰਸ਼ੈਦ ਤਾਬ ॥੯੬॥', 'Azo gSqw hr z`rrw ^urSYd qwb ]96]' ],
  [ 'ਹਮਾ ਸਾਇਲਿ ਲੁਤਫ਼ਿ ਹਕ ਪਰਵਰਸ਼ ॥', 'hmw swieil luqi& hk prvrS ]' ],
  [ 'ਸੁ ਬੈਠਿ ਇਕੰਤ੍ਰ ॥੫੭੮॥', 'su bYiT iekMqR ]578]' ],
  [ 'ਇਤਿ ਸ੍ਰੀ ਬਚਿਤ੍ਰ ਨਾਟਕੇ ਮਨੁ ਰਾਜਾ ਕੋ ਰਾਜ ਸਮਾਪਤੰ ॥੧॥੫॥', 'ieiq sRI bicqR nwtky mnu rwjw ko rwj smwpqM ]1]5]' ],
  [ 'ਢਾਕਨਹਾਰੇ ਪ੍ਰਭੂ ਹਮਾਰੇ ਜੀਅ ਪ੍ਰਾਨ ਸੁਖਦਾਤੇ ॥', 'Fwknhwry pRBU hmwry jIA pRwn suKdwqy ]' ],
  [ 'ਮੰਤ੍ਰੁ', 'mMqRü' ],
  [ 'ਤਿਸੁ ਵਿਣੁ ਸਭੁ ਅਪਵਿਤ੍ਰੁ ਹੈ ਜੇਤਾ ਪੈਨਣੁ ਖਾਣੁ ॥', 'iqsu ivxu sBu ApivqRü hY jyqw pYnxu Kwxu ]' ],
  [ 'ਸੋਢੀ ਸ੍ਰਿਸ੍ਟਿ ਸਕਲ ਤਾਰਣ ਕਉ ਅਬ ਗੁਰ ਰਾਮਦਾਸ ਕਉ ਮਿਲੀ ਬਡਾਈ ॥੩॥', 'soFI isRis† skl qwrx kau Ab gur rwmdws kau imlI bfweI ]3]' ],
  [ 'ਭੰਜਨ ਗੜ੍ਹਣ ਸਮਥੁ ਤਰਣ ਤਾਰਣ ਪ੍ਰਭੁ ਸੋਈ ॥', 'BMjn gVHx smQu qrx qwrx pRBu soeI ]' ],
  [ 'ਰਾਗੁ ਗਉੜੀ ਥਿਤੰੀ ਕਬੀਰ ਜੀ ਕੰੀ ॥', 'rwgu gauVI iQqµØI kbIr jI kµØI ]' ],
]

describe( 'toAscii()', () => {
  words.map( ( [ unicode, ascii ] ) => it( `should convert '${unicode}' to '${ascii}'`, () => {
    expect( toAscii( unicode ) ).to.equal( ascii )
  } ) )
} )
