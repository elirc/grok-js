/*
MID-LEVEL GOAL:
Effectively use the built-in collection types (Map, Set, WeakMap, WeakSet) instead of plain objects and arrays when appropriate.

REAL WORLD USE CASE:
- Caching with object keys (WeakMap)
- Fast membership checks and deduplication (Set)
- Preserving insertion order and non-string keys (Map)
- Memory management with large or temporary data

CONCEPTS COVERED:
- Map vs Object differences
- Set for unique values
- WeakMap/WeakSet and garbage collection
- Iteration protocols
- Performance characteristics
*/

// ============================================
// STEP 1: Map advantages
// ============================================

const scores = new Map();
scores.set({ id: 1 }, 95);        // object key
scores.set('total', 1000);

for (const [key, value] of scores) { /* ... */ }

// ============================================
// STEP 2: Set for fast lookup
// ============================================

const activeIds = new Set([1, 2, 3]);
const isActive = activeIds.has(userId); // O(1)

// ============================================
// STEP 3: WeakMap for caching without leaks
// ============================================

const cache = new WeakMap();

function process(obj) {
  if (cache.has(obj)) return cache.get(obj);
  const result = heavyComputation(obj);
  cache.set(obj, result);
  return result;
}

// When obj is no longer referenced elsewhere, it can be GC'd even if in the cache.

/*
DEEPER BREAKDOWN:

Map preserves insertion order and allows any value as key.
Set automatically handles uniqueness.

Weak collections do not prevent garbage collection of their keys — critical for avoiding memory leaks with large objects.

MID-LEVEL PERSPECTIVE:

Choosing the right data structure has real performance and correctness implications.

COMMON PITFALLS:

- Using objects as maps and losing non-string keys or order
- Holding strong references in caches that prevent cleanup
- Iterating Sets/Maps incorrectly (for...of vs forEach)

EXPERIMENTS:

1. Benchmark Set.has vs Array.includes on large collections.
2. Demonstrate a memory leak scenario fixed by switching to WeakMap.
3. Implement a simple LRU cache using Map.

MID-LEVEL CHALLENGE:

Create a generic memoization utility that:
- Uses WeakMap when the primary argument is an object
- Falls back to Map with stringified keys for primitives
- Supports multiple arguments
- Has a configurable max size with eviction
*/