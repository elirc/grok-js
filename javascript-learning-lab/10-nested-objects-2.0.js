/*
JUNIOR GOAL:
Confidently navigate and update deeply nested data structures that come from real APIs and complex state.

REAL WORLD USE CASE:
- User profiles with addresses and preferences
- Order objects containing items, payments, shipping
- Normalized vs denormalized data from GraphQL/REST

CONCEPTS COVERED:
- Safe navigation of deep structures
- Immutable deep updates
- Data normalization considerations
- Defensive coding for nested data
*/

// ============================================
// STEP 1: Safe deep access
// ============================================

function getShippingCity(order) {
  return order?.shipping?.address?.city ?? 'Unknown';
}

// ============================================
// STEP 2: Immutable deep update
// ============================================

function updateItemQuantity(order, itemId, newQty) {
  return {
    ...order,
    items: order.items.map(item =>
      item.id === itemId ? { ...item, quantity: newQty } : item
    )
  };
}

// ============================================
// STEP 3: Working with nested API responses
// ============================================

function extractActiveUsers(response) {
  return response?.data?.users?.filter(u => u.status === 'active') ?? [];
}

/*
DEEPER BREAKDOWN:

?. operator chains
- Prevents crashes on missing paths.

map + spread for nested arrays
- Standard pattern when updating items in a list inside an object.

Defensive defaults
- Always provide fallbacks when dealing with external data.

JUNIOR PERSPECTIVE:

You will spend a lot of time massaging nested API data.
Learn to write transformations that are resilient.

COMMON PITFALLS IN PRODUCTION:

1. Crashing on missing nested properties from third-party APIs.
2. Creating deeply nested update logic that is hard to test.
3. Accidentally sharing references when updating nested objects.

EXPERIMENTS:

1. Write a utility function get(object, path, defaultValue).
2. Implement a function that can update any nested path immutably.

JUNIOR CHALLENGE:

Given a deeply nested order object, write functions to:
- Get the full shipping address as a single string
- Update the status of a specific line item
- Calculate total without mutating the original
*/