/*
JUNIOR GOAL:
Design functions that communicate success/failure and data clearly through their return values.

REAL WORLD USE CASE:
- API response wrappers
- Result types in business logic
- Error handling strategies without exceptions

CONCEPTS COVERED:
- Returning consistent shapes
- Using objects for rich return values
- Either/Result patterns
- Avoiding magic return values
*/

// ============================================
// STEP 1: Structured returns
// ============================================

function createUser(data) {
  if (!data.email) {
    return { success: false, error: 'Email is required' };
  }
  return { success: true, data: { id: 'u_123', ...data } };
}

// ============================================
// STEP 2: Consistent error handling
// ============================================

function parseJSONSafe(str) {
  try {
    return { ok: true, value: JSON.parse(str) };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

// ============================================
// STEP 3: Multiple return paths
// ============================================

function getDiscountRate(user) {
  if (!user) return 0;
  if (user.tier === 'vip') return 0.2;
  if (user.orders > 10) return 0.1;
  return 0;
}

/*
DEEPER BREAKDOWN:

{ success, data, error }
- Common pattern that makes calling code clearer.

Early return of simple values
- Sometimes a primitive is enough.

JUNIOR PERSPECTIVE:

Return values are part of your function's public API.
Make them predictable and easy to consume.

COMMON PITFALLS IN PRODUCTION:

1. Returning different types depending on outcome (string or object).
2. Using null/undefined to mean "not found" without documentation.
3. Throwing exceptions for expected business logic failures.

EXPERIMENTS:

1. Convert a function that throws into one that returns a result object.
2. Create a small Either-like helper.

JUNIOR CHALLENGE:

Write a function processOrder(order) that returns a rich result object containing:
- success
- orderId or error
- appliedDiscount
- finalTotal
Handle multiple failure cases explicitly.
*/