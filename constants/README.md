# Constants

Reusable constants for packages across Gurmukhi Utils.

We use JSONC to allow for comments in the JSON files, and build them into JSON files.

## Building

```bash
npm run build
```

This will build the JSON files from the JSON5 files. Each langauge repository will be responsible for importing/copying the constants to their own package.

## Generators

The `scripts/to-constants/generators.ts` file contains generators for each language.

Each generator has a `getDestination` method that returns the path to the destination file, and a `generate` method that returns the content of the destination file.

The `getDestination` method is used to determine the path to the destination file, and the `generate` method is used to generate the content of the destination file.

The `generate` method is passed the variables from the JSON file, and it should return the content of the destination file.
