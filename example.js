const { toHindi, toShahmukhi, toAscii, toUnicode, firstLetters, transliterate } = require( 'gurmukhi-utils' )

console.log(toUnicode( 'Koj' ))
console.log(toAscii('ਖੋਜ'))
console.log(firstLetters( 'hir hir hir gun gwvhu ]' ))
console.log(firstLetters( 'ਹਰਿ ਹਰਿ ਹਰਿ ਗੁਨੀ' ))
console.log(transliterate( 'hukmI hukmu clwey rwhu ]' ))
console.log(toShahmukhi( 'ਹਰਿ ਹਰਿ ਹਰਿ ਗੁਨੀ' ))
console.log(toHindi( 'ਕੁਲ ਜਨ ਮਧੇ ਮਿਲੵੋਿ ਸਾਰਗ ਪਾਨ ਰੇ ॥' ))
