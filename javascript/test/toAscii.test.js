import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import toAscii from '../build/toAscii.js'

const test = suite('toAscii')

for (const [key, value] of Object.entries({
  '੧੨੩': '123',
  'ੴ ☬ ੴ': '<> Ç <>',
  ਗੁਰੂ: 'gurU',
})) {
  test(`toAscii(${key}) is ${value}`, () => {
    assert.is(toAscii(key), value)
  })
}

for (const [key, value] of Object.entries({
  ਕ੍ਰਾਂ: 'k®W',
  ਸ੍ਵਾਂਤਿ: 'sÍWiq',
  ਭ੍ਰਿੰਗ: 'iBRMg',
  ਨ੍ਰਿੱਤੇ: 'inR`qy',
  ਕ੍ਰਿੱਸੰ: 'ik®`sM',
  ਅੰਮ੍ਰਿੱਤ: 'AMimR`q',
  ਥਾਨੵਿੰ: 'Qwin´µ',
  ਕ੍ਰਾਂਤ: 'k®Wq',
  ਕ੍ਰੁੱਧ: 'k®ü`D',
  ਜਿਨ੍ਹੈਂ: 'ijnHYN',
  ਹ੍ਵੈੁਬੋ: 'hÍYübo',
  ਨੂੰ: 'ƒ',
  ਖ਼ੁੱਦ: '^u`d',
  ਫਜ਼ੂੰ: 'PzUM',
  'ਕਾਰਮੁੱਲ-ਕੱਰਾਮ': 'kwrmu`l-k`rwm',
  ਫ਼ਰੁੱਖ਼ੇ: '&ru`^y',
  ਖ਼ੁੱਰੋ: '^u`ro',
  ਦੋੁਆਲੈ: 'douAwlY',
  ਦ੍ਰਿੜੑੀਆ: 'idRV@IAw',
  ਕਾਨੑੁ: 'kwn@ü',
  ਜਿੰਨੑੀ: 'ijMn@I',
  ਓਲੑਾ: 'El@w',
  ਸਾਮੑੈ: 'swm@Y',
  ਕਤੇਬਹੁਂ: 'kqybhuˆ',
})) {
  test(`diacritics ${key} is ${value}`, () => {
    assert.is(toAscii(key), value)
  })
}

for (const [key, value] of Object.entries({
  'ਭੁਖਿਆ.': 'BuiKAw.',
})) {
  test(`sihari ${key} is ${value}`, () => {
    assert.is(toAscii(key), value)
  })
}

for (const [key, value] of Object.entries({
  ਥਿਤੀੰ: 'iQqµØI',
  ਕੀੰ: 'kµØI',
  ਨੀੰਬੁ: 'nµØIbu',
  ਨੀੰਬਾ: 'nµØIbw',
  ਦੇਂਹਿ: 'dyNih',
  ਗੁਣੀਁ: 'guxˆØI',
  ਸਖੀਁ: 'sKˆØI',
})) {
  test(`nasalization ${key} is ${value}`, () => {
    assert.is(toAscii(key), value)
  })
}

for (const [key, value] of Object.entries({
  ਧ੍ਰੂਅ: 'DR¨A',
  ਆਲਿਸ੍ਯ: 'AwilsÎ',
  ਦਾਨਿ: 'dwin',
  ਭੀਤਰਿ: 'BIqir',
  ਜੀਉ: 'jIau',
  '।੧।੨।੩।੪।੫।': '[1[2[3[4[5[',
  '॥੧॥੨॥੩॥੪॥੫॥': ']1]2]3]4]5]',
  ਸਉਡਿਸਇਸ: 'sauifsies',
  ਜ਼ੱਰਰਾ: 'z`rrw',
  ਖ਼ੁਰਸ਼ੈਦ: '^urSYd',
  ਲੁਤਫ਼ਿ: 'luqi&',
  ਇਕੰਤ੍ਰ: 'iekMqR',
  ਪ੍ਰਭੂ: 'pRBU',
})) {
  test(`ascii conversions ${key} is ${value}`, () => {
    assert.is(toAscii(key), value)
  })
}

for (const [key, value] of Object.entries({
  ਸ੍ਰਿਸ੍ਟਿ: 'isRis†',
  ਕ੍ਰਿਸ੍ਨੰ: 'ik®s˜M',
  ਦਸ੍ਤਗੀਰੀ: 'dsœgIrI',
  ਨਿਸ੍ਚਲ: 'insçl',
  ਸ੍ਵਾਦ: 'sÍwd',
  ਸੁਧਾਖੵਰ: 'suDwK´r',
  ਚੜ੍ਹੂ: 'cV§',
  ਮੵਿਾਨੇ: 'im´wny',
  ਧੵਿਾਵੈ: 'iD´wvY',
  ਦ੍ਵਿਜ: 'idÍj',
  ਭਿਖੵਾ: 'iBK´w',
  ਮਿਥੵੰਤ: 'imQ´Mq',
  ਰਖੵਾ: 'rK´w',
  ਸੰਸਾਰਸੵ: 'sMswrs´',
})) {
  test(`ascii subscripts ${key} is ${value}`, () => {
    assert.is(toAscii(key), value)
  })
}

for (const [key, value] of Object.entries({
  // Yayya
  ਯਕੀਂ: 'XkIN',
  ਪ੍ਰਿਯ: 'ipRX',
  ਹਯਾੱਤਿ: 'hXw`iq',
  ਹਮਾਯੂੰ: 'hmwXUM',
  ਭਯੋੁ: 'BXou',
  ਯਕੀਨ: 'XkIn',
  // Half-Y (open-left)
  'ਮਧ꠳ਯ': 'mDÎ',
  'ਲਿਖ꠳ਯਤੇ': 'ilKÎqy',
  'ਮਾਨ꠳ਯੋ': 'mwnÎo',
  'ਭਿ꠳ਯੋ': 'iBÎo',
  'ਕੀ꠳ਯੋ': 'kIÎo',
  'ਸ꠳ਯਾਮ': 'sÎwm',
  'ਤ꠳ਯਾਗ꠳ਯੋ': 'qÎwgÎo',
  'ਜ꠳ਯੋਂ': 'jÎoN',
  // Open-top Yayya
  'ਨਾਮ꠴ਯ': 'nwmï',
  'ਸੁਨੀ꠴ਯਹੁ': 'sunIïhu',
  'ਅਦੇ꠴ਯੰ': 'AdyïM',
  'ਕਢ꠴ਯੋ': 'kFïo',
  'ਸ꠴ਯਾਮ': 'sïwm',
  // Open-top Half-Y
  'ਦਿਤ꠴ਯਾਦਿਤ꠵ਯ': 'idqïwidqî',
  'ਤ੍ਰਸ꠵ਯੋ': 'qRsîo',
})) {
  test(`yayya ${key} is ${value}`, () => {
    assert.is(toAscii(key), value)
  })
}

;['ਰਾੈ', 'ਰਾਾ', 'ਰੁੂ'].forEach((e) => {
  test(`bad vowel sequences - ${e}`, () => {
    assert.throws(() => {
      toAscii(e)
    })
  })
})

test.run()
