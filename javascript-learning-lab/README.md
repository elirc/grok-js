# JavaScript Learning Lab

A beginner-friendly collection of small, focused JavaScript example files.

The goal of this project is **not** to build a production app.  
The goal is to help a complete beginner learn JavaScript by studying many tiny, realistic examples.

The numbered core files teach **one core concept** at a time using plain JavaScript.
Additional folders add practice drills, React notes, TypeScript notes, and runnable feedback loops.

---

## What This Project Is

- 40+ numbered core `.js` files
- Each file = one lesson or tiny project
- Every file is heavily commented for learning
- Examples use real-life beginner scenarios: user profiles, shopping carts, todo lists, login checks, price calculators, fake dashboards, product filters, etc.
- Designed to be read, typed, and experimented with
- `practice/` adds starter code, tests, expected output, and worked solutions

---

## How a Beginner Should Study the Files

1. Open one file at a time in a code editor (VS Code recommended).
2. Read the big comment block at the **top** first.
3. Read the code slowly.
4. Read every comment right after important lines.
5. Read the big sections at the **bottom**:
   - LINE-BY-LINE BREAKDOWN
   - NOOB TRANSLATION
   - COMMON MISTAKES
   - TRY CHANGING THIS
   - MINI CHALLENGE
6. Type the code yourself instead of just reading.
7. Use the browser console or Node to experiment.

---

## Practice Feedback Loops

When you are ready to stop only reading and start proving you can write code, use the new `practice/` folder.

For the full recommended learning path, read `CURRICULUM.md`.

Each practice topic includes:
- `starter.js` - implement this first
- `solution.js` - read this after you try
- `expected-output.md` - sample calls and expected results
- `<topic>.test.js` - automated tests

Run these commands from `javascript-learning-lab`:

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

`npm test` runs all worked solutions and type/component checks.

`npm run test:learn` runs the starter files and should fail until you implement them.

Practice topics:
- arrays
- objects
- functions
- DOM/browser
- closures
- async
- TypeScript narrowing
- TypeScript generics
- React components/props
- React state/effects

---

## Recommended Order

Follow the numbers in order. Each file builds on previous ones.

01. variables-and-values.js
02. strings-and-methods.js
03. numbers-and-math.js
04. booleans-and-comparisons.js
05. conditionals-if-else.js
06. arrays-basics.js
07. array-methods-push-pop-includes.js
08. array-methods-map-filter-reduce.js
09. objects-basics.js
10. nested-objects.js
11. functions-basics.js
12. function-arguments.js
13. return-values.js
14. arrow-functions.js
15. loops-for-while.js
16. looping-through-arrays.js
17. scope-let-const-var.js
18. template-literals.js
19. destructuring-basics.js
20. spread-operator.js
21. callback-functions.js
22. dom-queryselector-basics.js
23. button-click-events.js
24. form-input-validation.js
25. todo-list-mini-project.js
26. shopping-cart-mini-project.js
27. fetch-api-basics.js
28. async-await-basics.js
29. try-catch-error-handling.js
30. final-mini-user-dashboard.js
31. closures-and-lexical-environment.js
32. prototypes-inheritance-and-classes.js
33. es-modules-and-commonjs.js
34. promises-and-advanced-async.js
35. event-loop-and-concurrency.js
36. memoization-debounce-throttle.js
37. collections-map-set.js
38. symbols-proxy-reflect.js
39. iterators-generators.js
40. memory-leaks-and-gc.js

You can skip around later, but start from the beginning.

---

## How to Run the Code

### For files that use only variables, arrays, objects, functions, loops, etc.
- Open the file
- Copy the code
- Paste into browser DevTools Console (F12 → Console tab)
- Or save as a .js file and run with Node.js: `node 01-variables-and-values.js`

### For DOM / event / browser files (22–26 and 30)
- These expect to run in a web page.
- Simple options:
  1. Create a basic `index.html` with `<script src="22-dom-queryselector-basics.js"></script>`
  2. Or paste the code directly into the browser console (some will only partially work)
  3. Or open the file and read the comments — the code is still educational even if not wired to HTML

The main purpose is learning the JavaScript, not building a full website.

---

## How to Use the Comments

This project uses comments as your teacher.

- Big blocks at the top explain the lesson.
- Inline comments (//) explain **specific lines**.
- Bottom sections give deeper explanations and practice ideas.

Read the comments like you are having a conversation with the code.

---

## How to Experiment with Changing Values

The best way to learn is to **change things** and see what happens.

Inside each file you will find a section:

```
// TRY CHANGING THIS:
// 1. ...
// 2. ...
// 3. ...
```

Do these experiments:
- Change string values
- Change numbers
- Add or remove items from arrays
- Change object properties
- Rename variables
- Break things on purpose to see the errors

After you change something, save and re-run the file in the console.

Ask yourself:
- What changed in the output?
- Why did it change?
- What would break if I did X?

---

## Tips for Absolute Beginners

- Don't try to memorize everything on the first read.
- Focus on understanding **what each line does**.
- Pay special attention to:
  - How data is stored (variables)
  - How we group data (arrays and objects)
  - How we reuse code (functions)
  - How we make decisions (conditionals)
  - How we repeat work (loops)
- It is 100% okay to re-read a file multiple times.

---

## What You Will Learn

By the end of this lab you will understand:

- Variables and values
- Strings, numbers, booleans
- Arrays and objects (and how to work with them)
- Functions, arguments, return values, arrow functions
- Loops and conditionals
- Scope
- Template literals and destructuring
- Spread operator
- Callbacks
- Basic DOM selection and events (for browser)
- Simple form validation
- Two small app-style projects (todo + shopping cart)
- Fetching data and async/await
- Error handling with try/catch

---

## Final Advice

Read one file per session at first.  
Really play with the code.  
Type things. Break things. Fix them.

This is how real developers learned JavaScript.

Good luck! You've got this.

---

## Expanded Examples and Coding Problems

This lab (including React & TS subfolders) has been massively expanded with many new example files. Each example now follows a consistent format: runnable (or near-runnable) code immediately followed by detailed English narration explaining what the code does, why it is written that way, and what concepts a junior engineer should internalize.

There are now **hundreds of focused example files** (part of a project-wide 20x expansion of narrated examples) covering:
- Core JS (variables, mutability, strings, arrays, functions, async, closures, event loop, DOM, fetch, error handling, performance, etc.)
- React patterns (props, composition, hooks, custom hooks, forms, error boundaries)
- TypeScript (types, generics, utility types, guards, narrowing)
- And more added over time.

The goal of these narrated examples is reinforcement and deeper understanding after (or alongside) the main lessons.

### javascript-learning-lab/coding-problems/
- problem-closures.js, problem-async.js (expanded)
- problem-arrays.js (NEW), problem-objects.js (NEW), problem-functions.js (NEW)
- problem-dom-browser.js (NEW)
- For runnable drills with tests, use `practice/core-js/`

### javascript-learning-lab/examples/
- advanced-closures.js, advanced-promises.js (expanded)
- example-arrays-iteration.js (NEW)
- example-es6-modern.js (NEW)
- example-performance.js (NEW)
- Generated repetition examples live under `examples/generated/` so the main examples folder stays readable.

### javascript-learning-lab/practice/
- `core-js/` has runnable starter/solution/test drills for arrays, objects, functions, DOM/browser, closures, and async.
- `typescript/` adds compiler-checked drills for narrowing and generics.
- `react/` adds component-tested drills for components/props and state/effects.

### react-basics/ (subfolder)
coding-problems/ and examples/ added:
- problem-01-components-props.jsx ... problem-06-context-patterns.jsx (6+)
- example-state-patterns.jsx, example-hooks-deep.jsx, example-data-fetching.jsx, example-testing-concepts.jsx, example-patterns-advanced.jsx

### typescript-basics/
coding-problems/ + examples/ added:
- problem-01-types-basics.ts ... problem-05-declarations.ts
- example-advanced-types.ts, example-tsconfig-build.ts + more

Use these to drill concepts after the numbered lessons.

---

## New Teaching Approaches (Added 2026)

In addition to the classic numbered lessons, -2.0 companions, coding-problems, examples and practice drills, this lab now includes **three new styles** for many core topics. The goal is to offer different learning approaches while covering the same ideas.

### File Naming Convention for New Styles
- `XX-topic-think-predict.js` — Socratic / Prediction / Active recall style. Stop and guess before revealing.
- `XX-topic-bug-hunt.js` — Debugging-first. Find and fix intentional problems.
- `XX-topic-narrative.js` — Story-driven. Learn the concept while building one ongoing mini-project (SnackTrack).

These new files follow the same "one focused concept" rule and use realistic examples.

Topics that received new style variants (partial list):
01 variables, 02 strings, 03 numbers, 04 booleans, 05 conditionals, 06 arrays-basics, 07/08 array methods, 09 objects, 11-17 functions/scope/loops, 28-29 async/error-handling and more.

Use the classic file for clear teaching, then rotate through the three new styles for deeper retention.
