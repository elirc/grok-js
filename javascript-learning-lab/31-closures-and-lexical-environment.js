/*
MID-LEVEL GOAL:
Master closures, lexical scoping, and the execution context to understand how JavaScript manages state and functions over time. This is foundational for understanding React hooks, modules, and many advanced patterns.

REAL WORLD USE CASE:
Closures power module systems, React's useState/useEffect (via lexical scope), event handlers that capture state, memoization, currying, and private state emulation in pre-class JS. Misunderstanding them leads to memory leaks, stale closures, and incorrect state in callbacks.

CONCEPTS COVERED:
- Lexical environment vs variable environment
- How closures capture variables (not values)
- The scope chain and TDZ interactions
- Practical patterns: factories, IIFEs, private state
- Common pitfalls: loops + closures, stale data in async callbacks
*/

// ============================================
// STEP 1: Lexical capture, not value capture
// ============================================

function createCounter(initial) {
  let count = initial; // lives in the lexical environment

  return {
    increment() {
      count += 1; // closes over 'count'
      return count;
    },
    get() {
      return count;
    }
  };
}

const counter = createCounter(10);
console.log(counter.increment()); // 11
console.log(counter.get());       // 11

// The returned object holds a reference to the environment where 'count' lives.

// ============================================
// STEP 2: Classic stale closure in loops (and the fix)
// ============================================

// Problem version (common bug)
function createHandlersBroken() {
  const handlers = [];
  for (var i = 0; i < 3; i++) {
    handlers.push(() => console.log(i)); // all capture the same 'i'
  }
  return handlers;
}

// Fixed with let (new binding per iteration) or IIFE
function createHandlersFixed() {
  const handlers = [];
  for (let i = 0; i < 3; i++) {
    handlers.push(() => console.log(i)); // each has its own 'i'
  }
  return handlers;
}

// ============================================
// STEP 3: Module pattern via closure (pre-ES modules)
// ============================================

const UserService = (function () {
  let users = []; // private

  return {
    add(user) { users.push(user); },
    findById(id) { return users.find(u => u.id === id); },
    getAll() { return [...users]; } // defensive copy
  };
})();

// ============================================
// STEP 4: Stale closures in async / React-like code
// ============================================

function fetchUserData(userId) {
  let isCancelled = false;

  async function load() {
    const data = await fetch(`/api/users/${userId}`).then(r => r.json());
    if (!isCancelled) {
      console.log('Loaded:', data);
    }
  }

  return {
    load,
    cancel() { isCancelled = true; }
  };
}

/*
DEEPER BREAKDOWN:

A closure is a function + the lexical environment it was created in.
Variables are resolved via the scope chain at call time, not creation time.

'let' in loops creates a new lexical environment per iteration (unlike 'var').

IIFEs were historically used to create private scope before block scoping and modules.

In async code, you often need a flag or AbortController to avoid acting on stale closures.

MID-LEVEL PERSPECTIVE:

At mid-level, you should be able to debug "why is this value from three renders ago?" and design APIs that safely capture or avoid capturing mutable state.

Closures are the reason React hooks work the way they do and why you need the dependency array.

COMMON PITFALLS:

- Capturing loop variables with var or without proper let/const
- Stale closures in setTimeout, event listeners, or useEffect callbacks
- Holding large objects alive longer than necessary (memory leaks via closures)
- Accidentally mutating closed-over state from multiple call sites

EXPERIMENTS:

1. Create a factory that returns functions which close over a shared counter, then demonstrate mutation from different returned functions.
2. Fix a for-loop + setTimeout closure bug using both let and an IIFE.
3. Implement a simple memoize function using closure to cache results.

MID-LEVEL CHALLENGE:

Build a "useLocalStorage" style hook simulation (as a plain function) that:
- Persists a value to localStorage
- Returns getter and setter that close over the current key
- Handles the case where the component "unmounts" (simulated with a cancel flag)
- Prevents updates after unmount
*/