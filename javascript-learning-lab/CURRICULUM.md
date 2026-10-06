# Curriculum Map

This map keeps the project from becoming "lots of files, no path."

Each phase ends with a **Check** you can run. All commands run from the lab root
(`javascript-learning-lab/`). The core-JS checks need only Node (they use the built-in
`node --test` runner); the DOM, TypeScript, and React checks need `npm install` first.

## Phase 1: JavaScript Fundamentals

Read:

- `01` through `21` in the project root.
- `31-closures-and-lexical-environment.js` alongside the closures drill.

Practice:

- `practice/core-js/arrays`
- `practice/core-js/objects`
- `practice/core-js/functions`
- `practice/core-js/closures`

**Goal:** You can transform arrays of objects, write small reusable functions, explain scope, and pass the starter tests after implementing them yourself.

**Check:** each of these passes (they all fail before you implement the starters):

```bash
node practice/run-tests.js starter arrays
node practice/run-tests.js starter objects
node practice/run-tests.js starter functions
node practice/run-tests.js starter closures
```

## Phase 2: Browser JavaScript and Async

Read:

- `22` through `30` in the project root. 22–26 and 30 use `document`/`localStorage`, so run them in the browser: `index.html` has commented-out `<script>` tags for 23–26 and 30.
- `34`, `35`, and `36` for deeper async/performance concepts (promises, the event loop, memoization/debounce/throttle).

Practice:

- `practice/core-js/dom-browser`
- `practice/core-js/async`

**Goal:** You can read form input, update UI state, persist data, handle async errors, and explain why a request can fail.

**Check:**

```bash
node practice/run-tests.js starter async
npm install                                  # dom-browser tests need jsdom
node practice/run-tests.js starter dom-browser
```

## Phase 3: TypeScript

Read:

- `typescript-basics/01` through `10` first.
- Then `11`, `15`, `17`, and `18`.

Practice:

- `practice/typescript/narrowing`
- `practice/typescript/generics`

**Goal:** You can model API data, narrow unknown input, and write generic helpers.

**Check:** `npm run test:ts` only type-checks the *solution* files, so it passes before you start. To check your own work, after `npm install`:

```bash
npx tsc --noEmit --strict practice/typescript/narrowing/starter.ts
node --experimental-strip-types --input-type=module -e "const m = await import('./practice/typescript/narrowing/starter.ts'); console.log(m.parseTicketStatus('closed'))"
```

The first must compile cleanly; the second (Node 22.6+) should print `closed`. Compare more calls against each topic's `expected-output.md` the same way, and repeat for `generics`.

## Phase 4: React

Read:

- `react-basics/01` through `12` first.
- Then `13`, `14`, `15`, `17`, `21`, and `22`.

Practice:

- `practice/react/components-props`
- `practice/react/state-effects`

**Goal:** You can build tested components with props, state, forms, effects, and accessible interactions.

**Check:** after `npm install`, `LAB_TARGET=starter npm run test:react` passes (Git Bash/macOS/Linux syntax; in PowerShell set `$env:LAB_TARGET="starter"` first).

## Phase 5: Mid-Level Starts Here

Read:

- `32-prototypes-inheritance-and-classes.js`
- `33-es-modules-and-commonjs.js`
- `37-collections-map-set.js`
- `38-symbols-proxy-reflect.js`
- `39-iterators-generators.js`
- `40-memory-leaks-and-gc.js`
- React performance, state management, testing, and accessibility lessons (`react-basics/15`, `19`, `21`, `22`).
- TypeScript conditional, mapped, template literal, and declaration-file lessons (`typescript-basics/12`–`14`, `16`).

These are read-along reference files: 33, 34, 37, and 39 contain fragments (undeclared variables, relative-URL `fetch`) and exit with an error under plain `node`. Copy the section you are studying into a scratch file to run it.

Practice topics not built yet (no folders exist for these):

- `practice/core-js/modules`
- `practice/core-js/event-loop`
- `practice/typescript/utility-types`
- `practice/react/forms`
- `practice/react/custom-hooks`
- `projects/react-ticket-dashboard`

Mid-level readiness signal:

- You can explain tradeoffs, debug failures, design small abstractions, write tests first, and avoid global state or mutation bugs without being told.

## How to Use Examples

Start with the top-level `examples/` files. They are curated.

Use `examples/generated/` only when you want extra repetition. It is preserved content, not the main curriculum path.
