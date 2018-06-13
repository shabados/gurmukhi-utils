const unicodeMappings = require( './mappings' )

/**
 * Converts ASCII text used in the GurmukhiAkhar font to Unicode.
 * @param {String} text The ascii text to convert.
 * @return {String} A unicode representation of the provided ascii gurmukhi string.
 */
const toUnicode = text => text
  .replace( /i./g, match => match.split( '' ).reverse().join( '' ) )
  .split( '' )
  .map( c => ( unicodeMappings[ c ] !== undefined ? unicodeMappings[ c ] : c ) )
  .join( '' )
  .replace( /ਿ੍./g, match => match.slice( 1, 3 ).concat( 'ਿ' ) )


module.exports = toUnicode
