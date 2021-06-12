const { toEnglish } = require( '../index' )

// Test lines
const transliterations = [
  [ 'ਕਿਵ ਸਚਿਆਰਾ ਹੋਈਐ ਕਿਵ ਕੂੜੈ ਤੁਟੈ ਪਾਲਿ ॥', 'kiv sachiaaraa hoeeai kiv koorrai tuttai paal |' ],
  [ 'ਕਨਕੰ ਦੁਤਿ ਉਜਲ ਅੰਗ ਸਨੇ ॥', 'kanakan dut ujal ang sane |' ],
  [ 'ਗੁਨ ਮ੍ਰਿਗਹਾ ਕੋ ਚਿਤ ਬੀਚ ਲੀਆ ॥੩੮੫॥', 'gun mrigahaa ko chit beech leea |385|' ],
  [ 'ਗਣ ਗੰਧ੍ਰਬ ਭੂਤ ਪਿਸਾਚ ਤਬੈ ॥੩੮੮॥', 'gan gandhrab bhoot pisaach tabai |388|' ],
  [ 'ਅਬ੍ਰਯਕਤ ਅੰਗ ॥', 'abrayakat ang |' ],
  [ 'ਜਗੰਨਾਥ ਜਗਦੀਸੁਰ ਕਰਤੇ ਸਭ ਵਸਗਤਿ ਹੈ ਹਰਿ ਕੇਰੀ ॥', 'jaganaath jagadeesur karate sabh vasagat hai har keree |' ],
  [ 'ਆਦਿ ਸਚੁ ਜੁਗਾਦਿ ਸਚੁ ॥', 'aad sach jugaad sach |' ],
  [ 'ਸਹਸ ਸਿਆਣਪਾ ਲਖ ਹੋਹਿ ਤ ਇਕ ਨ ਚਲੈ ਨਾਲਿ ॥', 'sehas siaanapaa lakh hohi ta ik na chalai naal |' ],
  [ 'ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥', 'ik oankaar sat naam karataa purakh nirbhau niravair akaal moorat ajoonee saibhan gur prasaad |' ],
  [ 'ਹੁਕਮੀ ਹੁਕਮੁ ਚਲਾਏ ਰਾਹੁ ॥', 'hukamee hukam chalaae raahu |' ],
  [ 'ਤਿਨ ਕੇ ਨਾਮ ਅਨੇਕ ਅਨੰਤ ॥', 'tin ke naam anek anant |' ],
  [ 'ਭਾਂਡਾ ਭਾਉ ਅੰਮ੍ਰਿਤੁ ਤਿਤੁ ਢਾਲਿ ॥', 'bhaanddaa bhaau amrit tith dtaal |' ],
  [ 'ਕ੍ਰਿਪਾ', 'kripaa' ],
  [ 'ਮਃ', 'mahalaa' ],
  [ 'ਜਿਸ ਨੋ ਕ੍ਰਿਪਾ ਕਰਹਿ ਤਿਨਿ ਨਾਮੁ ਰਤਨੁ ਪਾਇਆ ॥', 'jis no kripaa kareh tin naam ratan paaeaa |' ],
  [ 'ਆਵਣੁ ਵੰਞਣੁ ਡਾਖੜੋ ਛੋਡੀ ਕੰਤਿ ਵਿਸਾਰਿ ॥੪॥', 'aavan vanyan ddaakharro chhoddee kant visaar |4|' ],
  [ 'ਘੜੀ ਮੂਰਤ ਸਿਮਰਤ ਪਲ ਵੰਞਹਿ ਜੀਵਣੁ ਸਫਲੁ ਤਿਥਾਈ ਜੀਉ ॥੧॥', 'gharree moorat simarat pal vanyeh jeevan safal tithaaee jeeo |1|' ],
  [ 'ਹਰਿ ਹਰਿ ਹਰਿ ਗੁਨ ਗਾਵਹੁ ॥', 'har har har gun gaavahu |' ],
  [ 'ਹੁਕਮੈ ਅੰਦਰਿ. ਸਭੁ ਕੋ; ਬਾਹਰਿ ਹੁਕਮ. ਨ ਕੋਇ ॥', 'hukamai andar. sabh ko; baahar hukam. na koe |' ],
  [ 'ਸਹਜ; ਸਸਹਜ ਅਨਹਦ ਰਹਤ ਕਹਤ ਪਹਰ, ਸਹਸ ਮਹਲ ਟਹਲ ਕਹਨਨ ਕਹਨ', 'sehaj; sasahaj anahad rehat kehat pehar, sehas mehal ttehal kahanan kehan' ],
  [ 'ਸਭ ਭਇਓ ਪਰਾਇਓ', 'sabh bheo paraaeo' ],
  [ 'ਆਸਾ ਮਹਲਾ ੫ ਪੰਚਪਦੇ₃ ॥', 'aasaa mahalaa 5 panchapade₃ |' ],
  [ 'ਹਰਿ', 'har' ],
  [ 'ਸਚੁ', 'sach' ],
  [ 'ਰਾਹੁ', 'raahu' ],
  [ 'ਭਾਉ', 'bhaau' ],
  [ 'ਸਤਿਗੁਰੁ ਸਤਿਗੁਰੁ ਸਚੁ; ਸਚੁ ਹਰਿ ਹਰਿ ਹਿੰਙੁ', 'satigur satigur sach; sach har har hing' ],
  [ 'ਸੁ ਉ ਜੁ', 'su u ju' ],
  [ 'ਆਪੀਨੑੈ', 'aapeenai' ],
]

describe( 'toEnglish()', () => {
  transliterations.map( ( [ gurmukhi, transliteration ] ) => it( `should transliterate '${gurmukhi}' to '${transliteration}'`, () => {
    expect( toEnglish( gurmukhi ) ).toBe( transliteration )
  } ) )
} )
