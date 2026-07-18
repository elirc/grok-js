/*
JUNIOR GOAL:
Deepen understanding of variable declarations, mutability, and reference vs value semantics in JavaScript.
Focus on real-world implications for state management, configuration, and avoiding subtle bugs in larger codebases.

REAL WORLD USE CASE:
In production apps, variables hold configuration, user sessions, cached API responses, feature flags, and shared state objects.
Incorrect use of let/const or misunderstanding references leads to bugs like unintended mutations in Redux stores, React state, or shared services.

CONCEPTS COVERED:
- let vs const in modern codebases
- Reference vs value types and mutation
- Object.freeze and defensive copying
- Temporal dead zone and block scoping in practice
- Patterns for immutable updates
*/

// ============================================
// STEP 1: const for configuration and identity
// ============================================

// In real apps, use const for anything that shouldn't be reassigned.
const API_BASE = 'https://api.example.com/v1';
const MAX_RETRIES = 3;

// These are safe because primitives are immutable by nature.
const userSession = { id: 'u_123', token: 'abc' };

// Reassignment would be a code smell or bug in most cases:
// userSession = {}; // Avoid - breaks references held elsewhere

// ============================================
// STEP 2: Mutation vs reassignment with objects
// ============================================

const cart = {
  items: [],
  total: 0
};

// This mutates the object (bad if shared)
cart.items.push({ id: 1, qty: 2 });

// Safer pattern: create new objects
const updatedCart = {
  ...cart,
  items: [...cart.items, { id: 2, qty: 1 }],
  total: cart.total + 19.99
};

// ============================================
// STEP 3: Using Object.freeze for constants
// ============================================

const APP_CONFIG = Object.freeze({
  features: Object.freeze({
    darkMode: true,
    beta: false
  }),
  limits: Object.freeze({
    maxUploadMB: 50
  })
});

// APP_CONFIG.limits.maxUploadMB = 100; // Silently fails in non-strict, or throws in strict

// ============================================
// STEP 4: let for controlled mutation (rare but valid)
// ============================================

// Sometimes let is appropriate for accumulators or loop state.
function calculateRollingAverage(values) {
  let sum = 0;
  let count = 0;

  return values.map(value => {
    sum += value;
    count += 1;
    return sum / count;
  });
}

// ============================================
// STEP 5: Block scoping in real modules
// ============================================

function processOrders(orders) {
  const results = [];

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i]; // Block scoped to iteration
    if (order.status === 'pending') {
      results.push(order);
    }
  }

  // 'order' and 'i' are not accessible here
  return results;
}

/*
DEEPER BREAKDOWN:

const userSession = { ... }
- Prevents reassignment of the binding.
- Does NOT prevent mutation of the object it references.
- In teams, this signals intent clearly to other developers.

const updatedCart = { ...cart, items: [...cart.items, ...] }
- Creates a new object reference.
- Critical for libraries like React, Redux, and any time you rely on reference equality.

Object.freeze(...)
- Provides shallow immutability.
- For deep protection, use libraries like immer or deep-freeze in development.

let sum = 0;
- Acceptable when the variable is truly being accumulated in a controlled scope.
- Still prefer reduce for pure transformations.

for (let i = 0; ...)
- 'let' here creates a new binding per iteration, avoiding classic closure bugs.

JUNIOR PERSPECTIVE:

As a junior SWE, you will spend more time debugging "why did this object change unexpectedly" than writing new variable declarations.
Favor const + immutable updates. Use let only when you have a clear reason (accumulators, loops).

COMMON PITFALLS IN PRODUCTION:

1. Mutating objects passed as props or stored in state.
2. Assuming const means the value inside is immutable.
3. Reusing the same object reference across multiple components or services.
4. Using var in legacy code that leaks across modules.

EXPERIMENTS:

1. Take a nested config object and try mutating it after Object.freeze. Observe behavior in strict mode.
2. Implement a pure function that takes a cart and returns an updated version without any mutations.
3. Create a module-level const that holds a Map or Set and experiment with adding values.

JUNIOR CHALLENGE:

Refactor the following to use only const and immutable patterns:

let user = { id: 1, profile: { name: 'Alex' } };
user.profile.name = 'Sam';
user = { ...user, lastLogin: Date.now() };

Return the final shape and explain every change.
*/