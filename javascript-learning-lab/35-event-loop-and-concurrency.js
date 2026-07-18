/*
MID-LEVEL GOAL:
Understand the JavaScript event loop, task queues, and how async code is actually scheduled. This explains "why does this run before that?"

REAL WORLD USE CASE:
- Debugging timing issues and race conditions
- Optimizing for main-thread performance
- Understanding framework internals (React scheduler, Vue, etc.)
- Writing high-performance code (animations, input handling, data processing)

CONCEPTS COVERED:
- Call stack, Web APIs, macrotask queue, microtask queue
- Promise vs setTimeout ordering
- requestAnimationFrame and layout thrashing
- Node.js event loop phases (for server-side awareness)
*/

// ============================================
// STEP 1: Classic ordering example
// ============================================

console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');

// Output: 1, 4, 3, 2

// ============================================
// STEP 2: Microtasks run to completion
// ============================================

Promise.resolve()
  .then(() => console.log('micro 1'))
  .then(() => console.log('micro 2'));

setTimeout(() => console.log('macro'), 0);

// All microtasks finish before the next macrotask.

// ============================================
// STEP 3: Performance implications
// ============================================

// Long-running microtask (e.g. many chained .then) can block rendering.
// Use requestAnimationFrame or queueMicrotask carefully.

function processChunk(items) {
  const chunk = items.splice(0, 100);
  // process chunk
  if (items.length) {
    queueMicrotask(() => processChunk(items)); // or better: rAF
  }
}

/*
DEEPER BREAKDOWN:

Call stack must empty before any async callback runs.

Microtasks (promises, queueMicrotask, MutationObserver) run after current script but before rendering and next macrotask.

Macrotasks include setTimeout, setInterval, I/O, UI events.

requestAnimationFrame runs before paint, after microtasks.

MID-LEVEL PERSPECTIVE:

You will be asked to explain ordering or fix "UI jank" caused by blocking the event loop. Knowing the queues lets you choose the right scheduling primitive.

COMMON PITFALLS:

- Blocking the main thread with heavy work in microtasks
- Expecting setTimeout(..., 0) to run "immediately"
- Starving the UI by scheduling too many microtasks
- Confusing Node.js phases with browser behavior

EXPERIMENTS:

1. Schedule work using setTimeout, queueMicrotask, and requestAnimationFrame and observe paint timing.
2. Create a long microtask chain and watch the UI freeze.
3. Use performance.now() to measure between different queues.

MID-LEVEL CHALLENGE:

Implement a non-blocking batch processor that yields to the browser regularly using a combination of microtasks and requestAnimationFrame. It should process an array of 10,000 items without freezing the UI and report progress.
*/