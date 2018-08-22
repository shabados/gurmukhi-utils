const escapeStringRegexp = require( 'escape-string-regexp' )
const shahmukhiMappings = require( './shahmukhiMappings' )

// Make each mapping an escaped global regex
const mappings = Object
  .entries( shahmukhiMappings )
  .map( ( [ exp, sub ] ) => [ new RegExp( escapeStringRegexp( exp ), 'g' ), sub ] )

/**
 * Transliterates Unicode Gurmukhi text to the Shahmukhi script.
 * @param {String} text The Unicode Gurmukhi text to convert.
 * @return {String} A Shahmukhi transliteration of the provided Unicode Gurmukhi string.
 * @example
 * toShahmukhi('ਹਮਾ ਸਾਇਲਿ ਲੁਤਫ਼ਿ ਹਕ ਪਰਵਰਸ਼ ॥') // => ہما سائلِ لتفِ ہک پرورش ۔۔
 * toShahmukhi('ਸੁ ਬੈਠਿ ਇਕੰਤ੍ਰ ॥੫੭੮॥') // => سو بیٹھ اکنتر ۔۔۵۷۸۔۔
 */
const toShahmukhi = text => mappings
  .reduce( ( text, [ exp, sub ] ) => text.replace( exp, sub ), text )

module.exports = toShahmukhi
