const vishraams = Object.values( require( './vishraams.json' ) )

// The mappings from the letter-variations to simple Gurmukhi letters in ASCII.
const asciiBaseLetterMap = {
  E: 'a', // Open oora -> oora
  S: 's', // Shasha -> sasa
  z: 'j', // zaza -> jaja
  Z: 'g', // gaga pair bindi -> gaga
  L: 'l', // lala pair bindi -> lala
  '^': 'K', // Khakha pair bindi -> khakha
  '&': 'P', // Fafa pair bindi -> Fafa
}

const unicodeBaseLetterMap = {
  ਓ: 'ੳ', // Open oora -> oora
  ਸ਼: 'ਸ', // Shasha -> sasa
  ਜ਼: 'ਜ', // zaza -> jaja
  ਗ਼: 'ਗ', // gaga pair bindi -> gaga
  ਲ਼: 'ਲ', // lala pair bindi -> lala
  ਖ਼: 'ਖ', // Khakha pair bindi -> khakha
  ਫ਼: 'ਫ', // Fafa pair bindi -> Fafa
}

// Specifies the line terminator characters for both ASCII and unicode Gurmukhi
const lineTerminators = new Set( [ '।', '॥', ']', '[' ] )

// Combine the base letter maps
const combinedBaseLetterMap = { ...asciiBaseLetterMap, ...unicodeBaseLetterMap }

/**
 * Generates the first letters for a given ASCII or unicode Gurmukhi string.
 * By default, the function will transform letters with bindi to their simple equivalent,
 * for example, zaza to jaja (ਜ਼ => ਜ).
 * @param {String} line The line to generate the first letters for.
 * @param {Boolean} [stripNukta=true] If `true`, replaces letters pair bindi (such as ਜ਼)
 * with their equivalent without the bindi (ਜ). Also replaces open oora with closed oora.
 * @param {Boolean} [withVishraams=false] Keeps the vishraam characters at the end of each word.
 * @returns {String} The first letters of each word in the provided Gurmukhi line.
 *
 * @example <caption>Unicode first letters no pair bindi/nukta</caption>
 * firstLetters('ਗ਼ੈਰਿ ਹਮਦਿ ਹੱਕ ਨਿਆਇਦ ਬਰ ਜ਼ਬਾਨਮ ਹੀਚ ਗਾਹ') // => ਗਹਹਨਬਜਹਗ
 *
 * @example <caption>Unicode first letters with pair bindi/nukta</caption>
 * firstLetters('ਗ਼ੈਰਿ ਹਮਦਿ ਹੱਕ ਨਿਆਇਦ ਬਰ ਜ਼ਬਾਨਮ ਹੀਚ ਗਾਹ', false) // => ਗ਼ਹਹਨਬਜ਼ਹਗ
 *
 * @example <caption>Unicode first letters with vishraams</caption>
 * firstLetters('ਸਬਦਿ ਮਰੈ. ਸੋ ਮਰਿ ਰਹੈ; ਫਿਰਿ. ਮਰੈ ਨ, ਦੂਜੀ ਵਾਰ ॥', true, true) // => ਸਮ.ਸਮਰ;ਫ.ਮਨ,ਦਵ
 *
 * @example <caption>ASCII first letters no pair bindi/nukta</caption>
 * firstLetters('ijs no ik®pw krih iqin nwmu rqnu pwieAw ]') // => jnkkqnrp
 * firstLetters('iZir&qym sMdUk drIXw AmIk ]') // => gsdA
 *
 * @example <caption>ASCII first letters with pair bindi/nukta</caption>
 * firstLetters('iZir&qym sMdUk* drIXw AmIk* ]', false) // => Zsda
 *
 * @example <caption>ASCII first letters with vishraams</caption>
 * firstLetters('sbid mrY. so mir rhY; iPir. mrY n, dUjI vwr ]', true, true) // => sm.smr;P.mn,dv
 */
const firstLetters = ( line, stripNukta = true, withVishraams ) => line
  // Split into words
  .split( ' ' )
  // Grab correct letter of each word
  .map( word => {
    const [ firstLetter, secondLetter = '' ] = word
    const lastLetter = word[ word.length - 1 ]

    //* Do not include any line terminators in first letters
    if ( lineTerminators.has( firstLetter ) ) { return '' }

    // Capture letter after ASCII sihari, if present
    const letter = firstLetter === 'i' ? secondLetter : firstLetter

    // Capture the vishraam char, if it exists and stripVishraams is not set
    const vishraamChar = withVishraams && vishraams.includes( lastLetter ) ? lastLetter : ''

    // Return base letter if enabled and a base letter exists, along with the optional vishraam char
    return `${stripNukta ? combinedBaseLetterMap[ letter ] || letter : letter}${vishraamChar}`
  } )
  // Join into continuous string
  .join( '' )

module.exports = firstLetters
