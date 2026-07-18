/*
JUNIOR GOAL:
Design good function signatures with proper parameter handling, validation, and flexibility.

REAL WORLD USE CASE:
- Public API design for internal libraries
- Handling optional configuration objects
- Building flexible utility functions

CONCEPTS COVERED:
- Options objects vs positional parameters
- Destructuring parameters
- Rest parameters and spread in calls
- Input validation at boundaries
*/

// ============================================
// STEP 1: Options object pattern
// ============================================

function fetchUsers({ page = 1, limit = 20, search = '', sort = 'created' } = {}) {
  // Implementation
  return { page, limit, search, sort };
}

// ============================================
// STEP 2: Rest and spread
// ============================================

function log(level, ...messages) {
  console[level](new Date().toISOString(), ...messages);
}

// ============================================
// STEP 3: Defensive argument handling
// ============================================

function updateProfile(userId, updates = {}) {
  if (typeof userId !== 'string') throw new Error('userId must be string');
  if (Object.keys(updates).length === 0) return null;

  // proceed
}

/*
DEEPER BREAKDOWN:

Destructuring in parameters
- Clean way to handle many optional values.

Rest parameters
- Collect remaining arguments into an array.

Validation at entry
- Fail fast with clear errors.

JUNIOR PERSPECTIVE:

Good argument design reduces bugs downstream and makes functions easier to use and test.

COMMON PITFALLS IN PRODUCTION:

1. Too many positional parameters.
2. Not validating inputs from untrusted sources.
3. Overly flexible functions that are hard to understand.

EXPERIMENTS:

1. Refactor a function with 5+ parameters into an options object.
2. Create a variadic function that joins strings with a configurable separator.

JUNIOR CHALLENGE:

Design and implement a function searchProducts(filters) that accepts an options object with:
- query, category, minPrice, maxPrice, inStockOnly, page, pageSize

Provide sensible defaults and validation.
*/