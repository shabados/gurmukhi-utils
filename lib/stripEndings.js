const toUnicode = require( './toUnicode' )
const toAscii = require( './toAscii' )
const toHindi = require( './toHindi' )
const { getRegexClass, getRegexGroup } = require( './regex-utils' )

// Line endings in both ASCII, Unicode, and English
const endingClass = getRegexClass( [ '।', '॥', ']', '[', '|' ] )
// Sometimes translation line endings begin with these characters, before numbers
const optionalEndingClass = getRegexClass( [ '(' ] )
// Remove any broken endings
const brokenEndingClass = getRegexGroup( [ '()' ] )

// All numbers in ASCII, Unicode
const numbers = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ].map( ( i ) => i.toString() )
const numberClass = getRegexClass( [
  ...numbers,
  ...numbers.map( toUnicode ),
  ...numbers.map( toUnicode ).map( toHindi ),
] )

// Rahao in English, ASCII, Unicode
const pauseGroup = getRegexGroup( [ 'ਰਹਾਉ', toAscii( 'ਰਹਾਉ' ), 'Pause' ] )

// Matchers to strip out of input string
const matchers = [
  // Any pause (ending + pause word) => match the rest of the line
  ` ?${endingClass} ?${pauseGroup}.*`,
  // Any ending followed by any number => match the rest of the line
  ` ?(${endingClass}|${optionalEndingClass})${numberClass}.*`,
  // Any sequence at the end of a line with numbers, periods, and spaces beginning with a number
  ` ?${numberClass}(${numberClass}|[. ])*$`,
  // Clean up any lingering ending characters
  ` ?${brokenEndingClass}`,
  ` ?${endingClass}`,
].map( ( exp ) => new RegExp( exp, 'g' ) )

/**
 * Strips line endings from any Gurmukhi or translation string.
 * Accepts both Unicode and ASCII input.
 * Useful for generating accurate first letters or modifying non-Gurbani for better display.
 * *Not* designed for headings or Sirlekhs.
 * @param {String} text The text to stip endings from.
 * @return {String} A ending-less version of the text.
 * @example <caption>Line ending phrases</caption>
 * stripEndings('ਸੋ ਘਰੁ ਰਾਖੁ; ਵਡਾਈ ਤੋਇ ॥੧॥ ਰਹਾਉ ॥') // => ਸੋ ਘਰੁ ਰਾਖੁ; ਵਡਾਈ ਤੋਇ
 * stripEndings('ਹੁਕਮੁ ਪਛਾਣਿ; ਤਾ ਖਸਮੈ ਮਿਲਣਾ ॥੧॥ ਰਹਾਉ ਦੂਜਾ ॥') // => ਹੁਕਮੁ ਪਛਾਣਿ; ਤਾ ਖਸਮੈ ਮਿਲਣਾ
 * stripEndings('ਜਨ ਨਾਨਕ. ਗੁਰਮੁਖਿ ਜਾਤਾ ਰਾਮ ॥੪॥੬॥ ਛਕਾ ੧ ॥') // => ਜਨ ਨਾਨਕ. ਗੁਰਮੁਖਿ ਜਾਤਾ ਰਾਮ
 * @example <caption>English Translations</caption>
 * stripEndings('O Nanak, Forever And Ever True. ||1||') // => O Nanak, Forever And Ever True.
 * stripEndings('lush greenery. ||1||Pause||') // => lush greenery.
 * stripEndings('always I live within the Khalsa. 519') // => always I live within the Khalsa.
 * stripEndings('without your reminiscence.(1) (3)') // => without your reminiscence.
 * @example <caption>Spanish Translations</caption>
 * stripEndings('ofrece su ser en sacrificio a Ti. (4-2-9)') // => ofrece su ser en sacrificio a Ti.
 */
const stripEndings = ( text ) => matchers.reduce( ( text, exp ) => text.replace( exp, '' ), text ).trim()

module.exports = stripEndings
