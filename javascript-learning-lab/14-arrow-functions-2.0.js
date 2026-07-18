/*
JUNIOR GOAL:
Use arrow functions appropriately, understanding their differences from regular functions in real codebases.

REAL WORLD USE CASE:
- Array method callbacks
- Event handlers
- Higher-order functions and currying
- React component definitions and hooks

CONCEPTS COVERED:
- Lexical this binding
- Implicit vs explicit returns
- When to prefer regular functions
- Conciseness vs readability
*/

// ============================================
// STEP 1: Lexical this in practice
// ============================================

const logger = {
  prefix: '[APP]',
  log(message) {
    // Regular function preserves this
    console.log(this.prefix, message);
  },
  delayedLog: function(message) {
    setTimeout(() => {
      // Arrow captures this from surrounding scope
      console.log(this.prefix, message);
    }, 100);
  }
};

// ============================================
// STEP 2: Concise transformations
// ============================================

const activeUsers = users
  .filter(u => u.active)
  .map(u => ({ id: u.id, name: u.name }));

// ============================================
// STEP 3: When to avoid arrows
// ============================================

// Methods on objects often better as regular functions
const api = {
  getData() {
    // Can use this here if needed
  }
};

/*
DEEPER BREAKDOWN:

Arrow functions capture this from declaration context.
This is why they are preferred in callbacks.

Implicit return only when single expression.

JUNIOR PERSPECTIVE:

Arrow functions are default for most callbacks.
Regular functions are still important for methods and constructors.

COMMON PITFALLS IN PRODUCTION:

1. Using arrow functions as object methods and losing this.
2. Overusing implicit returns that become hard to debug.
3. Forgetting that arrows cannot be used as constructors.

EXPERIMENTS:

1. Compare behavior of arrow vs regular function assigned to an object method.
2. Create a curried function using arrows.

JUNIOR CHALLENGE:

Refactor a class method that uses .bind or var self = this into modern arrow function patterns where appropriate.
*/