const escapeStringRegexp = require( 'escape-string-regexp' )
const unicodeMappings = require( './unicodeMappings' )

// Make each mapping an escaped global regex, and flip around the mappings
const mappings = Object
  .entries( unicodeMappings )
  // Order so that multichar expressions on the right are captured first
  .sort( ( [ , exp1 ], [ , exp2 ] ) => exp1.length < exp2.length )
  // Do not include empty sub -> expr mappings
  .reduce( ( acc, [ sub, exp ] ) => ( exp
    ? [
      ...acc,
      [ new RegExp( escapeStringRegexp( exp ), 'g' ), sub ],
    ]
    : acc
  ), [] )

// Replacement rules for correcting converted unicode.
const postReplacements = [
  [ /(.)i/ug, 'i$1' ], // Switch position of sihari
  [ /wN/ug, 'W' ], // Replace bindi, khana with single khana with bindi char
  [ /(.)i([RH†çÎÍ˜´])/ug, 'i$1$2' ], // Switch sihari position when pair akhars exist
  [ /kR/ug, 'k®' ], // Replace K pair rara with correct rara
  [ /([nl])M/ug, '$1µ' ], // Replace tippi with correct tippi char
  [ /i([nl])µ/ug, 'i$1M' ], // Replace tippi with correct tippi char in sihari case
  [ /([NMµ])I/ug, '$1ØI' ], // Add spacer char between bindi/tippi and bihari
  [ /NØI/ug, 'ˆØI' ], // Use bindi on top of spacer char
  [ /(R@®H´)u/ug, '$1ü' ], // Use lower aunkar when char is pair akhar
  [ /(R@®H´)U/ug, '$1¨' ], // Use lower dulankaar when char is pair akhar
  [ /(.)´i/ug, 'i$1´' ], // Swap i with pair akhar after ´
]

// Precompute the replacements and mappings
const finalReplacements = [
  [ /(.)ਿ਼/ug, '$1਼ਿ' ], // Move nukta from sihari
  ...mappings,
  ...postReplacements,
]

/**
 * Converts Gurmukhi unicode text to ASCII, used GurmukhiAkhar font.
 * @param {String} text The unicode text to convert.
 * @return {String} An ASCII representation of the provided unicode Gurmukhi string.
 * @example
 * toAscii('ਹਮਾ ਸਾਇਲਿ ਲੁਤਫ਼ਿ ਹਕ ਪਰਵਰਸ਼ ॥') // => hmw swieil luqi& hk prvrS ]
 * toAscii('ਸੁ ਬੈਠਿ ਇਕੰਤ੍ਰ ॥੫੭੮॥') // => su bYiT iekMqR ]578]
 */
const toAscii = text => finalReplacements
  .reduce( ( text, [ exp, sub ] ) => text.replace( exp, sub ), text )

module.exports = toAscii
