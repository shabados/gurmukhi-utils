# Contributing to Presenter

Thank you for your interest in participating!

There are many ways to contribute, beyond writing code or programming, by: logging bugs, reporting issues, and creating suggestions. To do so, please [create a ticket](https://github.com/ShabadOS/gurmukhi-utils/issues/new) in our issue tracker. (See other ways to [Contribute](README.md#Contributing) or give [Feedback](README.md#Feedback).

This document is for developers or programmers contributing to the source code of Gurmukhi Utils.

**Table of Contents**

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Build](#build)
  - [Run](#run)
  - [Notes](#notes)
- [Workflow](#workflow)
  - [Coding Guidelines](#coding-guidelines)
  - [Scope](#scope)
- [Thank you](#thank-you)

## Getting Started

If you wish to better understand how Gurmukhi Utils works or want to debug an issue: get the source, build it, and run it locally.

### Prerequisites

In order to download necessary tools, clone the repository, and install dependencies, you'll need network access.

You’ll need the following:

- [Git](https://git-scm.com/)
- [Node.JS](https://nodejs.org) (If you need to manage multiple Node.JS versions, [use a node version manager](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install)

Get the source code of `gurmukhi-utils` repo:

```
gh repo fork shabados/gurmukhi-utils --clone=true
```

**PROTIP**: Use the [`gh` cli tool from GitHub](https://cli.github.com/) to fork the repo to your GitHub account (if not already), clone it to your local machine, and set the appropriate remotes for origin and upstream with the above command.

### Build

Run `npm i` in the root directory.

### Run

Usage:

```
npm run <command>
```

The commands are:

```
build-docs Generates docs from readme.hbs and jsdoc
lint Runs ESLint
test Unit tests with Jest
```

### Notes

Markdown and HTML JSDoc documentation is generated automatically on commit. If you'd like to preview any changes to documentation, `npm run build-docs` will update `README.md` and the files in `docs/`. `README.md` should _not_ be edited, instead apply modifications to `README.hbs`.

_Note to contributors with push access to main:_ Any commits or merge commits containing the strings `#Major`, `#Minor`, `#Patch` (case-sensitive) will trigger an automatic npm release with the respective semver bump.

## Workflow

The workflow of development (or Git Flow) is to [choose/create an issue](https://github.com/ShabadOS/presenter/issues) to work on, [create a feature branch](https://github.com/ShabadOS/.github/wiki/How-to-Contribute#branches), and [submit a pull request](https://github.com/ShabadOS/.github/wiki/How-to-Contribute#pull-requests).

**PROTIP**: Read more about our workflow (issue tracking, branching, and pull requests) in the [How To Contribute wiki article](https://github.com/ShabadOS/.github/wiki/How-to-Contribute).

### Coding Guidelines

Please see the [wiki](https://github.com/ShabadOS/.github/wiki/How-to-Contribute#coding-guidelines) for Coding Guidelines ([Names](https://github.com/ShabadOS/.github/wiki/How-to-Contribute#41-names), [Comments](https://github.com/ShabadOS/.github/wiki/How-to-Contribute#42-comments), [Style](https://github.com/ShabadOS/.github/wiki/How-to-Contribute#43-style), [Linting](https://github.com/ShabadOS/.github/wiki/How-to-Contribute#44-linting), and [Commit Messages](https://github.com/ShabadOS/.github/wiki/How-to-Contribute#45-commit-messages)).

### Scope

To be used in [commit messages](https://github.com/ShabadOS/.github/wiki/How-to-Contribute#45-commit-messages).

Usage:

```shell
<type>(<scope>): <subject>
```

The scope should be the name of the function affected (e.g. `toEnglish`, `isGurmukhi`, `stripVishraams`).

## Thank you

Your contributions to open source, large or small, make great projects like this possible. Thank you for taking the time to participate in this project.
