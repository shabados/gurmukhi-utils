const { expect } = require( 'chai' )

const { toEnglish } = require( '../index' )

// Test lines
const transliterations = [
  [ 'ਕਿਵ ਸਚਿਆਰਾ ਹੋਈਐ ਕਿਵ ਕੂੜੈ ਤੁਟੈ ਪਾਲਿ ॥', "kiv sachiaaraa hoe'eeaai kiv kooRai tuTai paal ||" ],
  [ 'ਕਨਕੰ ਦੁਤਿ ਉਜਲ ਅੰਗ ਸਨੇ ॥', 'kanakan dhut aujal ang sane ||' ],
  [ 'ਗੁਨ ਮ੍ਰਿਗਹਾ ਕੋ ਚਿਤ ਬੀਚ ਲੀਆ ॥੩੮੫॥', 'gun mrigahaa ko chit beech leeaa ||385||' ],
  [ 'ਗਣ ਗੰਧ੍ਰਬ ਭੂਤ ਪਿਸਾਚ ਤਬੈ ॥੩੮੮॥', 'gaN gandhrab bhoot pisaach tabai ||388||' ],
  [ 'ਅਬ੍ਰਯਕਤ ਅੰਗ ॥', 'abrayakat ang ||' ],
  [ 'ਜਗੰਨਾਥ ਜਗਦੀਸੁਰ ਕਰਤੇ ਸਭ ਵਸਗਤਿ ਹੈ ਹਰਿ ਕੇਰੀ ॥', 'jagannaath jagadheesur karate sabh vasagat hai har keree ||' ],
  [ 'ਆਦਿ ਸਚੁ ਜੁਗਾਦਿ ਸਚੁ ॥', 'aadh sach jugaadh sach ||' ],
  [ 'ਸਹਸ ਸਿਆਣਪਾ ਲਖ ਹੋਹਿ ਤ ਇਕ ਨ ਚਲੈ ਨਾਲਿ ॥', 'sahas siaaNapaa lakh hohi ta eik na chalai naal ||' ],
  [ 'ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰਪ੍ਰਸਾਦਿ ॥', 'IkOankaar sat naam karataa purakh nirabhau niravair akaal moorat ajoonee saibhan guraprasaadh ||' ],
  [ 'ਹੁਕਮੀ ਹੁਕਮੁ ਚਲਾਏ ਰਾਹੁ ॥', 'hukamee hukam chalaae raahu ||' ],
  [ 'ਤਿਨ ਕੇ ਨਾਮ ਅਨੇਕ ਅਨੰਤ ॥', 'tin ke naam anek anant ||' ],
  [ 'ਭਾਂਡਾ ਭਾਉ ਅੰਮ੍ਰਿਤੁ ਤਿਤੁ ਢਾਲਿ ॥', 'bhaa(n)ddaa bhaau anmrit tit ddaal ||' ],
  [ 'ਕ੍ਰਿਪਾ', 'kripaa' ],
  [ 'ਮਃ', 'mahalaa' ],
  [ 'ਜਿਸ ਨੋ ਕ੍ਰਿਪਾ ਕਰਹਿ ਤਿਨਿ ਨਾਮੁ ਰਤਨੁ ਪਾਇਆ ॥', 'jis no kripaa kareh tin naam ratan paaeiaa ||' ],
  [ 'ਆਵਣੁ ਵੰਞਣੁ ਡਾਖੜੋ ਛੋਡੀ ਕੰਤਿ ਵਿਸਾਰਿ ॥੪॥', 'aavaN vann(y)N ddaakhaRo chhoddee kant visaar ||4||' ],
  [ 'ਘੜੀ ਮੂਰਤ ਸਿਮਰਤ ਪਲ ਵੰਞਹਿ ਜੀਵਣੁ ਸਫਲੁ ਤਿਥਾਈ ਜੀਉ ॥੧॥', "ghaRee moorat simarat pal vann(y)hi jeevaN safal tithaae'ee jeeau ||1||" ],
  [ 'ਹਰਿ ਹਰਿ ਹਰਿ ਗੁਨ ਗਾਵਹੁ ॥', 'har har har gun gaavahu ||' ],
]

describe( 'toEnglish()', () => {
  transliterations.map( ( [ gurmukhi, transliteration ] ) => it( `should transliterate '${gurmukhi}' to '${transliteration}'`, () => {
    expect( toEnglish( gurmukhi ) ).to.equal( transliteration )
  } ) )
} )
