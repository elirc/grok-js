/*
JUNIOR GOAL:
Master the .NET collection ecosystem and know when to use Array, List, HashSet, Dictionary, Immutable collections, and Span-based alternatives.

REAL WORLD USE CASE:
High-performance data processing, caching, configuration, and API response modeling.

CONCEPTS COVERED:
- Array vs List performance and allocation
- HashSet for O(1) membership
- Immutable collections
- Collection expressions (C# 12)
- Memory<T> / Span<T> for slices without copying
*/

// ============================================
// STEP 1: Choosing the right collection
// ============================================

List<int> list = new();           // dynamic, good default
HashSet<string> unique = new();   // fast Contains, no duplicates
Dictionary<int, string> lookup = new(); // key -> value

// ============================================
// STEP 2: Immutable collections
// ============================================

var immutable = ImmutableList.Create(1, 2, 3);
var updated = immutable.Add(4); // returns new list

// ============================================
// STEP 3: Zero-copy with Span
// ============================================

int[] data = new int[1000];
Span<int> slice = data.AsSpan(100, 50); // no copy

/*
DEEPER BREAKDOWN:

List<T> is backed by an array and doubles capacity when full.
HashSet and Dictionary use hashing — watch for bad GetHashCode implementations.

Immutable collections are excellent for concurrent scenarios and functional-style code.

Span<T> allows slicing arrays and strings without allocation.

JUNIOR PERSPECTIVE:

Default to List<T> for most cases.
Use HashSet when you only care about membership.
Use Immutable* when sharing data across threads or want snapshot semantics.

COMMON PITFALLS IN PRODUCTION:

- Using List<T>.Contains on large lists (O(n) ).
- Forgetting that Dictionary keys must have stable GetHashCode.
- Returning mutable collections from public APIs.
- Unnecessary copying when Span would suffice.

EXPERIMENTS:

1. Compare performance of List.Contains vs HashSet.Contains on 100k items.
2. Use ImmutableList in a concurrent scenario.
3. Slice a large array using Span and process it without allocations.

JUNIOR CHALLENGE:

Create a high-performance deduplicating buffer that:
- Uses a HashSet internally
- Exposes a ReadOnlySpan<T> view
- Supports efficient AddRange
- Has a method to get distinct items as a new array only when needed
*/