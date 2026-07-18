/*
JUNIOR GOAL:
Master reliable comparison patterns, truthiness gotchas, and how to write clear boolean logic in complex conditional flows.

REAL WORLD USE CASE:
- Permission systems and feature flags
- Form validation states
- API response status handling
- Filtering and search logic

CONCEPTS COVERED:
- Strict equality and why == is dangerous
- Truthy/falsy values and explicit checks
- Short-circuit evaluation for guards
- Boolean coercion in real code
*/

// ============================================
// STEP 1: Always prefer strict equality
// ============================================

const status = '200';

if (status === 200) {
  // Never true - type mismatch
}

// Use explicit conversion when needed:
if (Number(status) === 200) { }

// ============================================
// STEP 2: Explicit boolean checks in production
// ============================================

function canAccessFeature(user, featureFlag) {
  // Avoid: if (user.isAdmin)
  // Better:
  if (user.isAdmin === true && featureFlag.enabled === true) {
    return true;
  }
  return false;
}

// ============================================
// STEP 3: Guard clauses with short-circuit
// ============================================

function processPayment(amount, paymentMethod) {
  if (!amount || amount <= 0) return { success: false, reason: 'invalid amount' };
  if (!paymentMethod) return { success: false, reason: 'no payment method' };

  // Proceed with payment...
}

// ============================================
// STEP 4: Handling nullable booleans from APIs
// ============================================

const apiResponse = { isVerified: null }; // Sometimes missing

const isVerified = Boolean(apiResponse.isVerified ?? false);

/*
DEEPER BREAKDOWN:

status === 200 vs status == 200
- Always use === unless you have a very specific reason.
- Coercion leads to surprising bugs.

user.isAdmin === true
- Makes the intent explicit when the value might be truthy but not boolean.

!amount || amount <= 0
- Common guard pattern. Short-circuits early.

?? (nullish coalescing)
- Different from || . Only falls back on null or undefined, not 0 or false.

JUNIOR PERSPECTIVE:

Boolean logic is where many off-by-one and permission bugs hide.
Write conditions that a teammate can read in 2 seconds without mental gymnastics.

COMMON PITFALLS IN PRODUCTION:

1. Using !!user.isActive when the backend might send "true" as string.
2. Treating 0 as a valid value but using if (value) checks.
3. Complex nested && || without parentheses.
4. Relying on API booleans being actual booleans.

EXPERIMENTS:

1. Create a function that safely normalizes any value into a strict boolean.
2. Write a permission checker with multiple rules using guard clauses.
3. Test how nullish coalescing differs from logical OR with various falsy values.

JUNIOR CHALLENGE:

Implement a function hasPermission(user, action, resource) that handles:
- user.roles as array of strings
- resource.ownerId
- A set of feature flags

Use explicit comparisons and avoid implicit truthiness where possible.
*/