const { toUnicode } = require( '../index' )

// Test words
const words = [
  [ 'Koj', 'ਖੋਜ' ],
  [ 'ihr', 'ਹਿਰ' ],
  [ 'imil´o', 'ਮਿਲੵਿੋ' ],
  [ 'iBÎo', 'ਭ੍ਯਿੋ' ],
  [ 'quohI', 'ਤੋੁਹੀ' ],
  [ 'qouhI', 'ਤੋੁਹੀ' ],
  [ 'kul jn mDy imil´o swrg pwn ry ]', 'ਕੁਲ ਜਨ ਮਧੇ ਮਿਲੵਿੋ ਸਾਰਗ ਪਾਨ ਰੇ ॥' ],
  [ 'qU pRB dwqw dwin miq pUrw hm Qwry ByKwrI jIau ]', 'ਤੂ ਪ੍ਰਭ ਦਾਤਾ ਦਾਨਿ ਮਤਿ ਪੂਰਾ ਹਮ ਥਾਰੇ ਭੇਖਾਰੀ ਜੀਉ ॥' ],
  [ 'so bRhmu AjonI hY BI honI Gt BIqir dyKu murwrI jIau ]2]', 'ਸੋ ਬ੍ਰਹਮੁ ਅਜੋਨੀ ਹੈ ਭੀ ਹੋਨੀ ਘਟ ਭੀਤਰਿ ਦੇਖੁ ਮੁਰਾਰੀ ਜੀਉ ॥੨॥' ],
  [ 'zny pyc dsqwr rw qwbdwd ]', 'ਜ਼ਨੇ ਪੇਚ ਦਸਤਾਰ ਰਾ ਤਾਬਦਾਦ ॥' ],
  [ 'sauifsies ies iesxI Awid bKwin kY ]', 'ਸਉਡਿਸਇਸ ਇਸ ਇਸਣੀ ਆਦਿ ਬਖਾਨਿ ਕੈ ॥' ],
  [ 'Azo gSqw hr z`rrw ^urSYd qwb ]96]', 'ਅਜ਼ੋ ਗਸ਼ਤਾ ਹਰ ਜ਼ੱਰਰਾ ਖ਼ੁਰਸ਼ੈਦ ਤਾਬ ॥੯੬॥' ],
  [ 'hmw swieil luqi& hk prvrS ]', 'ਹਮਾ ਸਾਇਲਿ ਲੁਤਫ਼ਿ ਹਕ ਪਰਵਰਸ਼ ॥' ],
  [ 'su bYiT iekMqR ]578]', 'ਸੁ ਬੈਠਿ ਇਕੰਤ੍ਰ ॥੫੭੮॥' ],
  [ 'ieiq sRI bicqR nwtky mnu rwjw ko rwj smwpqM ]1]5]', 'ਇਤਿ ਸ੍ਰੀ ਬਚਿਤ੍ਰ ਨਾਟਕੇ ਮਨੁ ਰਾਜਾ ਕੋ ਰਾਜ ਸਮਾਪਤੰ ॥੧॥੫॥' ],
  [ 'Fwknhwry pRBU hmwry jIA pRwn suKdwqy ]', 'ਢਾਕਨਹਾਰੇ ਪ੍ਰਭੂ ਹਮਾਰੇ ਜੀਅ ਪ੍ਰਾਨ ਸੁਖਦਾਤੇ ॥' ],
  [ 'BuiKAw.', 'ਭੁਖਿਆ.' ],
  [ '<> siq nwmu krqw purKu inrBau inrvYru; Akwl mUriq AjUnI sYBM gurpRswid ]', 'ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ; ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰਪ੍ਰਸਾਦਿ ॥' ],
  [ 'rwgu gauVI iQqMØI kbIr jI kMØI ]', 'ਰਾਗੁ ਗਉੜੀ ਥਿਤੰੀ ਕਬੀਰ ਜੀ ਕੰੀ ॥' ],
  [ 'Awqmw bwsudyvis´ jy ko jwxY Byau ]', 'ਆਤਮਾ ਬਾਸੁਦੇਵਸੵਿ ਜੇ ਕੋ ਜਾਣੈ ਭੇਉ ॥' ],
  [ 'Asmwn im´wny lhMg drIAw gusl krdn bUd ]', 'ਅਸਮਾਨ ਮੵਿਾਨੇ ਲਹੰਗ ਦਰੀਆ ਗੁਸਲ ਕਰਦਨ ਬੂਦ ॥' ],
  [ 'durlBM eyk Bgvwn nwmh nwnk lbiD´M swDsMig ik®pw pRBM ]35]', 'ਦੁਰਲਭੰ ਏਕ ਭਗਵਾਨ ਨਾਮਹ ਨਾਨਕ ਲਬਧੵਿੰ ਸਾਧਸੰਗਿ ਕ੍ਰਿਪਾ ਪ੍ਰਭੰ ॥੩੫॥' ],
  [ 'jyn klw sis sUr nK´qR joiq´M swsM srIr DwrxM ]', 'ਜੇਨ ਕਲਾ ਸਸਿ ਸੂਰ ਨਖੵਤ੍ਰ ਜੋਤੵਿੰ ਸਾਸੰ ਸਰੀਰ ਧਾਰਣੰ ॥' ],
  [ 'bis´Mq iriKAM iqAwig mwnµ ]', 'ਬਸੵਿੰਤ ਰਿਖਿਅੰ ਤਿਆਗਿ ਮਾਨੰ ॥' ],
  [ 'pRwq Bey inRp bIc sBw, kib sïwm khY ieh BWiq aucwrîo ]', 'ਪ੍ਰਾਤ ਭਏ ਨ੍ਰਿਪ ਬੀਚ ਸਭਾ, ਕਬਿ ਸਯਾਮ ਕਹੈ ਇਹ ਭਾਂਤਿ ਉਚਾਰ੍ਯੋ ॥' ],
]

describe( 'toUnicode()', () => {
  words.map( ( [ ascii, unicode ] ) => it( `should convert '${ascii}' to '${unicode}'`, () => {
    expect( toUnicode( ascii ) ).toBe( unicode )
  } ) )
} )
