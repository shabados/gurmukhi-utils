const {
  toAscii,
  toUnicode,
  toEnglish,
  stripEndings
} = require( 'gurmukhi-utils' )

const unicodeGurmukhi = 'ਸੋ ਘਰੁ ਰਾਖੁ; ਵਡਾਈ ਤੋਇ ॥੧॥ ਰਹਾਉ ॥'
const asciiGurmukhi = 'so Gru rwKu; vfweI qoie ]1] rhwau ]'

console.log( toAscii( unicodeGurmukhi ) ) // => so Gru rwKu; vfweI qoie ]1] rhwau ]
console.log( toUnicode( asciiGurmukhi ) ) // => ਸੋ ਘਰੁ ਰਾਖੁ; ਵਡਾਈ ਤੋਇ ॥੧॥ ਰਹਾਉ ॥
console.log( toEnglish( asciiGurmukhi ) ) // => so ghar raakh; vaddaaee toie |1| rahaau |
console.log( stripEndings( toEnglish( asciiGurmukhi ) ) ) // => so ghar raakh; vaddaaee toie