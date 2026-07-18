# Practice Feedback Loops

This folder turns the lesson notes into active drills with tests.

## How It Works

Each topic has:

- `README.md` - what you are practicing
- `starter.js` - the file learners edit
- `solution.js` - a worked solution to read after trying
- `expected-output.md` - sample calls and expected results
- `<topic>.test.js` - automated tests

## Commands

Run from `javascript-learning-lab`:

```bash
npm install
npm test
npm run test:js
npm run test:ts
npm run test:react
npm run test:learn
node practice/run-tests.js starter arrays
node practice/run-tests.js solution arrays
```

`npm test` runs all solution checks and should pass.

`npm run test:learn` runs tests against starter files. It should fail until you implement the starter functions.

## Core JavaScript Topics

- `core-js/arrays`
- `core-js/objects`
- `core-js/functions`
- `core-js/dom-browser`
- `core-js/closures`
- `core-js/async`

## TypeScript Topics

- `typescript/narrowing`
- `typescript/generics`

## React Topics

- `react/components-props`
- `react/state-effects`
