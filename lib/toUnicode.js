const escapeStringRegexp = require( 'escape-string-regexp' )
const unicodeMappings = require( './unicodeMappings' )

// Make each mapping an escaped global regex
const mappings = Object
  .entries( unicodeMappings )
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
