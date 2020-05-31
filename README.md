<!-- Do not modify README.md, instead modify README.hbs -->

# gurmukhi-utils

> General utilities for working with Gurmukhi text data.

[![CircleCI](https://img.shields.io/circleci/project/github/ShabadOS/gurmukhi-utils.svg?style=for-the-badge)](https://circleci.com/gh/ShabadOS/gurmukhi-utils)
[![Coveralls github](https://img.shields.io/coveralls/github/ShabadOS/gurmukhi-utils.svg?style=for-the-badge)](https://coveralls.io/github/ShabadOS/gurmukhi-utils)
[![npm](https://img.shields.io/npm/v/gurmukhi-utils.svg?style=for-the-badge)](https://www.npmjs.com/package/gurmukhi-utils)
[![license](https://img.shields.io/github/license/ShabadOS/gurmukhi-utils.svg?style=for-the-badge)](./License)
[![Try on RunKit](https://img.shields.io/badge/Try%20on%20RunKit-Playground-brightgreen.svg?style=for-the-badge)](https://npm.runkit.com/gurmukhi-utils)


Want to speak with us? <p>[![Slack](https://slack.shabados.com/badge.svg)](https://slack.shabados.com)</p>

## Contents

<!-- toc -->

- [Usage](#usage)
- [API](#api)
  * [firstLetters(line, [stripNukta], [withVishraams]) ⇒ String](#firstlettersline-stripnukta-withvishraams-%E2%87%92-string)
  * [isGurmukhi(text, [exhaustive]) ⇒ boolean](#isgurmukhitext-exhaustive-%E2%87%92-boolean)
  * [stripAccents(text) ⇒ String](#stripaccentstext-%E2%87%92-string)
  * [stripVishraams(text, options) ⇒ String](#stripvishraamstext-options-%E2%87%92-string)
  * [toAscii(text) ⇒ String](#toasciitext-%E2%87%92-string)
  * [toEnglish(line) ⇒ String](#toenglishline-%E2%87%92-string)
  * [toHindi(text) ⇒ String](#tohinditext-%E2%87%92-string)
  * [toShahmukhi(text) ⇒ String](#toshahmukhitext-%E2%87%92-string)
  * [toUnicode(text) ⇒ String](#tounicodetext-%E2%87%92-string)
- [Contributing](#contributing)

<!-- tocstop -->

## Usage

The library can be imported into Node as below:
```javascript
const {
  toUnicode,
  toAscii,
  firstLetters,
  toEnglish,
  toHindi,
  toShahmukhi,
  stripAccents,
  stripVishraams,
  isGurmukhi,
} = require( 'gurmukhi-utils' )

toUnicode('Koj')    // => ਖੋਜ
toAscii('ਖੋਜ')      // => Koj
firstLetters('hir hir hir gunI')  // => hhhg
firstLetters('ਹਰਿ ਹਰਿ ਹਰਿ ਗੁਨੀ')   // => ਹਹਹਗ
toEnglish('hukmI hukmu clwey rwhu ]')  // => hukamee hukam chalaae raahu ||
toHindi('ਕੁਲ ਜਨ ਮਧੇ ਮਿਲੵੋਿ ਸਾਰਗ ਪਾਨ ਰੇ ॥')    // => कुल जन मधे मिल्यो सारग पान रे ॥
toShahmukhi('ਹਰਿ ਹਰਿ ਹਰਿ ਗੁਨੀ') // => هر هر هر گُنی
stripAccents('ਜ਼ਫ਼ੈਸ਼ਸ') // => ਜਫੈਸਸ
stripVishraams('sbid mrY. so mir rhY; iPir.') // => sbid mrY so mir rhY iPir
isGurmukhi('ਗੁਰਮੁਖੀ') // t=> true
```

Additionally, the package is available for web use via [unpkg CDN](https://unpkg.com/gurmukhi-utils).
```
<script src="https://unpkg.com/gurmukhi-utils"></script>
```

Want to play around? [![Try gurmukhi-utils on RunKit](https://badge.runkitcdn.com/gurmukhi-utils.svg)](https://npm.runkit.com/gurmukhi-utils)


## API

### firstLetters(line, [stripNukta], [withVishraams]) ⇒ <code>String</code>
Generates the first letters for a given ASCII or unicode Gurmukhi string.By default, the function will transform letters with bindi to their simple equivalent,for example, zaza to jaja (ਜ਼ => ਜ).

**Returns**: <code>String</code> - The first letters of each word in the provided Gurmukhi line.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| line | <code>String</code> |  | The line to generate the first letters for. |
| [stripNukta] | <code>Boolean</code> | <code>true</code> | If `true`, replaces letters pair bindi (such as ਜ਼) with their equivalent without the bindi (ਜ). Also replaces open oora with closed oora. |
| [withVishraams] | <code>Boolean</code> | <code>false</code> | Keeps the vishraam characters at the end of each word. |

**Example** *(Unicode first letters no pair bindi/nukta)*  
```js
firstLetters('ਗ਼ੈਰਿ ਹਮਦਿ ਹੱਕ ਨਿਆਇਦ ਬਰ ਜ਼ਬਾਨਮ ਹੀਚ ਗਾਹ') // => ਗਹਹਨਬਜਹਗ
```
**Example** *(Unicode first letters with pair bindi/nukta)*  
```js
firstLetters('ਗ਼ੈਰਿ ਹਮਦਿ ਹੱਕ ਨਿਆਇਦ ਬਰ ਜ਼ਬਾਨਮ ਹੀਚ ਗਾਹ', false) // => ਗ਼ਹਹਨਬਜ਼ਹਗ
```
**Example** *(Unicode first letters with vishraams)*  
```js
firstLetters('ਸਬਦਿ ਮਰੈ. ਸੋ ਮਰਿ ਰਹੈ; ਫਿਰਿ. ਮਰੈ ਨ, ਦੂਜੀ ਵਾਰ ॥', true, true) // => ਸਮ.ਸਮਰ;ਫ.ਮਨ,ਦਵ
```
**Example** *(ASCII first letters no pair bindi/nukta)*  
```js
firstLetters('ijs no ik®pw krih iqin nwmu rqnu pwieAw ]') // => jnkkqnrp
firstLetters('iZir&qym sMdUk drIXw AmIk ]') // => gsdA
```
**Example** *(ASCII first letters with pair bindi/nukta)*  
```js
firstLetters('iZir&qym sMdUk* drIXw AmIk* ]', false) // => Zsda
```
**Example** *(ASCII first letters with vishraams)*  
```js
firstLetters('sbid mrY. so mir rhY; iPir. mrY n, dUjI vwr ]', true, true) // => sm.smr;P.mn,dv
```
### isGurmukhi(text, [exhaustive]) ⇒ <code>boolean</code>
Checks if first char in string is part of the Gurmukhi Unicode block.

**Returns**: <code>boolean</code> - True if Unicode Gurmukhi, false if other.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | The text to check. |
| [exhaustive] | <code>boolean</code> | If `true`, checks if the whole string is Unicode Gurmukhi. |

**Example**  
```js
isGurmukhi('ਗੁਰਮੁਖੀ') // => trueisGurmukhi('gurmuKI') // => false
```
### stripAccents(text) ⇒ <code>String</code>
Removes accents from ASCII/Unicode Gumrukhi letters with their base letter.Useful for generalising search queries.

**Returns**: <code>String</code> - A simplified version of the provided Gurmukhi string.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | The text to convert. |

**Example**  
```js
stripAccents('ਜ਼ਫ਼ੈਸ਼ਸਓ') // => ਜਫੈਸਸੳstripAccents('Z^Svb') // => gKsvb
```
### stripVishraams(text, options) ⇒ <code>String</code>
Removes the specified vishraams from a string.

**Returns**: <code>String</code> - A vishraam-less Gurmukhi string.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | The text to remove vishraams from. |
| options | <code>Object</code> | The vishraams to remove. Defaults to all. |

**Example** *(Text only, default options)*  
```js
stripVishraams('ਸਬਦਿ ਮਰੈ. ਸੋ ਮਰਿ ਰਹੈ;') // => 'ਸਬਦਿ ਮਰੈ ਸੋ ਮਰਿ ਰਹੈ
stripVishraams('sbid mrY. so mir rhY; iPir.') // => sbid mrY so mir rhY iPir
```
**Example** *(Heavy vishraams only)*  
```js
stripVishraams('sbid mrY. so mir rhY; iPir.', { heavy: true }) // => sbid mrY. so mir rhY iPir.
```
**Example** *(Medium vishrams only)*  
```js
stripVishraams('Anhd sbd vjwey,', { medium: true }) // => Anhd sbd vjwey
```
**Example** *(Light vishrams only)*  
```js
stripVishraams('sbid mrY. so mir rhY; iPir.', { light: true }) // => sbid mrY so mir rhY; iPir
```
### toAscii(text) ⇒ <code>String</code>
Converts Gurmukhi unicode text to ASCII, used GurmukhiAkhar font.

**Returns**: <code>String</code> - An ASCII representation of the provided unicode Gurmukhi string.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | The unicode text to convert. |

**Example**  
```js
toAscii('ਹਮਾ ਸਾਇਲਿ ਲੁਤਫ਼ਿ ਹਕ ਪਰਵਰਸ਼ ॥') // => hmw swieil luqi& hk prvrS ]toAscii('ਸੁ ਬੈਠਿ ਇਕੰਤ੍ਰ ॥੫੭੮॥') // => su bYiT iekMqR ]578]
```
### toEnglish(line) ⇒ <code>String</code>
Transliterates a line from Unicode Gurmukhi to english.Currently supports the `,`, `;`, `.` vishraam characters.

**Returns**: <code>String</code> - The English transliteration of the provided Gurmukhi line.  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>String</code> | The Gurmukhi Unicode line to transliterate. |

**Example**  
```js
toEnglish('ਹੁਕਮੀ ਹੁਕਮੁ ਚਲਾਏ ਰਾਹੁ ॥') // => hukamee hukam chalaae raahu ||
```
**Example**  
```js
toEnglish('ਭਾਂਡਾ ਭਾਉ ਅੰਮ੍ਰਿਤੁ ਤਿਤੁ ਢਾਲਿ ॥') // => bhaa(n)ddaa bhaou anmrit tit dtaal ||
```
### toHindi(text) ⇒ <code>String</code>
Transliterates Unicode Gurmukhi text to Hindi (Devanagari script).

**Returns**: <code>String</code> - A Hindi transliteration of the provided Unicode Gurmukhi string.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | The Unicode Gurmukhi text to convert. |

**Example**  
```js
toHindi('ਕੁਲ ਜਨ ਮਧੇ ਮਿਲੵੋਿ ਸਾਰਗ ਪਾਨ ਰੇ ॥') // => कुल जन मधे मिल्यो सारग पान रे ॥toHindi('ਸੁ ਬੈਠਿ ਇਕੰਤ੍ਰ ॥੫੭੮॥') // => सु बैठ इकंत्र ॥५७८॥
```
### toShahmukhi(text) ⇒ <code>String</code>
Transliterates Unicode Gurmukhi text to the Shahmukhi script.

**Returns**: <code>String</code> - A Shahmukhi transliteration of the provided Unicode Gurmukhi string.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | The Unicode Gurmukhi text to convert. |

**Example**  
```js
toShahmukhi('ਹਮਾ ਸਾਇਲਿ ਲੁਤਫ਼ਿ ਹਕ ਪਰਵਰਸ਼ ॥') // => هما ساِال لُتف هک پرورش ۔۔toShahmukhi('ਸੁ ਬੈਠਿ ਇਕੰਤ੍ਰ ॥੫੭੮॥') // => سُ بَےٹھ ِاکںتر ۔۔۵۷۸۔۔
```
### toUnicode(text) ⇒ <code>String</code>
Converts ASCII text used in the GurmukhiAkhar font to Unicode.

**Returns**: <code>String</code> - A unicode representation of the provided ASCII Gurmukhi string.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | The ASCII text to convert. |

**Example**  
```js
toUnicode('kul jn mDy imil´o swrg pwn ry ]') // => ਕੁਲ ਜਨ ਮਧੇ ਮਿਲੵੋਿ ਸਾਰਗ ਪਾਨ ਰੇ ॥toUnicode('su bYiT iekMqR ]578]') // => ਸੁ ਬੈਠਿ ਇਕੰਤ੍ਰ ॥੫੭੮॥
```

## Contributing

We're happy to accept suggestions and pull requests!

To get started, clone this repo and run `npm install` inside this directory. 

This repository follows the **Airbnb's Javascript Style Guide**, with a few minor modifications. Notably, spaces should be included inside parentheses and brackets (weird, right!). An ESLint file is provided,
and your code will automatically be checked on-commit for style.
It is recommended to install an ESLint plugin for your editor (VS Code's `ESLint` plugin works out of the box), so you can receive
linter suggestions as you type.

When writing commit messages, please follow the **[seven rules](https://chris.beams.io/posts/git-commit/#seven-rules)**. 
Markdown and HTML JSDoc documentation is generated automatically, on commit,
however if you'd like to preview any changes to documentation, `npm run build-docs` will
update `README.md` and the files in `docs/`. `README.md` should *not* be edited, instead
apply modifications to `README.hbs`.

The general workflow for contributing:

- Fork/create a new branch.
- Write or update existing tests with expected results
- Implement functions/changes
- Add JSDoc function documentation and examples.
- Run tests with `npm test` and ensure they all pass. Testing is done with the `mocha` testing framework.
- Create a pull request with the changes.

*Note to contributors with push access to master:* Any commits or merge commits containing the strings 
`#Major`, `#Minor`, `#Patch` (case-sensitive) will trigger an automatic npm release with the
respective semver bump.
