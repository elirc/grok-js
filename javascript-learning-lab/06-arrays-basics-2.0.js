/*
JUNIOR GOAL:
Work with arrays in production patterns: immutable updates, deduplication, batch operations, and memory considerations.

REAL WORLD USE CASE:
- Managing lists of selected items, cart contents, notifications
- Normalizing API responses into arrays
- Performing bulk operations without mutating original data

CONCEPTS COVERED:
- Immutable array patterns
- Set for deduplication
- slice vs splice in practice
- Performance of various array operations
*/

// ============================================
// STEP 1: Immutable add / remove
// ============================================

const original = [1, 2, 3];

const withNewItem = [...original, 4];
const withoutFirst = original.slice(1);
const withoutValue = original.filter(x => x !== 2);

// ============================================
// STEP 2: Deduplication patterns
// ============================================

function uniqueById(items) {
  const seen = new Set();
  return items.filter(item => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

// ============================================
// STEP 3: Batch operations
// ============================================

function chunkArray(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/*
DEEPER BREAKDOWN:

[...original, newItem]
- Creates new array. Preferred in React/Redux.

Set
- Very fast for membership checks and deduping primitives.

.filter and .slice
- Always return new arrays. Good for immutability.

JUNIOR PERSPECTIVE:

You will frequently be asked to "update this list without mutating the original".
Master the spread + filter + map patterns.

COMMON PITFALLS IN PRODUCTION:

1. Mutating arrays passed from parent components or API cache.
2. Using indexOf or includes in large arrays (consider Set or Map).
3. Accidentally creating O(n²) behavior with nested loops over arrays.

EXPERIMENTS:

1. Compare performance of deduping 10k items with filter vs Set.
2. Implement a function that moves an item to a new index immutably.

JUNIOR CHALLENGE:

Given an array of order objects, write functions to:
- Remove all cancelled orders (immutably)
- Move a specific order to the front
- Group orders by status into an object
*/