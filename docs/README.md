<!-- Do not modify README.md, instead modify README.hbs -->

# gurmukhi-utils

General utilities for working with Gurmukhi text data.

[![CircleCI](https://img.shields.io/circleci/project/github/ShabadOS/gurmukhi-utils.svg?style=for-the-badge)](https://circleci.com/gh/ShabadOS/gurmukhi-utils)
[![npm](https://img.shields.io/npm/v/gurmukhi-utils.svg?style=for-the-badge)](https://www.npmjs.com/package/@shabados/gurmukhi-utils)
[![license](https://img.shields.io/github/license/ShabadOS/gurmukhi-utils.svg?style=for-the-badge)](./License)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)


Want to speak with us? <p>[![Slack](https://slack.shabados.com/badge.svg)](https://slack.shabados.com)</p>

## Contents

<!-- toc -->

- [Usage](#usage)
- [API](#api)
  * [firstLetters(line, [stripNukta]) ⇒ String](#firstlettersline-stripnukta-%E2%87%92-string)
  * [toUnicode(text) ⇒ String](#tounicodetext-%E2%87%92-string)
  * [transliterate(line) ⇒ String](#transliterateline-%E2%87%92-string)
- [Contributing](#contributing)
- [Future](#future)

<!-- tocstop -->

## Usage

The library can be imported into Node as below:
```javascript
const { toUnicode, firstLetters, transliterate } = require('gurmukhi-utils')

toUnicode('Koj')    // => ਖੋਜ
firstLetters('hir hir hir gunI')   // => hhhg
firstLetters('ਹਰਿ ਹਰਿ ਹਰਿ ਗੁਨੀ')      // => ਹਹਹਗ
transliterate('hukmI hukmu clwey rwhu ]')  // => hukamee hukam chalaae raahu ||
```

Additionally, the package is available for web use via [unpkg CDN](https://unpkg.com/gurmukhi-utils).
```
<script src="https://unpkg.com/gurmukhi-utils"></script>
```

## API

### firstLetters(line, [stripNukta]) ⇒ <code>String</code>
Generates the first letters for a given ASCII or unicode Gurmukhi string.
By default, the function will transform letters with bindi to their simple equivalent,
for example, zaza to jaja (ਜ਼ => ਜ).

**Returns**: <code>String</code> - The first letters of each word in the provided Gurmukhi line.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| line | <code>String</code> |  | The line to generate the first letters for. |
| [stripNukta] | <code>Boolean</code> | <code>true</code> | If `true`, replaces letters pair bindi (such as ਜ਼) with their equivalent without the bindi (ਜ). Also replaces open oora with closed oora. |

**Example** *(Unicode first letters no pair bindi/nukta)*  
```js
firstLetters('ਗ਼ੈਰਿ ਹਮਦਿ ਹੱਕ ਨਿਆਇਦ ਬਰ ਜ਼ਬਾਨਮ ਹੀਚ ਗਾਹ') // => ਗਹਹਨਬਜਹਗ
```
**Example** *(Unicode first letters with pair bindi/nukta)*  
```js
firstLetters('ਗ਼ੈਰਿ ਹਮਦਿ ਹੱਕ ਨਿਆਇਦ ਬਰ ਜ਼ਬਾਨਮ ਹੀਚ ਗਾਹ', false) // => ਗ਼ਹਹਨਬਜ਼ਹਗ
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
### toUnicode(text) ⇒ <code>String</code>
Converts ASCII text used in the GurmukhiAkhar font to Unicode.

**Returns**: <code>String</code> - A unicode representation of the provided ASCII Gurmukhi string.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | The ASCII text to convert. |

**Example**  
```js
toUnicode('kul jn mDy imil´o swrg pwn ry ]') // => ਕੁਲ ਜਨ ਮਧੇ ਮਿਲੵੋਿ ਸਾਰਗ ਪਾਨ ਰੇ ॥
toUnicode('su bYiT iekMqR ]578]') // => ਸੁ ਬੈਠਿ ਇਕੰਤ੍ਰ ॥੫੭੮॥
```
### transliterate(line) ⇒ <code>String</code>
Transliterates a line from ASCII Gurmukhi to english.
Currently supports the `,`, `;`, `.` vishraam characters.

**Returns**: <code>String</code> - The English transliteration of the provided Gurmukhi line.  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>String</code> | The Gurmukhi ASCII line to transliterate. |

**Example**  
```js
transliterate('hukmI hukmu clwey rwhu ]') // => hukamee hukam chalaae raahu ||
```
**Example**  
```js
transliterate('BWfw Bwau AMimRqu iqqu Fwil ]') // => bhaa(n)ddaa bhaau anmrit tit ddaal ||
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

## Future

-   Unicode to ASCII
