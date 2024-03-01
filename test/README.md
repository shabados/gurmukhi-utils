# Universal Test Suite

This folder contains json files for all the tests that every language must pass. Tests define the universal name of functions to use across languages, and as such should try to follow a naming convention that all languages can agree on (or at minimum can all run/compile).

Example showing how the test suite `unicode3` function is implemented across a few languages:

```json
// example of a file in this folder that defines functions for use in the tests
{
  "functions": ["unicode3"]
}
```

```python
from gurmukhiutils.unicode import unicode

def unicode3(str):
    unicode(unicode(unicode(str)))
```

```js
import { toUnicode } from '../build/index.js'

const unicode3 = (str) => toUnicode(toUnicode(toUnicode(str)))
```

**parameters**

If a function like `toUnicode` also needs to test different parameters, then the universal test suite defines a new function for it.

E.g.

```json
// example of a file in this folder that defines functions for use in the tests
{
  "functions": ["unicode3", "santlipi", "unisant"]
}
```

```js
import { toUnicode } from '../build/index.js'

const unicode3 = (str) => toUnicode(toUnicode(toUnicode(str)))
const santlipi = (str) => toUnicode(str, 'Sant Lipi')
const unisant = (str) => toUnicode(toUnicode(str, 'Sant Lipi'))
```

## Types of tests

The following tests are implemented, but more can be added with a universal keyword:

- `is` - Strictly equal (E.g. in JavaScript `a === b`)
- `is not` - Not equal (E.g. in JavaScript `a != b`)
- `throws` - Results in an error/exception being thrown/raised

## Test Array

The json files then list all tests with a name, the functions to execute, the type of test, and assertions to make.

E.g.

```json
"tests": [
    {
        "name": "Ascii to Unicode",
        "functions": ["unicode3"],
        "type": "is",
        "assertions": {
            "123": "੧੨੩",
            "<> > <": "ੴ ☬ ੴ",
            "gurU": "ਗੁਰੂ"
        }
    }
]
```
