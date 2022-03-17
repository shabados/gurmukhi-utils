const escapeStringRegexp = require( 'escape-string-regexp' )

const unicodeMappings = require( './unicodeMappings' )

// Make each mapping an escaped global regex
const mappings = Object
  .entries( unicodeMappings )
  .map( ( [ exp, sub ] ) => [ new RegExp( escapeStringRegexp( exp ), 'g' ), sub ] )

// Replacement rules for converting Gurmukhi ASCII to unicode.
const replacements = [
  [ /i(.)/ug, '$1i' ], // Switch around sihari position
  [ /®/ug, 'R' ], // Use only one type of pair R-sound
  [ /([iMµyY])([R®H§ÍÏçœ˜†])/ug, '$2$1' ], // Switch around position of pair R, y etc sounds
  [ /([MµyY])([uU])/ug, '$2$1' ], // Switch around lava/dulava/tipee with aunkar/dulankar
  [ /`([wWIoOyYR®H§´ÍÏçœ˜†uU])/ug, '$1`' ], // Place adhak at end when vowels are either side
  [ /i([´Î])/ug, '$1i' ], // Swap i with ´ or Î
  [ /uo/ug, 'ou' ], // Swap aunkarh+hora for unicode compliant hora+aunakarh
]

// Precompute the replacements and mappings
const finalReplacements = [ ...replacements, ...mappings ]

/**
 * Converts ASCII text used in the GurmukhiAkhar font to Unicode.
 * @param {String} text The ASCII text to convert.
 * @return {String} A unicode representation of the provided ASCII Gurmukhi string.
 * @example
 * toUnicode('kul jn mDy imil´o swrg pwn ry ]') // => ਕੁਲ ਜਨ ਮਧੇ ਮਿਲੵੋਿ ਸਾਰਗ ਪਾਨ ਰੇ ॥
 * toUnicode('su bYiT iekMqR ]578]') // => ਸੁ ਬੈਠਿ ਇਕੰਤ੍ਰ ॥੫੭੮॥
 */
const toUnicode = ( text ) => finalReplacements
  .reduce( ( text, [ exp, sub ] ) => text.replace( exp, sub ), text )

module.exports = toUnicode
