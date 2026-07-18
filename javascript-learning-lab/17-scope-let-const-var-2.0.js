/*
JUNIOR GOAL:
Understand scoping rules deeply and how they affect closures, modules, and shared state.

REAL WORLD USE CASE:
- Module design and IIFE removal
- Closures in event handlers and callbacks
- Avoiding global state pollution

CONCEPTS COVERED:
- Block vs function scope in practice
- Closures and the lexical environment
- Module scope in ES modules
- Why var should be avoided
*/

// ============================================
// STEP 1: Closures in real code
// ============================================

function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    get: () => count
  };
}

// ============================================
// STEP 2: Block scope in loops and conditionals
// ============================================

if (true) {
  let message = 'inside';
}
// console.log(message); // ReferenceError

// ============================================
// STEP 3: Module scope
// ============================================

// In a real .js module, top level variables are scoped to the module.

let privateCache = new Map();

/*
DEEPER BREAKDOWN:

Closures capture variables from their declaration scope.
This is the foundation of many patterns (factories, private state).

ES modules provide clean module scope without IIFEs.

JUNIOR PERSPECTIVE:

Scope bugs are some of the hardest to debug.
Understanding where a variable lives is critical.

COMMON PITFALLS IN PRODUCTION:

1. Accidentally creating globals.
2. Capturing loop variables incorrectly (mostly fixed with let).
3. Shared mutable state at module level.

EXPERIMENTS:

1. Create a module with private state using closures.
2. Demonstrate the difference between var and let in a for loop with setTimeout.

JUNIOR CHALLENGE:

Build a simple rate limiter using closures that tracks calls per key over time.
*/