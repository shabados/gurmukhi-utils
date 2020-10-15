const vishraams = Object.values( require( './vishraams.json' ) )

// Conjoined vowel-letters must be explicilty mapped
const vowelFirstLetters = {
  ਇ: 'ੲ',
  ਈ: 'ੲ',
  ਏ: 'ੲ',
  ਉ: 'ੳ',
  ਊ: 'ੳ',
  ਆ: 'ਅ',
  ਐ: 'ਅ',
  ਔ: 'ਅ',
}

/**
 * Generates the first letters for a unicode Gurmukhi,
 * Hindi transliteration, or English transliteration string.
 * Includes any end-word vishraams, and line-end characters.
 *
 * @param {String} line The line to generate the first letters for.
 * @returns {String} The first letters of each word in the provided Gurmukhi line.
 *
 * @example <caption>Gurmukhi first letters</caption>
 * firstLetters('ਸਬਦਿ ਮਰੈ. ਸੋ ਮਰਿ ਰਹੈ; ਫਿਰਿ. ਮਰੈ ਨ, ਦੂਜੀ ਵਾਰ ॥') // => ਸਮ.ਸਮਰ;ਫ.ਮਨ,ਦਵ॥
 *
 * @example <caption>Hindi first letters</caption>
 * firstLetters('गुरमुखि लाधा मनमुखि गवाइआ ॥') // => गलमग॥
 *
 * @example <caption>English first letters</caption>
 * firstLetters('sabad marai. so mar rahai; fir. marai na, doojee vaar |') // => sm.smr;f.mn,dv|
 */
const firstLetters = ( line ) => line
  // Split into words
  .split( ' ' )
  // Remove any wrods that are excess spaces
  .filter( ( word ) => word.trim().length )
  // Grab correct letter of each word
  .map( ( word ) => {
    const [ letter ] = word
    const lastLetter = word[ word.length - 1 ]

    // Capture the vishraam char, if it exists
    const vishraamChar = vishraams.includes( lastLetter ) ? lastLetter : ''

    // Retrieve the unicode vowel-letter's actual letter, with passthrough
    const firstLetter = vowelFirstLetters[ letter ] || letter

    // Return base letter along with potential vishraam character
    return `${firstLetter}${vishraamChar}`
  } )
  // Join into continuous string
  .join( '' )

module.exports = firstLetters
