/*
JUNIOR GOAL:
Understand numeric precision issues, safe arithmetic patterns, and when to reach for specialized numeric handling in JavaScript.

REAL WORLD USE CASE:
- Financial calculations (prices, taxes, discounts)
- Pagination and offsets
- Statistical aggregations
- Game logic, progress bars, and animation timing
- Working with IDs and large integers

CONCEPTS COVERED:
- IEEE 754 floating point limitations
- Using toFixed and parseFloat correctly
- BigInt for large integers
- Math methods for production (floor, round, trunc)
- Safe integer checks
*/

// ============================================
// STEP 1: Floating point gotchas in money
// ============================================

function calculateTotalWithTax(subtotal, taxRate) {
  // Never do this in production:
  // const total = subtotal * (1 + taxRate);

  // Better: work in cents or use a money library
  const subtotalCents = Math.round(subtotal * 100);
  const taxCents = Math.round(subtotalCents * taxRate);
  return (subtotalCents + taxCents) / 100;
}

// ============================================
// STEP 2: Safe pagination calculations
// ============================================

function getPageInfo(totalItems, pageSize, currentPage) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const offset = (currentPage - 1) * pageSize;
  const hasNext = currentPage < totalPages;

  return {
    totalPages,
    offset,
    limit: pageSize,
    hasNext
  };
}

// ============================================
// STEP 3: Using BigInt when needed
// ============================================

const largeId = 9007199254740993n; // Beyond Number.MAX_SAFE_INTEGER
const nextId = largeId + 1n;

// ============================================
// STEP 4: Robust rounding utilities
// ============================================

function roundToDecimals(value, decimals) {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

/*
DEEPER BREAKDOWN:

subtotal * (1 + taxRate)
- Classic source of 0.1 + 0.2 !== 0.3 bugs.
- Always consider working in the smallest unit (cents) when dealing with money.

Math.ceil(totalItems / pageSize)
- Correct way to calculate total pages.
- Watch for off-by-one errors when page numbers are 1-based vs 0-based.

BigInt
- Use when you need exact integer values larger than 2^53-1.
- Cannot mix with regular numbers without explicit conversion.

Number.EPSILON
- Useful trick to reduce floating point rounding errors.

JUNIOR PERSPECTIVE:

Juniors often introduce money bugs in their first few months.
Always ask: "Is this value going to be displayed to users or sent to a payment system?"

COMMON PITFALLS IN PRODUCTION:

1. Using floating point for currency.
2. Incorrect pagination when total count changes between requests.
3. Forgetting that parseInt('08') can behave unexpectedly in old environments.
4. Losing precision when serializing large IDs to JSON.

EXPERIMENTS:

1. Demonstrate 0.1 + 0.2 and fix it using cents approach.
2. Implement a function that safely adds an array of prices.
3. Handle a scenario with very large user IDs using BigInt.

JUNIOR CHALLENGE:

Build a function that calculates order totals including:
- Line item subtotals
- Percentage discount applied at order level
- Fixed shipping cost
- Tax calculated only on items after discount

All calculations must avoid floating point issues. Return the final total as a number with exactly two decimal places.
*/