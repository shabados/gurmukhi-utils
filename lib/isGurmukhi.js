const vishraams = Object.values( require( './vishraams.json' ) )

// Checks if Unicode Text is in Gurmukhi Block (U+0A00 - U+0A7F)
const checkCharCode = ( text ) => ( text.charCodeAt( 0 ) >= 2560 && text.charCodeAt( 0 ) <= 2687 )

// Characters to filter from text if doing an exhaustive check
const filteredChars = [
  ' ',
  '\u200B',
  '।',
  '॥',
  ...vishraams,
]

/**
 * Checks if first char in string is part of the Gurmukhi Unicode block.
 * @param {String} text The text to check.
 * @param {boolean} [exhaustive] If `true`, checks if the whole string is Unicode Gurmukhi.
 * @return {boolean} True if Unicode Gurmukhi, false if other.
 * @example
 * isGurmukhi('ਗੁਰਮੁਖੀ') // => true
 * isGurmukhi('gurmuKI') // => false
 */
const isGurmukhi = ( text, exhaustive ) => (
  exhaustive
    ? text.split( '' )
      .filter( ( i ) => !filteredChars.includes( i ) )
      .every( checkCharCode )
    : checkCharCode( text )
)

module.exports = isGurmukhi
