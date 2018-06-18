const escapeStringRegexp = require( 'escape-string-regexp' )
const unicodeMappings = require( './unicodeMappings' )

// Make each mapping an escaped global regex, and flip around the mappings
const mappings = Object
  .entries( unicodeMappings )
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
  [ /(.)i/ug, 'i$1' ],
  [ /wN/ug, 'W' ],
  [ /(.)i([RH†çÎÍ˜´])/ug, 'i$1$2' ],
  [ /kR/ug, 'k®' ],
  [ /([nl])M/ug, '$1µ' ],
  [ /i([nl])µ/ug, 'i$1M' ],
  [ /([NMµ])I/ug, '$1ØI' ],
  [ /NØI/ug, 'ˆØI' ],
  [ /(R@®H´)u/ug, '$1ü' ],
  [ /(R@®H´)U/ug, '$1¨' ],
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
