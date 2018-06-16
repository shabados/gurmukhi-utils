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
 * @returns {String} The first letters of each word in the provided Gurmukhi line.
 * @example <caption>Unicode first letters no pair bindi/nukta</caption>
 * firstLetters('ਗ਼ੈਰਿ ਹਮਦਿ ਹੱਕ ਨਿਆਇਦ ਬਰ ਜ਼ਬਾਨਮ ਹੀਚ ਗਾਹ') // => ਗਹਹਨਬਜਹਗ
 * @example <caption>Unicode first letters with pair bindi/nukta</caption>
 * firstLetters('ਗ਼ੈਰਿ ਹਮਦਿ ਹੱਕ ਨਿਆਇਦ ਬਰ ਜ਼ਬਾਨਮ ਹੀਚ ਗਾਹ') // => ਗ਼ਹਹਨਬਜ਼ਹਗ
 * @example <caption>ASCII first letters no pair bindi/nukta</caption>
 * firstLetters('ijs no ik®pw krih iqin nwmu rqnu pwieAw ]') // => jnkkqnrp
 * firstLetters('iZir&qym sMdUk drIXw AmIk ]') // => gsdA
 * @example <caption>ASCII first letters with pair bindi/nukta</caption>
 * firstLetters('iZir&qym sMdUk* drIXw AmIk* ]', false) // => Zsda
 */
const firstLetters = ( line, stripNukta = true ) => line
  // Split into words
  .split( ' ' )
  // Grab correct letter of each word
  .map( ( [ firstLetter, secondLetter ] ) => {
    //* Do not include any line terminators in first letters
    if ( lineTerminators.has( firstLetter ) ) { return '' }

    // Capture letter after ASCII sihari, if present
    const letter = firstLetter === 'i' ? secondLetter || '' : firstLetter

    // Return base letter if enabled and a base letter exists
    return stripNukta ? combinedBaseLetterMap[ letter ] || letter : letter
  } )
  // Join into continuous string
  .join( '' )

module.exports = firstLetters
