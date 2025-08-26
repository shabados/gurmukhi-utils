# Contributing

Please see our [community docs on contributing](https://shabados.com/docs/community/contributing).

This document is for developers or programmers contributing to source code. If you're interested in contributing a different way, please see the links above.

## Principles

Each language's implementation should mirror the other languages' implementations, minus the language specific function calls. So if we have a function called `toGurmukhi` in the JavaScript implementation, we should have a function called `toGurmukhi` in the Python implementation, and so on (with idiomatic differences in naming).

Constants should be shared between languages, and should be built from the JSON5 files in the `constants` directory. Each language should import or copy the constants in from the `@gurmukhi-utils/constants` package. We only want the language implementations to mirror the language-specific functions, not the constants.

## Tooling

Use [Mise](https://mise.jdx.dev/) to manage tool versions in the project. Each language has its own `mise.toml` file, and you can use the `mise install` command to install the correct version of the tool for your project.

## Setup

You should always build the `constants` package before building any language package. This will generate constants files for each language.

## Language Specific

Please check the CONTRIBUTING.md file located within each language folder.

- [Python](/python/CONTRIBUTING.md)
- [JavaScript](/javascript/CONTRIBUTING.md)
- [Ruby](/ruby/CONTRIBUTING.md)
- [C# / C Sharp](/csharp/CONTRIBUTING.md)
- [Dart](/dart/CONTRIBUTING.md)

## Testing

Each language should implement the `guut` runner, and run all the tests specified in the `test` folder. See the [JavaScript implementation](javascript/test/guut.ts) as an example.

## Thank you

Your contributions to open source, large or small, make great projects like this possible. Thank you for taking the time to participate in this project.
