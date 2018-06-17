const escapeStringRegexp = require( 'escape-string-regexp' )

// ASCII to unicode mappings
const mappings = Object.entries( {
  ei: 'ਇ',
  au: 'ਉ',
  aU: 'ਊ',
  eI: 'ਈ',
  ey: 'ਏ',
  Aw: 'ਆ',
  AY: 'ਐ',
  AO: 'ਔ',
  AW: 'ਆਂ',
  a: 'ੳ',
  A: 'ਅ',
  b: 'ਬ',
  B: 'ਭ',
  c: 'ਚ',
  C: 'ਛ',
  d: 'ਦ',
  D: 'ਧ',
  e: 'ੲ',
  E: 'ਓ',
  f: 'ਡ',
  F: 'ਢ',
  g: 'ਗ',
  G: 'ਘ',
  h: 'ਹ',
  H: '੍ਹ',
  i: 'ਿ',
  I: 'ੀ',
  j: 'ਜ',
  J: 'ਝ',
  k: 'ਕ',
  K: 'ਖ',
  l: 'ਲ',
  L: 'ਲ਼',
  m: 'ਮ',
  M: 'ੰ',
  n: 'ਨ',
  N: 'ਂ',
  o: 'ੋ',
  O: 'ੌ',
  p: 'ਪ',
  P: 'ਫ',
  q: 'ਤ',
  Q: 'ਥ',
  r: 'ਰ',
  R: '੍ਰ',
  s: 'ਸ',
  S: 'ਸ਼',
  t: 'ਟ',
  T: 'ਠ',
  u: 'ੁ',
  U: 'ੂ',
  v: 'ਵ',
  V: 'ੜ',
  w: 'ਾ',
  W: 'ਾਂ',
  x: 'ਣ',
  X: 'ਯ',
  y: 'ੇ',
  Y: 'ੈ',
  z: 'ਜ਼',
  Z: 'ਗ਼',
  1: '੧',
  2: '੨',
  3: '੩',
  4: '੪',
  5: '੫',
  6: '੬',
  7: '੭',
  8: '੮',
  9: '੯',
  0: '੦',
  '&': 'ਫ਼',
  '^': 'ਖ਼',
  '[': '।',
  ']': '॥',
  '®': '੍ਰ',
  '<>': 'ੴ',
  '´': 'ੵ',
  µ: 'ੰ',
  '\\': 'ਞ',
  '@': 'ੑ',
  '~': 'ੱ',
  '`': 'ੱ',
  Í: '੍ਵ',
  Ú: 'ਃ',
  ü: 'ੁ',
  '†': '੍ਟ',
  ƒ: 'ਨੂੰ',
  '˜': '੍ਨ',
  '|': 'ਙ',
  Î: '੍ਯ',
  ç: '੍ਚ',
  '¨': 'ੂ',
  Ø: '',
  ˆ: 'ਂ',
  '¤': 'ੱ',
  œ: '੍ਤ',
  Ç: '☬',
} )
  // Make each replacement a global regex
  .map( ( [ exp, sub ] ) => [ new RegExp( escapeStringRegexp( exp ), 'g' ), sub ] )

// Replacement rules for converting Gurmukhi ASCII to unicode.
const replacements = [
  [ /i(.)/ug, '$1i' ], // Switch around sihari position
  [ /(.)®/ug, '$1R' ], // Use only one type of pair R-sound
  [ /(.)(i|M|y|Y)([RH†çÎÍ˜])/ug, '$1$3$2' ], // Switch around position of pair R, y etc sounds
  [ /(.)(M|y|Y)(u|U)/ug, '$1$3$2' ], // Switch around lava/dulava/tipee with aunkar/dulankar
  [ /(.)`([wWIoOyYRH†çÎ˜ÍuU])/ug, '$1$2`' ], // Place adhak at end when vowels are either side
]

// Precompute the replacements and mappings
const finalReplacements = [ ...replacements, ...mappings ]

/**
 * Converts ASCII text used in the GurmukhiAkhar font to Unicode.
 * @param {String} text The ASCII text to convert.
 * @return {String} A unicode representation of the provided ASCII Gurmukhi string.
 */
const toUnicode = text => finalReplacements
  .reduce( ( text, [ exp, sub ] ) => text.replace( exp, sub ), text )

module.exports = toUnicode
