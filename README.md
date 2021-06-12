<!-- Do not modify README.md, instead modify README.hbs -->

<img src="https://raw.githubusercontent.com/shabados/presenter/dev/resources/icon.png" width="128" alt="Shabad OS">

<h1>Gurmukhi Utils</h1>

General utilities for working with Gurmukhi text data. [Try `gurmukhi-utils` in your browser.][runkit-url]

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Release][release-image]][release-url]
[![Next Release][next-image]][next-url]
[![Test Coverage][coveralls-image]][coveralls-url]

```javascript
const {
  toAscii,
  toUnicode,
  toEnglish,
  stripEndings
} = require( 'gurmukhi-utils' )

const unicodeGurmukhi = 'ਸੋ ਘਰੁ ਰਾਖੁ; ਵਡਾਈ ਤੋਇ ॥੧॥ ਰਹਾਉ ॥'
const asciiGurmukhi = 'so Gru rwKu; vfweI qoie ]1] rhwau ]'

toAscii( unicodeGurmukhi ) // => so Gru rwKu; vfweI qoie ]1] rhwau ]
toUnicode( asciiGurmukhi ) // => ਸੋ ਘਰੁ ਰਾਖੁ; ਵਡਾਈ ਤੋਇ ॥੧॥ ਰਹਾਉ ॥
toEnglish( asciiGurmukhi ) // => so ghar raakh; vaddaaee toie |1| rahaau |
stripEndings( toEnglish( asciiGurmukhi ) ) // => so ghar raakh; vaddaaee toie
```

**Table of Contents**

<!-- toc -->

- [Introduction](#introduction)
- [Usage](#usage)
- [3rd Party Ports](#3rd-party-ports)
- [API](#api)
  * [countSyllables(text) ⇒ number](#countsyllablestext-%E2%87%92-number)
  * [firstLetters(line) ⇒ String](#firstlettersline-%E2%87%92-string)
  * [isGurmukhi(text, [exhaustive]) ⇒ boolean](#isgurmukhitext-exhaustive-%E2%87%92-boolean)
  * [stripAccents(text) ⇒ String](#stripaccentstext-%E2%87%92-string)
  * [stripEndings(text) ⇒ String](#stripendingstext-%E2%87%92-string)
  * [stripVishraams(text, options) ⇒ String](#stripvishraamstext-options-%E2%87%92-string)
  * [toAscii(text) ⇒ String](#toasciitext-%E2%87%92-string)
  * [toEnglish(line) ⇒ String](#toenglishline-%E2%87%92-string)
  * [toHindi(text) ⇒ String](#tohinditext-%E2%87%92-string)
  * [toShahmukhi(text) ⇒ String](#toshahmukhitext-%E2%87%92-string)
  * [toSyllabicSymbols(text) ⇒ String](#tosyllabicsymbolstext-%E2%87%92-string)
  * [toUnicode(text) ⇒ String](#tounicodetext-%E2%87%92-string)
- [Community](#community)
- [Contributing](#contributing)
- [People](#people)
- [Feedback](#feedback)
- [Related Projects](#related-projects)
- [Code of Conduct](#code-of-conduct)
- [License](#license)

<!-- tocstop -->

## Introduction

Gurmukhi Utils is a library for converting, analyzing, and testing gurmukhi strings.

## Usage

Gurmukhi Utils is available as the [`gurmukhi-utils` package][npm-url] on [npm](https://www.npmjs.com/). Want to play around? [Try it out in your browser with RunKit][runkit-url]!

Additionally, the package is available for web use via [unpkg CDN](https://unpkg.com/):
```
<script src="https://unpkg.com/gurmukhi-utils"></script>
```

## 3rd Party Ports

- [onkarjit/GurmukhiUtils](https://github.com/onkarjit/GurmukhiUtils) is a rewrite of Shabad OS's gurmukhi-utils to [C#](https://en.wikipedia.org/wiki/C_Sharp_(programming_language)) for .NET applications

## API

### countSyllables(text) ⇒ <code>number</code>
Calculates the number of syllables according to Sanskrit prosody, Pingala, Matra/Meter/Morae

**Returns**: <code>number</code> - An integer adding up all the 1's (laghu/light/short) and 2's (guru/heavy/long).  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | The string to analyze |

**Example**  
```js
countSyllables( 'ਪ੍ਰਭੂ ਪ੍ਰੇਮੀ ਪੜ੍ਹ ਚੜ੍ਹ ਦ੍ਵੈਤ' )
// expected output: 14
```
### firstLetters(line) ⇒ <code>String</code>
Generates the first letters for a unicode Gurmukhi,
Hindi transliteration, or English transliteration string.
Includes any end-word vishraams, and line-end characters.

**Returns**: <code>String</code> - The first letters of each word in the provided Gurmukhi line.  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>String</code> | The line to generate the first letters for. |

**Example** *(Gurmukhi first letters)*  
```js
firstLetters('ਸਬਦਿ ਮਰੈ. ਸੋ ਮਰਿ ਰਹੈ; ਫਿਰਿ. ਮਰੈ ਨ, ਦੂਜੀ ਵਾਰ ॥') // => ਸਮ.ਸਮਰ;ਫ.ਮਨ,ਦਵ॥
```
**Example** *(Hindi first letters)*  
```js
firstLetters('गुरमुखि लाधा मनमुखि गवाइआ ॥') // => गलमग॥
```
**Example** *(English first letters)*  
```js
firstLetters('sabad marai. so mar rahai; fir. marai na, doojee vaar |') // => sm.smr;f.mn,dv|
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
isGurmukhi('ਗੁਰਮੁਖੀ') // => true
isGurmukhi('gurmuKI') // => false
```
### stripAccents(text) ⇒ <code>String</code>
Removes accents from ASCII/Unicode Gumrukhi letters with their base letter.
Useful for generalising search queries.

**Returns**: <code>String</code> - A simplified version of the provided Gurmukhi string.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | The text to convert. |

**Example**  
```js
stripAccents('ਜ਼ਫ਼ੈਸ਼ਸਓ') // => ਜਫੈਸਸੳ
stripAccents('Z^Svb') // => gKsvb
```
### stripEndings(text) ⇒ <code>String</code>
Strips line endings from any Gurmukhi or translation string.
Accepts both Unicode and ASCII input.
Useful for generating accurate first letters or modifying non-Gurbani for better display.
*Not* designed for headings or Sirlekhs.

**Returns**: <code>String</code> - A ending-less version of the text.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | The text to stip endings from. |

**Example** *(Line ending phrases)*  
```js
stripEndings('ਸੋ ਘਰੁ ਰਾਖੁ; ਵਡਾਈ ਤੋਇ ॥੧॥ ਰਹਾਉ ॥') // => ਸੋ ਘਰੁ ਰਾਖੁ; ਵਡਾਈ ਤੋਇ
stripEndings('ਹੁਕਮੁ ਪਛਾਣਿ; ਤਾ ਖਸਮੈ ਮਿਲਣਾ ॥੧॥ ਰਹਾਉ ਦੂਜਾ ॥') // => ਹੁਕਮੁ ਪਛਾਣਿ; ਤਾ ਖਸਮੈ ਮਿਲਣਾ
stripEndings('ਜਨ ਨਾਨਕ. ਗੁਰਮੁਖਿ ਜਾਤਾ ਰਾਮ ॥੪॥੬॥ ਛਕਾ ੧ ॥') // => ਜਨ ਨਾਨਕ. ਗੁਰਮੁਖਿ ਜਾਤਾ ਰਾਮ
```
**Example** *(English Translations)*  
```js
stripEndings('O Nanak, Forever And Ever True. ||1||') // => O Nanak, Forever And Ever True.
stripEndings('lush greenery. ||1||Pause||') // => lush greenery.
stripEndings('always I live within the Khalsa. 519') // => always I live within the Khalsa.
stripEndings('without your reminiscence.(1) (3)') // => without your reminiscence.
```
**Example** *(Spanish Translations)*  
```js
stripEndings('ofrece su ser en sacrificio a Ti. (4-2-9)') // => ofrece su ser en sacrificio a Ti.
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
toAscii('ਹਮਾ ਸਾਇਲਿ ਲੁਤਫ਼ਿ ਹਕ ਪਰਵਰਸ਼ ॥') // => hmw swieil luqi& hk prvrS ]
toAscii('ਸੁ ਬੈਠਿ ਇਕੰਤ੍ਰ ॥੫੭੮॥') // => su bYiT iekMqR ]578]
```
### toEnglish(line) ⇒ <code>String</code>
Transliterates a line from Unicode Gurmukhi to english.
Currently supports the `,`, `;`, `.` vishraam characters.

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
toHindi('ਕੁਲ ਜਨ ਮਧੇ ਮਿਲੵੋਿ ਸਾਰਗ ਪਾਨ ਰੇ ॥') // => कुल जन मधे मिल्यो सारग पान रे ॥
toHindi('ਸੁ ਬੈਠਿ ਇਕੰਤ੍ਰ ॥੫੭੮॥') // => सु बैठ इकंत्र ॥५७८॥
```
### toShahmukhi(text) ⇒ <code>String</code>
Transliterates Unicode Gurmukhi text to the Shahmukhi script.

**Returns**: <code>String</code> - A Shahmukhi transliteration of the provided Unicode Gurmukhi string.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | The Unicode Gurmukhi text to convert. |

**Example**  
```js
toShahmukhi('ਹਮਾ ਸਾਇਲਿ ਲੁਤਫ਼ਿ ਹਕ ਪਰਵਰਸ਼ ॥') // => هما ساِال لُتف هک پرورش ۔۔
toShahmukhi('ਸੁ ਬੈਠਿ ਇਕੰਤ੍ਰ ॥੫੭੮॥') // => سُ بَےٹھ ِاکںتر ۔۔۵۷۸۔۔
```
### toSyllabicSymbols(text) ⇒ <code>String</code>
Represents text in syllables according to Sanskrit prosody, Pingala, Matra/Meter/Morae

**Returns**: <code>String</code> - A syllabic representation of 1's (laghu/light/short) and 2's (guru/heavy/long).  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | The string to convert |

**Example**  
```js
toSyllabicSymbols( 'ਪ੍ਰਭੂ ਪ੍ਰੇਮੀ ਪੜ੍ਹ ਚੜ੍ਹ ਦ੍ਵੈਤ' )
// expected output: '12 22 11 11 21'
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

## Community

Get updates on Shabad OS and chat with the project maintainers and community members.

- [![Instagram][instagram-image]][instagram-url] Follow Shabad OS on Instagram
- [![Twitter][twitter-image]][twitter-url] Follow Shabad OS on Twitter.
- [![Chat][chat-image]][chat-url] Join the official Slack channel.

## Contributing

There are multiple ways to contribute whether you are a user or developer. For example:

- [Submit bugs and feature requests][new-issue-url].
- Review documentation and make pull requests for anything from typos to new content.
- Give feedback on the onboarding process to make it easier for others to join the project.

If you're interested in contributing to the source code of Gurmukhi Utils, then please see [Contributing Guidelines](./CONTRIBUTING.md).

## People

The original author and current lead maintainer of Gurmukhi Utils is Harjot Singh ([@harjot1singh](https://github.com/harjot1singh)).

"Thank you!" to [all the volunteers][contributor-url] who've already contributed to Gurmukhi Utils. Additional thanks to:

* Preetcharan S ([@NerdSingh](https://www.instagram.com/nerdsingh/)) and Basics of Sikhi for english pronunciation guidelines
* Dr. Gurpreet S Lehal (Punjabi University, Patiala) for his work in Gurmukhi-Hindi (Devanagri) and Gurmukhi-Shahmukhi (Urdu) transliteration

## Feedback

- Ask a question via [Slack][chat-url]
- [Upvote popular feature requests][upvote-tracker-url] using the thumbs-up/+1 reaction on the first post of a feature request
- Follow [@shabad_os on Instagram](instagram-url) and [@shabad_os on Twitter](twitter-url) and let us know what you think!

## Related Projects

Projects in the Shabad OS ecosystem of free and open source software which use the `gurmukhi-utils` package include:

- [Database](https://github.com/shabados/database)
- [Viewer](https://github.com/shabados/viewer)
- [Presenter](https://github.com/shabados/presenter)
- [Mobile](https://github.com/shabados/mobile)

## Code of Conduct

Please note that this project is released under the Contributor Covenant. By participating in this project you agree to abide by its terms. Our intention is to signal a safe open-source community by welcoming all people to contribute, and pledging in return to value them as whole human beings and to foster an atmosphere of kindness, cooperation, and understanding.

> We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

> We pledge to act and interact in ways that contribute to an open, welcoming, diverse, inclusive, and healthy community.

> [The Contributor Covenant][contributor-covenant-url]

## License

The Shabad OS Gurmukhi Utils repo is under v3 of the [GPL](LICENSE.md). It is similar to the Golden Rule: do unto others as you would have them do unto you. In exchange for benefitting from the work completed in this repo, others must share their derivative work under v3 of the [GPL](LICENSE.md).

> This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

> This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

> You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.


[runkit-url]: https://npm.runkit.com/gurmukhi-utils
[npm-image]: https://img.shields.io/npm/v/gurmukhi-utils.svg
[npm-url]: https://npmjs.org/package/gurmukhi-utils
[downloads-image]: https://img.shields.io/npm/dm/gurmukhi-utils.svg
[downloads-url]: https://npmcharts.com/compare/gurmukhi-utils?minimal=true
[release-image]: https://img.shields.io/circleci/project/github/shabados/gurmukhi-utils/main.svg?label=release
[release-url]: https://circleci.com/gh/shabados/gurmukhi-utils/tree/main
[next-image]: https://img.shields.io/circleci/project/github/shabados/gurmukhi-utils/dev.svg?label=next%20release
[next-url]: https://circleci.com/gh/shabados/gurmukhi-utils/tree/dev
[coveralls-image]: https://img.shields.io/coveralls/github/shabados/gurmukhi-utils.svg?label=test%20coverage
[coveralls-url]: https://coveralls.io/github/shabados/gurmukhi-utils

[instagram-image]: https://img.shields.io/badge/Instagram-%40shabad__os-C13584.svg?logo=instagram&logoColor=white
[instagram-url]: https://www.instagram.com/shabad_os/
[twitter-image]: https://img.shields.io/badge/Twitter-%40shabad__os-1DA1F2.svg?logo=twitter&logoColor=white
[twitter-url]: https://www.twitter.com/shabad_os/
[chat-image]: https://img.shields.io/badge/Chat-Public%20Slack%20Channels-1264a3.svg?logo=slack
[chat-url]: https://chat.shabados.com

[new-issue-url]: https://github.com/shabados/gurmukhi-utils/issues/new
[contributor-url]: https://github.com/shabados/gurmukhi-utils/graphs/contributors
[upvote-tracker-url]: https://github.com/shabados/gurmukhi-utils/issues?q=is%3Aopen+is%3Aissue+label%3A%22Type%3A+Feature%2FEnhancement%22+sort%3Areactions-%2B1-desc
[contributor-covenant-url]: https://www.contributor-covenant.org/version/2/0/code_of_conduct/
