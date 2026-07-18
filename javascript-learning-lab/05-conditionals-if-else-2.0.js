/*
JUNIOR GOAL:
Write maintainable conditional logic using early returns, lookup tables, and strategy patterns instead of deeply nested if/else chains.

REAL WORLD USE CASE:
- Business rule engines
- Status machines for orders, payments, users
- A/B testing and feature flag evaluation
- API response handling with multiple error cases

CONCEPTS COVERED:
- Guard clauses and early returns
- Lookup tables / maps for dispatch
- Switch vs object lookup
- State machine thinking
*/

// ============================================
// STEP 1: Prefer early returns
// ============================================

function calculateDiscount(user, orderTotal) {
  if (!user) return 0;
  if (orderTotal <= 0) return 0;
  if (user.isBanned) return 0;

  if (user.membership === 'premium') {
    return orderTotal * 0.15;
  }

  if (user.membership === 'standard' && orderTotal > 100) {
    return orderTotal * 0.05;
  }

  return 0;
}

// ============================================
// STEP 2: Lookup table for status handling
// ============================================

const statusHandlers = {
  pending: () => ({ label: 'Processing', color: 'yellow' }),
  shipped: () => ({ label: 'Shipped', color: 'blue' }),
  delivered: () => ({ label: 'Delivered', color: 'green' }),
  cancelled: () => ({ label: 'Cancelled', color: 'red' }),
};

function getOrderStatusInfo(status) {
  return statusHandlers[status]?.() ?? { label: 'Unknown', color: 'gray' };
}

// ============================================
// STEP 3: Avoiding nested conditionals
// ============================================

function validateOrder(order) {
  const errors = [];

  if (order.items.length === 0) errors.push('No items');
  if (!order.shippingAddress) errors.push('Missing address');
  if (order.total < 1) errors.push('Invalid total');

  return errors;
}

/*
DEEPER BREAKDOWN:

Early returns reduce cognitive load.
You handle error/edge cases first, then the happy path remains clean.

Lookup tables
- Excellent for mapping discrete values to behavior.
- Much easier to extend than long if/else or switch.

statusHandlers[status]?.()
- Optional chaining + nullish makes this robust.

JUNIOR PERSPECTIVE:

Deeply nested conditionals are a major source of bugs during maintenance.
When you find yourself writing else if more than twice, consider a lookup or polymorphism.

COMMON PITFALLS IN PRODUCTION:

1. Mutating data inside complex conditional branches.
2. Forgetting to handle the "default" case.
3. Business logic spread across many nested conditions instead of centralized.

EXPERIMENTS:

1. Refactor a 5-level nested if into early returns + lookup.
2. Create a small state machine for a task (todo → in-progress → done → archived).

JUNIOR CHALLENGE:

Build a function that evaluates a user subscription status with multiple rules:
- Trial period
- Payment failed
- Grace period
- Active / suspended

Return a single normalized status object using a lookup table approach.
*/