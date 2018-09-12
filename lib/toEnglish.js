const toAscii = require( './toAscii' )

// Vishraam characters
const vishraams = [ ';', '.', ',' ]

// Spacer characters
const spaceChars = [ ' ', ...vishraams ]

// Escape characters and wrap into regex
const spaceCharsRegex = `([${spaceChars.join( '' ).replace( /[.*+?^${}()|[\]\\]/g, '\\$&' )}])`

// Characters that can pass through the transliterator
const passThrough = [
  ' ',
  '!',
  '"',
  '#',
  '$',
  '%',
  "'",
  '(',
  ')',
  '*',
  '+',
  '-',
  '/',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  ':',
  '=',
  '?',
  '_',
  '{',
  '}',
  '¢',
  '£',
  '¥',
  '±',
  '—',
  '•',
  '…',
  '¶',
  ...vishraams,
]

// Characters that should be supressed into empty characters
const supressions = [ '@', 'ª', '°', 'Ç', 'Ó', 'Ô', 'Ø', 'æ', 'Œ', '‰' ]

// The transliteration mappings from ASCII Gurmukhi to english
const transliterationMap = {
  '&': 'ph',
  '<': 'IkOan',
  '>': 'kaar',
  A: 'a',
  B: 'bh',
  C: 'chh',
  D: 'dh',
  E: 'o',
  F: 'dd',
  G: 'gh',
  H: 'h',
  I: 'ee',
  J: 'jh',
  K: 'kh',
  L: 'lh',
  M: '(N)',
  N: '(n)',
  O: 'ou',
  P: 'f',
  Q: 'th',
  R: 'r',
  S: 'sh',
  T: 'tt',
  U: 'oo',
  V: 'R',
  W: 'aa(n)',
  X: 'y',
  Y: 'AI',
  Z: 'g(h)',
  '[': '|',
  '\\': 'n(y)',
  ']': '||',
  '^': 'khh',
  '`': "'",
  a: 'u',
  b: 'b',
  c: 'ch',
  d: 'dh',
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
  t: 'T',
  u: 'u',
  v: 'v',
  w: 'aa',
  x: 'N',
  y: 'e',
  z: 'z',
  '|': 'n(g)',
  '~': "'",
  '¡': 'IkOankaar',
  '¤': "'",
  '§': 'hoo',
  '¨': 'oo',
  '®': 'r',
  '´': 'ye',
  µ: '(N)',
  '¿': 'x',
  Å: 'IkOan',
  Æ: 'kaar',
  Í: 'vY',
  Î: 'y',
  Ï: 'y',
  Ò: '||',
  Ú: ':',
  å: 'Oankaar',
  ç: 'ch',
  ü: 'u',
  œ: 't',
  ƒ: 'noo(n)',
  ˆ: '(n)',
  '˜': 'n',
  '‘': "'",
  '’': "'",
  '“': '"',
  '”': '"',
  '†': 'T',
  ' ': ' ',
  // Expand out supressions as char: ''
  ...supressions.reduce( ( chars, char ) => ( { ...chars, [ char ]: '' } ), {} ),
  // Expand out pass through chars as char: char
  ...passThrough.reduce( ( chars, char ) => ( { ...chars, [ char ]: char } ) ),
}

// Replacements for the initial input
const replacements = [
  [ /ey/g, 'e' ], // No need for y on top
  [ /mÚ/g, 'mhlw' ], // Mehla replcement
  [ /i(.)/g, '$1i' ], // Place sihari in correct position
  [ /(.)[i]([R®H§´ÍÏçœ˜†])/ug, '$1$2i' ], // Remove sihari from these
]

// Rules required to add in an extra a letter - all must be true
const extraARules = [
  // Require letter to be present
  letter => !!letter,
  // Case-insensitive current letter is not in aeiou ooaie
  letter => `aeiou${spaceChars}ooaiee`.indexOf( letter.toLowerCase() ) === -1,
  // Current letter is alphanumeric
  letter => !!letter.match( /[a-zA-Z]/g ),
  // Current letter is not a n-ending type sound
  letter => ![
    transliterationMap.N,
    transliterationMap.M,
    transliterationMap.W,
    transliterationMap[ 'ƒ' ],
    transliterationMap[ '\\' ],
  ].includes( letter ),
  // Current letter is not Ik or Oankaar
  letter => ![ transliterationMap[ '<' ], transliterationMap[ '>' ] ].includes( letter ),
  // Current letter is not pair yaya or pair haha
  letter => ![ transliterationMap[ '§' ], transliterationMap[ '´' ] ].includes( letter ),
  // Next letter is not empty
  ( _, nextLetter ) => !!nextLetter,
  // Case-insensitive next letter is not in aeouyw
  ( _, nextLetter ) => 'aeouyw'.indexOf( nextLetter.toLowerCase() ) === -1,
  // Next letter is not in long string of stuff
  ( _, nextLetter ) => `I@${spaceChars.join( '' )}HR®ªÅÆÇÍÏÒÓÔØÚåæçüŒœ:[]()`.indexOf( nextLetter ) === -1,
  // Next letter is not i, third letter is not empty and is a space
  ( _, nextLetter, nextNextLetter ) => !( nextLetter.indexOf( 'i' ) > -1 && !!nextNextLetter && spaceChars.includes( nextNextLetter ) ),
]

// Final replacements to remove trailing u
const uReplacements = {
  // Replace with capitals to avoid replacing these
  [ ` ju${spaceCharsRegex}` ]: ' JU$1',
  [ ` su${spaceCharsRegex}` ]: ' SU$1',
  [ `ahu${spaceCharsRegex}` ]: 'AHU$1',
  [ `ehu${spaceCharsRegex}` ]: 'EHU$1',
  // Replace any u with nothing
  [ `u${spaceCharsRegex}` ]: '$1',
  // Revert the capitals to lower case
  [ ` JU${spaceCharsRegex}` ]: ' ju$1',
  [ ` SU${spaceCharsRegex}` ]: ' su$1',
  [ `AHU${spaceCharsRegex}` ]: 'ahu$1',
  [ `EHU${spaceCharsRegex}` ]: 'ehu$1',
}

// Final replacements to remove trailing i
const iReplacements = {
  // Replace hi with capitals to avoid replacement
  [ `hi${spaceCharsRegex}` ]: 'HI$1',
  // Replace i
  [ `i${spaceCharsRegex}` ]: '$1',
  // Revert HI to hi
  [ `HI${spaceCharsRegex}` ]: 'hi$1',
}

// The combined list of final replacements
const finalReplacements = Object.entries( {
  ...uReplacements,
  ...iReplacements,
  ai: 'i',
  AI: 'ai',
  aaa: 'aa',
  [ ` n${spaceCharsRegex}` ]: ' na$1',
  [ ` t${spaceCharsRegex}` ]: ' ta$1',
  '\\(N\\)': 'n', // It's a regex, so need a \ to escape ()
  [ `ah${spaceCharsRegex}` ]: 'eh$1',
  eee: "e'ee",
  uu: 'au',
} )
  // Convert to global regular expressions
  .map( ( [ exp, sub ] ) => [ new RegExp( exp, 'g' ), sub ] )


/**
 * Transliterates a line from Unicode Gurmukhi to english.
 * Currently supports the `,`, `;`, `.` vishraam characters.
 * @param {String} line The Gurmukhi ASCII line to transliterate.
 * @returns {String} The English transliteration of the provided Gurmukhi line.
 * @example
 * toEnglish('ਹੁਕਮੀ ਹੁਕਮੁ ਚਲਾਏ ਰਾਹੁ ॥') // => hukamee hukam chalaae raahu ||
 * @example
 * toEnglish('ਭਾਂਡਾ ਭਾਉ ਅੰਮ੍ਰਿਤੁ ਤਿਤੁ ਢਾਲਿ ॥') // => bhaa(n)ddaa bhaau anmrit tit ddaal ||
 */
const toEnglish = line => {
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
      let mappedLetter = transliterationMap[ letter ]

      // Do not include trailing sihari
      if ( letter === 'i' && spaceChars.includes( nextLetter ) ) { return '' }

      // Add in extra `a` if every rule is met
      if ( extraARules.every( fn => fn( mappedLetter, nextLetter, nextNextLetter ) ) ) { mappedLetter += 'a' }

      return mappedLetter
    } )
    .join( '' )

  // Apply final replacements, remove any triple a, and return
  return finalReplacements
    .reduce( ( line, [ exp, sub ] ) => line.replace( exp, sub ), transliterated )
    .replace( /aaa/g, 'aa' )
}

module.exports = toEnglish
