# Contributing

Please see our [community docs on contributing](https://shabados.com/docs/community/contributing).

This document is for developers contributing to source code.

## Architecture

All logic lives in Rust (`src/`). [UniFFI](https://mozilla.github.io/uniffi-rs/) generates language bindings from the compiled library — the bindings are derived, not hand-written. Contributing means writing Rust.

## Prerequisites

Install [Mise](https://mise.jdx.dev/) for tool version management, then:

```shell
mise install
```

This installs Rust (with WASM target), Bun, and Python.

## Build & test

```shell
mise run build          # Build Rust cdylib (.so/.dylib/.dll)
mise run build:wasm     # Build WASM binary
mise run test           # Run Rust tests
mise run fmt            # Check formatting
mise run lint           # Run clippy
mise run check          # All of the above
```

## Generate bindings

```shell
mise run generate:all   # Build + generate everything
```

Or per-language:

```shell
mise run generate:ruby
mise run generate:kotlin
mise run generate:swift
mise run generate:python
mise run generate:javascript   # Native (Node/Bun) + WASM
```

JavaScript bindings go through post-processing: `scripts/camelcase-exports.ts` converts snake_case to camelCase, and `scripts/flatten-wasm-namespace.ts` flattens the WASM module namespace.

## Adding a new function

1. Write the function in the appropriate `src/*.rs` module
2. Annotate with `#[uniffi::export]`
3. Add tests in `tests/`
4. Run `mise run generate:all` to regenerate all bindings

That's it — all 5 language bindings are updated automatically.

## Project layout

```
src/
  lib.rs                  # Crate root
  ascii.rs                # to_ascii
  unicode.rs              # to_unicode, UnicodeStandard enum
  unicode/normalize.rs    # normalize_unicode
  transcribe.rs           # transcribe, Script enum
  transcribe/schemes/     # Per-script implementations (devanagari, latin, latin_scholar)
  transcribe/constants.rs # Shared character class patterns
  feature.rs              # detect, remove, Feature enum, grouping helpers
  helpers.rs              # Internal macros (pipe!, translation_map!, regex!)
bindings/
  javascript/             # npm package (native via koffi + WASM)
  python/                 # PyPI package
  ruby/                   # RubyGems gem
  kotlin/                 # Gradle / JNA
  swift/                  # Swift Package Manager
tests/                    # Integration tests
scripts/                  # JS post-generation transforms
mise.toml                 # Build tasks and tool versions
```

## Thank you

Your contributions to open source, large or small, make great projects like this possible. Thank you for taking the time to participate in this project.
