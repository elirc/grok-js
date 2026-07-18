/*
JUNIOR GOAL:
Understand callbacks as a fundamental pattern and when to prefer them versus promises or other abstractions.

REAL WORLD USE CASE:
- Event listeners
- Array method callbacks
- Node.js style error-first callbacks (legacy)
- Custom iteration and async flows

CONCEPTS COVERED:
- Callback hell and how to escape it
- Error handling in callbacks
- Higher-order functions
- Inversion of control
*/

// ============================================
// STEP 1: Higher order usage
// ============================================

function withLogging(fn) {
  return function(...args) {
    console.log('Calling with', args);
    return fn(...args);
  };
}

// ============================================
// STEP 2: Error-first pattern
// ============================================

function readFile(path, callback) {
  // simulate
  try {
    const data = 'file content';
    callback(null, data);
  } catch (err) {
    callback(err);
  }
}

// ============================================
// STEP 3: Avoiding callback hell
// ============================================

// Instead of nesting, use named functions or move to promises.

function step1(cb) { /* ... */ cb(null, 'a'); }
function step2(val, cb) { /* ... */ cb(null, val + 'b'); }

/*
DEEPER BREAKDOWN:

Callbacks invert control.
The function you pass decides when and how it gets called.

Error-first is a convention: first argument is error or null.

JUNIOR PERSPECTIVE:

While modern code prefers promises and async/await, understanding callbacks helps when working with older code or certain libraries.

COMMON PITFALLS IN PRODUCTION:

1. Forgetting to call the callback (or calling it multiple times).
2. Not handling errors in the callback.
3. Deep nesting that becomes unmaintainable.

EXPERIMENTS:

1. Convert a nested callback chain into named functions.
2. Wrap a callback API with a Promise.

JUNIOR CHALLENGE:

Write a function waterfall(tasks, finalCallback) where tasks is an array of functions that accept a value and a callback.
*/