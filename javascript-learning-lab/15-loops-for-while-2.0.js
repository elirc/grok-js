/*
JUNIOR GOAL:
Choose the right looping construct for the job and understand performance and readability tradeoffs.

REAL WORLD USE CASE:
- Processing large datasets
- Implementing custom iterators
- Working with streams or generators
- Legacy code maintenance

CONCEPTS COVERED:
- for...of vs forEach vs traditional for
- Breaking and continuing effectively
- Performance implications
- Modern alternatives (Array methods)
*/

// ============================================
// STEP 1: for...of for readability
// ============================================

for (const user of users) {
  if (user.status === 'inactive') continue;
  processUser(user);
}

// ============================================
// STEP 2: When traditional for is still useful
// ============================================

function processInBatches(items, batchSize) {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    processBatch(batch);
  }
}

// ============================================
// STEP 3: Breaking early
// ============================================

function findFirstMatch(items, predicate) {
  for (const item of items) {
    if (predicate(item)) return item;
  }
  return null;
}

/*
DEEPER BREAKDOWN:

for...of is usually the best default for arrays.
forEach cannot break or continue easily.

Traditional for gives full control over iteration.

JUNIOR PERSPECTIVE:

Prefer declarative array methods when possible.
Fall back to explicit loops when you need early exit or complex control flow.

COMMON PITFALLS IN PRODUCTION:

1. Using forEach when you need to break.
2. Off-by-one errors in manual index loops.
3. Infinite loops from incorrect while conditions.

EXPERIMENTS:

1. Implement your own forEach that supports breaking.
2. Compare performance of for vs forEach on large arrays.

JUNIOR CHALLENGE:

Write a function that processes an array and stops after finding 5 items that match a condition or after 1000 items, whichever comes first.
*/