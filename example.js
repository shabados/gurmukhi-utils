const { toUnicode, firstLetters, transliterate } = require( 'gurmukhi-utils' )

console.log(toUnicode( 'Koj' ))
console.log(firstLetters( 'hir hir hir gun gwvhu ]' ))
console.log(firstLetters( 'ਹਰਿ ਹਰਿ ਹਰਿ ਗੁਨੀ' ))
console.log(transliterate( 'hukmI hukmu clwey rwhu ]' ))
