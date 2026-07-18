/*
JUNIOR GOAL:
Write functions that are predictable, testable, and follow good software engineering practices.

REAL WORLD USE CASE:
- Service functions and utilities in applications
- API clients and data access layers
- Reusable business logic

CONCEPTS COVERED:
- Pure functions and side effects
- Function naming and single responsibility
- Default parameters and overload thinking
- Documentation through code
*/

// ============================================
// STEP 1: Pure function preference
// ============================================

function calculateShippingCost(weight, zone) {
  // No side effects, same inputs = same output
  const rates = { local: 5, international: 15 };
  return (rates[zone] ?? 10) * Math.ceil(weight);
}

// ============================================
// STEP 2: Named and focused
// ============================================

function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ============================================
// STEP 3: Encapsulating complexity
// ============================================

function createApiClient(baseUrl) {
  return {
    get: (path) => fetch(`${baseUrl}${path}`),
    post: (path, body) => fetch(`${baseUrl}${path}`, { method: 'POST', body: JSON.stringify(body) })
  };
}

/*
DEEPER BREAKDOWN:

Pure functions
- Easier to test, reason about, and compose.

Single responsibility
- A function should do one thing well.

Factory functions like createApiClient
- Common pattern for configuration and encapsulation.

JUNIOR PERSPECTIVE:

Functions are the primary unit of code organization.
Well-named, focused functions make codebases maintainable.

COMMON PITFALLS IN PRODUCTION:

1. Functions with hidden side effects (console, localStorage, global state).
2. Functions that do too many things.
3. Magic numbers and strings inside functions instead of parameters.

EXPERIMENTS:

1. Refactor a side-effecting function into a pure one + caller handles effects.
2. Write a higher-order function that adds logging to any function.

JUNIOR CHALLENGE:

Create a function library for a shopping domain:
- calculateSubtotal(items)
- applyDiscount(subtotal, code)
- calculateFinalTotal(subtotal, discount, taxRate)

All functions should be pure and well-typed via JSDoc or comments.
*/