/*
MID-LEVEL GOAL:
Implement and understand performance utilities like memoization, debouncing, and throttling that are used constantly in real applications.

REAL WORLD USE CASE:
- Expensive calculations in render or on user input
- API calls on typing (search, autocomplete)
- Scroll, resize, and mousemove handlers
- Caching results of pure functions

CONCEPTS COVERED:
- Memoization with cache invalidation
- Debounce vs throttle differences and use cases
- Leading/trailing edge options
- Cancellation and cleanup
- Libraries vs hand-rolled implementations
*/

// ============================================
// STEP 1: Memoization
// ============================================

function memoize(fn, keyFn = (...args) => JSON.stringify(args)) {
  const cache = new Map();
  return function (...args) {
    const key = keyFn(...args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// ============================================
// STEP 2: Debounce
// ============================================

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// ============================================
// STEP 3: Throttle
// ============================================

function throttle(fn, limit) {
  let lastRan;
  return function (...args) {
    if (!lastRan) {
      fn.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(window.throttleTimer);
      window.throttleTimer = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          fn.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

/*
DEEPER BREAKDOWN:

Memoization trades memory for CPU. Be careful with cache size and key stability.

Debounce waits for quiet period — great for search input.
Throttle guarantees execution at regular intervals — great for scroll.

Always clean up timers in React effects.

MID-LEVEL PERSPECTIVE:

Choosing the wrong one (or implementing it incorrectly) is a very common source of bugs and bad UX.

COMMON PITFALLS:

- Using debounce for things that need immediate feedback
- Losing 'this' context
- Not cleaning up timers when components unmount
- Memoizing functions that have side effects or depend on mutable external state

EXPERIMENTS:

1. Compare debounce vs throttle behavior with a visual demo.
2. Implement memoize with LRU eviction.
3. Create a hook useDebouncedValue that works with React state.

MID-LEVEL CHALLENGE:

Build a robust `useThrottle` and `useDebounce` hook pair that:
- Work with both values and callbacks
- Properly clean up
- Support leading/trailing options
- Can be cancelled manually
*/