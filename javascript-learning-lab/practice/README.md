# Practice Feedback Loops

This folder turns the lesson notes into active drills with tests.

## How It Works

Each topic has:

- `README.md` - what you are practicing
- `starter.js` - the file learners edit
- `solution.js` - a worked solution to read after trying
- `expected-output.md` - sample calls and expected results
- `<topic>.test.js` - automated tests

(TypeScript topics use `.ts` files and a `*.type-test.ts`; React topics use `.jsx` files and a `<topic>.test.jsx`.)

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

**Check without installing anything:** `node practice/run-tests.js solution` should report
`# pass 49` / `# fail 1`. The one failure is the dom-browser file, which needs `jsdom`
from `npm install`. The other five core-js topics run on Node's built-in test runner
alone. `node practice/run-tests.js starter <topic>` is your per-topic check: it fails
until you implement that topic's starter.

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
