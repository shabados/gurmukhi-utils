const vishraams = Object.values( require( './vishraams.json' ) )

/**
 * Generates the first letters for a given ASCII or unicode Gurmukhi string.
 * Includes any end-word vishraams, and line-end characters.
 *
 * @param {String} line The line to generate the first letters for.
 * @returns {String} The first letters of each word in the provided Gurmukhi line.
 *
 * @example <caption>Unicode first letters</caption>
 * firstLetters('ਸਬਦਿ ਮਰੈ. ਸੋ ਮਰਿ ਰਹੈ; ਫਿਰਿ. ਮਰੈ ਨ, ਦੂਜੀ ਵਾਰ ॥', true, true) // => ਸਮ.ਸਮਰ;ਫ.ਮਨ,ਦਵ॥
 *
 * @example <caption>ASCII first letters</caption>
 * firstLetters('sbid mrY. so mir rhY; iPir. mrY n, dUjI vwr ]') => //sm.smr;P.mn,dv]
 */
const firstLetters = line => line
  // Split into words
  .split( ' ' )
  // Grab correct letter of each word
  .map( word => {
    const [ firstLetter, secondLetter = '' ] = word
    const lastLetter = word[ word.length - 1 ]

    // Capture letter after ASCII sihari, if present
    const letter = firstLetter === 'i' ? secondLetter : firstLetter

    // Capture the vishraam char, if it exists
    const vishraamChar = vishraams.includes( lastLetter ) ? lastLetter : ''

    // Return base letter if enabled and a base letter exists, along with the optional vishraam char
    return `${letter}${vishraamChar}`
  } )
  // Join into continuous string
  .join( '' )

module.exports = firstLetters
