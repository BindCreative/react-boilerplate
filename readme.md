# BIND React Typescript boilerplate

Minimalistic and flexible React boilerplate.

## Table of contents

1. [Requirements](#requirements)
2. [Setup](#setup)
3. [Building and running](#building-and-running)
4. [Server](#server)
5. [Testing](#testing)

## Requirements

- [GIT](https://git-scm.com/)
- [NVM](https://github.com/nvm-sh/nvm) - node version manager
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - code formatter for VS Code
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - linter for VS Code

## Setup

```
$ git clone https://github.com/BindCreative/react-boilerplate MyProject
$ cd MyProject
$ nvm use                   # Sets correct node version
$ yarn                      # Installs dependencies
```

## Building and running

```
$ yarn build:dev            # Development build
$ yarn build:prod           # Production build
```

## Server

Built-in express server for development and production.

```
$ cd server                 # Navigate to server's subdirectory
$ yarn                      # Install dependencies
$ yarn start:dev            # Sart dev server with HMR
$ yarn start:prod           # Sart production server with SSR
```

## Testing

Runs supplied tests with `Jest`

```
$ yarn test                 # Run all tests
```
