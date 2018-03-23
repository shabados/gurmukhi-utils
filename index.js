/**
 * Converts ASCII text used in the GurmukhiAkhar font to Unicode.
 * @param text The ascii text to convert
 */
const akharToUnicode = text => text
  .replace( /i./g, match => match.split( '' ).reverse().join( '' ) )
  .split( '' )
  .map( c => ( unicodeMappings[ c ] !== undefined ? unicodeMappings[ c ] : c ) )
  .join( '' )
  .replace( /ਿ੍./g, match => match.slice( 1, 3 ).concat( 'ਿ' ) )


module.exports = akharToUnicode
