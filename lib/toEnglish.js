const toAscii = require( './toAscii' )
const vishraams = Object.values( require( './vishraams' ) )

// Spacer characters
const spaceChars = [ ' ', ...vishraams ]

// Escape characters and wrap into regex
const spaceCharsRegex = `([${spaceChars.join( '' ).replace( /[.*+?^${}()|[\]\\]/g, '\\$&' )}])`

// Characters that should be supressed into empty characters
const supressions = [ '@', '`', '~', '¤', 'ª', '°', 'Ç', 'Ó', 'Ô', 'Ø', 'æ', 'Œ', '‰' ]

// Characters that should be left as is
const ignore = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', ',', ';', '₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉' ]

// The transliteration mappings from ASCII Gurmukhi to english
const transliterationMap = {
  ' ': ' ',
  '&': 'f',
  '<': 'ik oan',
  '>': 'kaar',
  A: 'a',
  B: 'bh',
  C: 'chh',
  D: 'dh',
  E: 'o',
  F: 'dt',
  G: 'gh',
  H: 'h',
  I: 'ee',
  J: 'jh',
  K: 'kh',
  L: 'l',
  M: '(n)',
  N: '(n)',
  O: 'au',
  P: 'f',
  Q: 'th',
  R: 'r',
  S: 'sh',
  T: 'tth',
  U: 'oo',
  V: 'rr',
  W: 'aa(n)',
  X: 'y',
  Y: 'ai',
  Z: 'g',
  '[': '|',
  '\\': 'y',
  ']': '|',
  '^': 'kh',
  a: 'a',
  b: 'b',
  c: 'ch',
  d: 'd',
  e: 'e',
  f: 'dd',
  g: 'g',
  h: 'h',
  i: 'i',
  j: 'j',
  k: 'k',
  l: 'l',
  m: 'm',
  n: 'n',
  o: 'o',
  p: 'p',
  q: 't',
  r: 'r',
  s: 's',
  t: 'tt',
  u: 'u',
  v: 'v',
  w: 'aa',
  x: 'n',
  y: 'e',
  z: 'z',
  '|': 'ng',
  '¡': 'ik oankaar',
  '§': 'hoo',
  '¨': 'oo',
  '®': 'r',
  '´': 'y',
  µ: '(n)',
  Å: 'ik oan',
  Æ: 'kaar',
  Í: 'v',
  Î: 'y',
  î: 'y',
  Ï: 'y',
  ï: 'y',
  Ò: '|',
  Ú: ':',
  å: 'oankaar',
  ç: 'ch',
  ü: 'u',
  œ: 't',
  ƒ: 'noo',
  ˆ: '(n)',
  '˜': 'n',
  '†': 'tt',
  // Expand out supressions as char: ''
  ...supressions.reduce( ( chars, char ) => ( { ...chars, [ char ]: '' } ), {} ),
  // Expand out ignore as self
  ...ignore.reduce( ( chars, char ) => ( { ...chars, [ char ]: char } ), {} ),
}

// Replacements for the initial input
const replacements = [
  [ /ey/g, 'e' ], // No need for y on top
  [ /mÚ/g, 'mhlw' ], // Mehla replcement
  [ /i(.)/g, '$1i' ], // Place sihari in correct position
  [ /(.)[i]([R®H§´ÍÏçœ˜†])/ug, '$1$2i' ], // Move sihari in front of pairin akhars
  [ new RegExp( `(\\S[^ha])[iu]([${vishraams.join( '' )}]|\\b)`, 'ug' ), '$1$2' ], // Remove trailing Aunkar (u) and Sihari (i) except when on Haha (h), Ooraa (a), or on a standalone akhar
  [ new RegExp( `(\\b\\S)h([^iIuUyYwWoONM§¨®´µÍÏçüœˆ˜†]\\b|[${vishraams.join( '' )}])`, 'ug' ), '$1yh$2' ], // Add y to three consonant letter words with haha in middle per issue #123
]

// Rules required to add in an extra a letter - all must be true
const extraARules = [
  // Current letter is alphanumeric
  ( letter ) => !!letter.match( /[a-zA-Z]/g ),
  // Case-insensitive current letter is not a vowel
  ( letter ) => `aeiou${spaceChars}ooaiee`.indexOf( letter.toLowerCase() ) === -1,
  // Current letter is not a n-ending type sound
  ( letter ) => ![
    transliterationMap.N,
    transliterationMap.M,
    transliterationMap.W,
    transliterationMap[ 'ƒ' ],
  ].includes( letter ),
  // Current letter is not Ik or Oankaar
  ( letter ) => ![
    transliterationMap[ '<' ],
    transliterationMap[ '>' ],
    transliterationMap[ '¡' ],
    transliterationMap[ 'Å' ],
    transliterationMap[ 'Æ' ],
    transliterationMap[ 'å' ],
  ].includes( letter ),
  // Next letter is not i
  ( _, nextLetter ) => ( nextLetter.indexOf( 'i' ) === -1 ),
  // Case-insensitive next letter is not in aeouyw
  ( _, nextLetter ) => 'aeouyw'.indexOf( nextLetter.toLowerCase() ) === -1,
  // Next letter is not in long string of extra characters (non-akhars)
  ( _, nextLetter ) => `${spaceChars.join( '' )}[]IHR®ªÅÆÇÍÏÒØÚåæçüœ:`.indexOf( nextLetter ) === -1,
  // nextLetter, nextNextLetter, and prevLetter is not a
  ( _, nextLetter, nextNextLetter ) => ( nextLetter.indexOf( 'a' ) === -1 && nextNextLetter.indexOf( 'a' ) === -1 ),
]

// The combined list of final replacements
const finalReplacements = Object.entries( {
  '\\(': '',
  '\\)': '',
  aaa: 'aa',
  aai: 'ai',
  eee: 'ee',
  nn: 'n',
  eeaa: 'eea',
  eiaa: 'eaa',
  eio: 'eo',
  anm: 'am',
  [ `ahi${spaceCharsRegex}` ]: 'eh$1',
  [ `yhi${spaceCharsRegex}` ]: 'yeh$1',
  [ `${spaceCharsRegex}tit${spaceCharsRegex}` ]: '$1tith$2',
  uu: 'au',
  aou: 'au',
  [ `${spaceCharsRegex}au` ]: '$1u',
  [ `${spaceCharsRegex}ei` ]: '$1i',
  [ `eau${spaceCharsRegex}` ]: 'eo$1',
  [ `${spaceCharsRegex}n${spaceCharsRegex}` ]: '$1na$2',
  [ `${spaceCharsRegex}t${spaceCharsRegex}` ]: '$1ta$2',
} )
  // Convert to global regular expressions
  .map( ( [ exp, sub ] ) => [ new RegExp( exp, 'ug' ), sub ] )

/**
 * Transliterates a line from Unicode Gurmukhi to english.
 * Currently supports the `,`, `;`, `.` vishraam characters.
 * @param {String} line The Gurmukhi Unicode line to transliterate.
 * @returns {String} The English transliteration of the provided Gurmukhi line.
 * @example
 * toEnglish('ਹੁਕਮੀ ਹੁਕਮੁ ਚਲਾਏ ਰਾਹੁ ॥') // => hukamee hukam chalaae raahu ||
 * @example
 * toEnglish('ਭਾਂਡਾ ਭਾਉ ਅੰਮ੍ਰਿਤੁ ਤਿਤੁ ਢਾਲਿ ॥') // => bhaa(n)ddaa bhaou anmrit tit dtaal ||
 */
const toEnglish = ( line ) => {
  // Work out transliterated line
  const transliterated = replacements
    // Carry out initial replacements
    .reduce( ( line, [ exp, sub ] ) => line.replace( exp, sub ), toAscii( line ) )
    .split( '' )
    // Transliterate each character
    .map( ( letter, index, line ) => {
      // Look ahead a few letters
      const nextLetter = line[ index + 1 ] || ''
      const nextNextLetter = line[ index + 2 ] || ''

      // Map letter using transliteration map
      // If letter is unmappable, then suppress it
      let mappedLetter = transliterationMap[ letter ] || ''

      // Add in extra `a` if every rule is met
      if ( extraARules.every( ( fn ) => fn( mappedLetter, nextLetter, nextNextLetter ) ) ) { mappedLetter += 'a' }

      return mappedLetter
    } )
    .join( '' )

  // Apply final replacements, remove any triple a, and return
  return finalReplacements
    .reduce( ( line, [ exp, sub ] ) => line.replace( exp, sub ), transliterated )
    .replace( /aaa/g, 'aa' )
}

module.exports = toEnglish
