const vishraams = require( './vishraams.json' )
const { getRegexClass } = require( './regex-utils' )

const vishraamRegExp = ( vishraams ) => new RegExp( getRegexClass( vishraams ), 'g' )

/**
 * Removes the specified vishraams from a string.
 * @param {String} text The text to remove vishraams from.
 * @param {Object} options The vishraams to remove. Defaults to all.
 * @return {String} A vishraam-less Gurmukhi string.
 *
 * @example <caption>Text only, default options</caption>
 * stripVishraams('ਸਬਦਿ ਮਰੈ. ਸੋ ਮਰਿ ਰਹੈ;') // => 'ਸਬਦਿ ਮਰੈ ਸੋ ਮਰਿ ਰਹੈ
 * stripVishraams('sbid mrY. so mir rhY; iPir.') // => sbid mrY so mir rhY iPir
 *
 * @example <caption>Heavy vishraams only</caption>
 * stripVishraams('sbid mrY. so mir rhY; iPir.', { heavy: true }) // => sbid mrY. so mir rhY iPir.
 *
 * @example <caption>Medium vishrams only</caption>
 * stripVishraams('Anhd sbd vjwey,', { medium: true }) // => Anhd sbd vjwey
 *
 * @example <caption>Light vishrams only</caption>
 * stripVishraams('sbid mrY. so mir rhY; iPir.', { light: true }) // => sbid mrY so mir rhY; iPir
 */
const stripVishraams = (
  text,
  options = { heavy: true, medium: true, light: true },
) => {
  const vishraamOptions = Object
    .entries( options )
    .filter( ( [ type, enabled ] ) => vishraams[ type ] && enabled )
    .map( ( [ type ] ) => vishraams[ type ] )

  return text.replace( vishraamRegExp( vishraamOptions ), '' )
}

module.exports = stripVishraams
