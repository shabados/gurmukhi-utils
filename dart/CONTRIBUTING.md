# Contributing

Please see our [community docs on contributing](https://shabados.com/docs/community/contributing).

This document is for developers or programmers contributing to source code. If you're interested in contributing a different way, please see the link above.

## Pull Request

_Role: contributors wishing to change the project source code_

**Requirements:**

- [Dart](https://dart.dev) (see sdk in `pubspec.yaml`)

**Workflow:**

- Fork this repository
- Create a branch from `main`
- Make any changes
- Submit a pull request

Note: Before creating new branches, ensuring that the forked `main` is up to date with the upstream/original `main` will ease workflow.

**Development:**

For gurmukhi conversions, make changes in [lib/src/conversion](lib/src/conversion) folder.

For gurmukhi utilities, make changes in [lib/src/gurmukhi.dart](lib/src/gurmukhi.dart) file.

## PR Merge

_Role: project authors/maintainers_

- Pull requests should be squashed or rebased.
- Commit messages on `main` branch should generally conform to [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/).

**Types**

Some _types_ correlate with incrementing major, minor, and patch versions in [Semantic Versioning](https://semver.org/). These _types_ should only be used for code changes in the `lib` folder. (This folder is considered the project's API.)

- `BREAK` increments major. To be used when making incompatible changes to the API.
- `feat` increments minor. To be used when adding backwards-compatible functionality to the API.
- `fix` increments patch. To be used when making backwards-compatible bugfixes to the API. Do not use this type when fixing something outside the `lib` folder.

All other _types_ are ignored by the version bump workflow. These types are typically used outside the API folder, but may change API source code without actually affecting anything for the end user. Valid non-versioning (non-API related) _types_ include: `build`, `chore`, `ci`, `docs`, `perf`, `refactor`, `revert`, `style`, and `test`.

## Release

_Role: project authors/maintainers_

See [actions](https://github.com/shabados/gurmukhiutils/actions) for incrementing the version and publishing.

**Version Increment/Bump**

- This workflow bumps/increments the version via a Pull Request.
- The PR will list all the commit history from after the last release.
- The PR must be merged prior to publishing.

Note: Leave the override field blank for automatic versioning.

**Publish**

- This workflow will publish to [pub.dev](https://pub.dev/) and create a GitHub release.

## Thank you

Your contributions to open source, large or small, make great projects like this possible. Thank you for taking the time to participate in this project.