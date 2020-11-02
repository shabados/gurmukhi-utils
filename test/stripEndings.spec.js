const { stripEndings, toAscii } = require( '..' )

const gurmukhiPassages = [
  [ 'ਸੋ ਘਰੁ ਰਾਖੁ; ਵਡਾਈ ਤੋਇ ॥੧॥ ਰਹਾਉ ॥', 'ਸੋ ਘਰੁ ਰਾਖੁ; ਵਡਾਈ ਤੋਇ' ],
  [ 'ਹੁਕਮੁ ਪਛਾਣਿ; ਤਾ ਖਸਮੈ ਮਿਲਣਾ ॥੧॥ ਰਹਾਉ ਦੂਜਾ ॥', 'ਹੁਕਮੁ ਪਛਾਣਿ; ਤਾ ਖਸਮੈ ਮਿਲਣਾ' ],
  [
    'ਨਾਮੁ ਅਧਾਰੁ ਦੀਜੈ. ਨਾਨਕ ਕਉ; ਆਨਦ ਸੂਖ ਘਨੇਰੈ ॥੨॥੧੨॥ ਛਕੇ ੨ ॥',
    'ਨਾਮੁ ਅਧਾਰੁ ਦੀਜੈ. ਨਾਨਕ ਕਉ; ਆਨਦ ਸੂਖ ਘਨੇਰੈ',
  ],
  [
    'ਜਪਿ ਜਪਿ ਨਾਮੁ ਜੀਵਾ ਤੇਰੀ ਬਾਣੀ; ਨਾਨਕ ਦਾਸ ਬਲਿਹਾਰੇ ॥੨॥੧੮॥ ਛਕੇ ੩ ॥',
    'ਜਪਿ ਜਪਿ ਨਾਮੁ ਜੀਵਾ ਤੇਰੀ ਬਾਣੀ; ਨਾਨਕ ਦਾਸ ਬਲਿਹਾਰੇ',
  ],
  [
    'ਸਹਸ ਸਿਆਣਪ ਨਹ ਮਿਲੈ, ਮੇਰੀ ਜਿੰਦੁੜੀਏ; ਜਨ ਨਾਨਕ. ਗੁਰਮੁਖਿ ਜਾਤਾ ਰਾਮ ॥੪॥੬॥ ਛਕਾ ੧ ॥',
    'ਸਹਸ ਸਿਆਣਪ ਨਹ ਮਿਲੈ, ਮੇਰੀ ਜਿੰਦੁੜੀਏ; ਜਨ ਨਾਨਕ. ਗੁਰਮੁਖਿ ਜਾਤਾ ਰਾਮ',
  ],
  [
    'ਆਇ ਮਿਲੁ ਗੁਰਸਿਖ. ਆਇ ਮਿਲੁ; ਤੂ ਮੇਰੇ ਗੁਰੂ ਕੇ ਪਿਆਰੇ ॥ ਰਹਾਉ ॥',
    'ਆਇ ਮਿਲੁ ਗੁਰਸਿਖ. ਆਇ ਮਿਲੁ; ਤੂ ਮੇਰੇ ਗੁਰੂ ਕੇ ਪਿਆਰੇ',
  ],
  [ 'ਜਹਾ ਤੇ ਉਪਜਿਆ; ਫਿਰਿ ਤਹਾ ਸਮਾਵੈ ।੪੯।੧। ਇਕੁ ।', 'ਜਹਾ ਤੇ ਉਪਜਿਆ; ਫਿਰਿ ਤਹਾ ਸਮਾਵੈ' ],
  [
    'ਇਸੁ ਬੰਦੇ ਸਿਰਿ ਜੁਲਮੁ ਹੋਤ ਹੈ; ਜਮੁ. ਨਹੀ ਹਟੈ ਗੁਸਾਈ ॥੪॥੯॥ ਦੁਤੁਕੇ',
    'ਇਸੁ ਬੰਦੇ ਸਿਰਿ ਜੁਲਮੁ ਹੋਤ ਹੈ; ਜਮੁ. ਨਹੀ ਹਟੈ ਗੁਸਾਈ',
  ],
  [
    'ਨਾਨਕ. ਮਨਿ ਤਨਿ ਚਾਉ ਏਹੁ; ਨਿਤ ਪ੍ਰਭ ਕਉ ਲੋੜੇ ॥੨੧॥੧॥ ਸੁਧੁ ਕੀਚੇ',
    'ਨਾਨਕ. ਮਨਿ ਤਨਿ ਚਾਉ ਏਹੁ; ਨਿਤ ਪ੍ਰਭ ਕਉ ਲੋੜੇ',
  ],
  [
    'ਤਿਸੀ ਪ੍ਰਕਾਰ ਹੀ ਗੁਰੂ ਸੇਵਾ ਤਥਾ ਨਾਮ ਵਿਖੇ ਪਿੰਡ ਸਰੀਰ ਦੇ ਪਰਚੇ ਬਿਨਾਂ ਜੋ ਸਿੱਖਾਂ ਦੀ ਭਿਛ੍ਯਾ ਖਾਵੇ ਅਰਥਾਤ ਓਨਾਂ ਦੀ ਕਾਰ ਭੇਟ ਦਾ ਆਯਾ ਪਦਾਰਥ ਖਾਏ ਤਾਂ ਅੰਤ ਕਾਲ ਨੂੰ ਔਕੜ ਹੋਯਾ ਕਰਦੀ ਹੈ, ਤੇ ਜਮ ਲੋਕ ਨਰਕ ਨੂੰ ਜਾਣਾ ਪੈਂਦਾ ਹੈ ॥੫੧੭॥ ਪੜ੍ਹੋ ਵੀਚਾਰ ਕਬਿੱਤ ੫੦੬',
    'ਤਿਸੀ ਪ੍ਰਕਾਰ ਹੀ ਗੁਰੂ ਸੇਵਾ ਤਥਾ ਨਾਮ ਵਿਖੇ ਪਿੰਡ ਸਰੀਰ ਦੇ ਪਰਚੇ ਬਿਨਾਂ ਜੋ ਸਿੱਖਾਂ ਦੀ ਭਿਛ੍ਯਾ ਖਾਵੇ ਅਰਥਾਤ ਓਨਾਂ ਦੀ ਕਾਰ ਭੇਟ ਦਾ ਆਯਾ ਪਦਾਰਥ ਖਾਏ ਤਾਂ ਅੰਤ ਕਾਲ ਨੂੰ ਔਕੜ ਹੋਯਾ ਕਰਦੀ ਹੈ, ਤੇ ਜਮ ਲੋਕ ਨਰਕ ਨੂੰ ਜਾਣਾ ਪੈਂਦਾ ਹੈ',
  ],
  [
    'ਸ੍ਰੀ ਗੁਰੂ ਜੀ ਕਹਤੇ ਹੈਂ: ਜੋ ਰਾਤ ਦਿਨ ਨਾਮ ਜਪਤੇ ਹੈਂ ਐਸੇ ਗੁਰੋਂ ਕੇ ਮੁਖ ਸੇ ਵਾਹੁ ਵਾਹੁ ਬਾਣੀ ਪ੍ਰਾਪਤ ਹੋਤੀ ਹੈ॥੧॥',
    'ਸ੍ਰੀ ਗੁਰੂ ਜੀ ਕਹਤੇ ਹੈਂ: ਜੋ ਰਾਤ ਦਿਨ ਨਾਮ ਜਪਤੇ ਹੈਂ ਐਸੇ ਗੁਰੋਂ ਕੇ ਮੁਖ ਸੇ ਵਾਹੁ ਵਾਹੁ ਬਾਣੀ ਪ੍ਰਾਪਤ ਹੋਤੀ ਹੈ',
  ],
  [
    'ਹੇ ਨਾਨਕ! ਜੋ ਮਨੁੱਖ ਗੁਰੂ ਦੇ ਹੁਕਮ ਵਿਚ ਤੁਰਦਾ ਹੈ ਉਸ ਨੂੰ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਦੀ ਦਾਤ ਮਿਲਦੀ ਹੈ, ਉਹ ਹਰ ਵੇਲੇ ਪ੍ਰਭੂ ਦਾ ਨਾਮ ਜਪਦਾ ਹੈ ॥੧॥',
    'ਹੇ ਨਾਨਕ! ਜੋ ਮਨੁੱਖ ਗੁਰੂ ਦੇ ਹੁਕਮ ਵਿਚ ਤੁਰਦਾ ਹੈ ਉਸ ਨੂੰ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਦੀ ਦਾਤ ਮਿਲਦੀ ਹੈ, ਉਹ ਹਰ ਵੇਲੇ ਪ੍ਰਭੂ ਦਾ ਨਾਮ ਜਪਦਾ ਹੈ',
  ],
  [
    'ਸ੍ਰੀ ਗੁਰੂ ਜੀ ਕਹਤੇ ਹੈਂ: ਸੋ ਹਰਿ ਨਾਮ ਕਾ ਜੋ ਰਾਤ ਦਿਨ ਭਜਨ ਕਰਤਾ ਹੈ ਤਿਸ ਕੇ ਸਭ ਕਾਮ ਸਫਲ ਹੋਤੇ ਹੈਂ ਅਰਥਾਤ ਪੂਰਨ ਕਾਮ ਹੋਤਾ ਹੈ॥੨੦',
    'ਸ੍ਰੀ ਗੁਰੂ ਜੀ ਕਹਤੇ ਹੈਂ: ਸੋ ਹਰਿ ਨਾਮ ਕਾ ਜੋ ਰਾਤ ਦਿਨ ਭਜਨ ਕਰਤਾ ਹੈ ਤਿਸ ਕੇ ਸਭ ਕਾਮ ਸਫਲ ਹੋਤੇ ਹੈਂ ਅਰਥਾਤ ਪੂਰਨ ਕਾਮ ਹੋਤਾ ਹੈ',
  ],
  [ '॥ ਜਪੁ ॥', 'ਜਪੁ' ],
  [ 'ਸੋ ਦਰੁ ਰਾਗੁ ਆਸਾ ਮਹਲਾ ੧', 'ਸੋ ਦਰੁ ਰਾਗੁ ਆਸਾ ਮਹਲਾ' ],
  [
    'ਸੂਰਜੁ; ਏਕੋ ਰੁਤਿ ਅਨੇਕ ॥ ਨਾਨਕ ਕਰਤੇ ਕੇ ਕੇਤੇ ਵੇਸ ॥੨॥੨॥',
    'ਸੂਰਜੁ; ਏਕੋ ਰੁਤਿ ਅਨੇਕ ਨਾਨਕ ਕਰਤੇ ਕੇ ਕੇਤੇ ਵੇਸ',
  ],
  [
    'ਭਇਓ ਕ੍ਰਿਪਾਲੁ. ਦੀਨ ਦੁਖ ਭੰਜਨੁ; ਹਰਿ ਹਰਿ ਕੀਰਤਨਿ ਇਹੁ ਮਨੁ ਰਾਤਾ ॥ ਰਹਾਉ ਦੂਜਾ ॥੧॥੩॥',
    'ਭਇਓ ਕ੍ਰਿਪਾਲੁ. ਦੀਨ ਦੁਖ ਭੰਜਨੁ; ਹਰਿ ਹਰਿ ਕੀਰਤਨਿ ਇਹੁ ਮਨੁ ਰਾਤਾ',
  ],
  [ 'ਕਿ ਹਰ ਹਸ਼ਤੋ ਸ਼ਸਤ ਆਮਦਾ ਚਾਕਰਸ਼ ।੧੪੮।', 'ਕਿ ਹਰ ਹਸ਼ਤੋ ਸ਼ਸਤ ਆਮਦਾ ਚਾਕਰਸ਼' ],
]

const asciiPassages = gurmukhiPassages.map( ( [ input, output ] ) => [
  toAscii( input ),
  toAscii( output ),
] )

const translationPassages = [
  [
    'True Here And Now. O Nanak, Forever And Ever True. ||1||',
    'True Here And Now. O Nanak, Forever And Ever True.',
  ],
  [
    "By Guru's Grace, the supreme status is obtained, and the dry wood blossoms forth again in lush greenery. ||1||Pause||",
    "By Guru's Grace, the supreme status is obtained, and the dry wood blossoms forth again in lush greenery.",
  ],
  [
    'He puts on various ornaments and many decorations, but it is like dressing a corpse. ||Pause||',
    'He puts on various ornaments and many decorations, but it is like dressing a corpse.',
  ],
  [
    'Servant Nanak is devoted, dedicated, forever a sacrifice to You, Lord. Your Expanse has no limit, no boundary. ||4||5||',
    'Servant Nanak is devoted, dedicated, forever a sacrifice to You, Lord. Your Expanse has no limit, no boundary.',
  ],
  [
    'lifts him to the divine level of supreme consciousness. (103',
    'lifts him to the divine level of supreme consciousness.',
  ],
  [
    'What is the purpose of my life (it became worthless) without your reminiscence.(1) (3)',
    'What is the purpose of my life (it became worthless) without your reminiscence.',
  ],
  [
    'Just one of his (blessed) looks, that prolongs life instantly, is enough for me." (2) (2)\nSometimes, he acts like a mystic, sometimes like a meditator, and other times like a carefree recluse;\nHe is our pilot steering our way; he operates in numerous different postures. (2) (3)',
    'Just one of his (blessed) looks, that prolongs life instantly, is enough for me."\nSometimes, he acts like a mystic, sometimes like a meditator, and other times like a carefree recluse;\nHe is our pilot steering our way; he operates in numerous different postures.',
  ],
  [ 'always I live within the Khalsa. 519', 'always I live within the Khalsa.' ],
  [
    'Salutation to Thee O Abodeless Lord! 5',
    'Salutation to Thee O Abodeless Lord!',
  ],
  [
    'Thy Virtues like Generosity are countless.91',
    'Thy Virtues like Generosity are countless.',
  ],
  [ 'It was Bikrami Samvat 1753', 'It was Bikrami Samvat' ],
  [
    'He also forgot the unmanifested Brahmin and said this583',
    'He also forgot the unmanifested Brahmin and said this',
  ],
  [
    'Somewhere Thou art manifesting the mode of Tamas in a kingly mood!  16. 106',
    'Somewhere Thou art manifesting the mode of Tamas in a kingly mood!',
  ],
  [
    'He is Without blemish and stain and be visualised as consisting of Indestructible Glory .16.176',
    'He is Without blemish and stain and be visualised as consisting of Indestructible Glory .',
  ],
  [
    'He is the Sustainer of all the beings and creatures!9. 239',
    'He is the Sustainer of all the beings and creatures!',
  ],
  [ 'Thee as the Abode of Dharma.2.254', 'Thee as the Abode of Dharma.' ],
  [
    'He said to the warriors fighting near him,1069',
    'He said to the warriors fighting near him,',
  ],
  [
    'Through 8.4 million incarnations you have wandered',
    'Through 8.4 million incarnations you have wandered',
  ],
  [
    'Noche y día oh, dice Nanak, quien medite y vibre en el Nombre del Señor, ve cómo todos sus esfuerzos dan fruto. (20)',
    'Noche y día oh, dice Nanak, quien medite y vibre en el Nombre del Señor, ve cómo todos sus esfuerzos dan fruto.',
  ],
  [
    'A tal ser el Señor lo encuentra y nunca más lo abandona, ya que lo inmerge en Su Paz Maravillosa.  ()1',
    'A tal ser el Señor lo encuentra y nunca más lo abandona, ya que lo inmerge en Su Paz Maravillosa.',
  ],
  [
    'Misteriosa es la manera de los verdaderos Discípulos, porque no solamente escuchan la Instrucción del Guru, sino que se encuentran totalmente sobrellevados por ella. 25',
    'Misteriosa es la manera de los verdaderos Discípulos, porque no solamente escuchan la Instrucción del Guru, sino que se encuentran totalmente sobrellevados por ella.',
  ],
  [
    'El mundo ha nacido para morir y es siempre destruido, una, otra, y otra vez; solamente uno se vuelve Eterno aferrándose a los Pies del Guru. (4‑6‑13',
    'El mundo ha nacido para morir y es siempre destruido, una, otra, y otra vez; solamente uno se vuelve Eterno aferrándose a los Pies del Guru.',
  ],
  [
    'Toda la Maya es Tu Deleite. Nanak, Tu Esclavo, ofrece su ser en sacrificio a Ti. (4-2-9)',
    'Toda la Maya es Tu Deleite. Nanak, Tu Esclavo, ofrece su ser en sacrificio a Ti.',
  ],
  [
    'ese hombre ha recibido la Aprobación de Dios.  (4-40-47)',
    'ese hombre ha recibido la Aprobación de Dios.',
  ],
  [
    'स्री गुरू जी कहते हैं: जो रात दिन नाम जपते हैं ऐसे गुरों के मुख से वाहु वाहु बाणी प्रापत होती है॥१॥',
    'स्री गुरू जी कहते हैं: जो रात दिन नाम जपते हैं ऐसे गुरों के मुख से वाहु वाहु बाणी प्रापत होती है',
  ],
  [
    'नानक. मनि तनि चाउ एहु; नित प्रभ कउ लोड़े ॥२१॥१॥ सुधु कीचे',
    'नानक. मनि तनि चाउ एहु; नित प्रभ कउ लोड़े',
  ],
]

const passages = [ ...gurmukhiPassages, ...asciiPassages, ...translationPassages ]

describe( 'stripEndings()', () => {
  passages.map( ( [ line, result ] ) => it( `should transform '${line}' to '${result}'`, () => {
    expect( stripEndings( line ) ).toBe( result )
  } ) )
} )
