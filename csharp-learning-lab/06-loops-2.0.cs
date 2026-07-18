/*
JUNIOR GOAL:
Choose and implement the most appropriate looping construct for performance, readability, and correctness in real-world data processing scenarios.

REAL WORLD USE CASE:
Processing large datasets, streaming data, parallel processing, and avoiding common bugs like off-by-one errors or collection modification during iteration.

CONCEPTS COVERED:
- for vs foreach vs while performance
- yield return and lazy evaluation
- Parallel.ForEach and PLINQ
- Span-based iteration
- Avoiding closure pitfalls in loops
*/

// ============================================
// STEP 1: When to use which loop
// ============================================

// Prefer foreach for readability when index not needed
foreach (var item in collection) { }

// Use for when you need the index or custom stepping
for (int i = 0; i < collection.Count; i += 2) { }

// ============================================
// STEP 2: yield return for lazy sequences
// ============================================

public IEnumerable<int> GetEvenNumbers(int max)
{
    for (int i = 0; i <= max; i += 2)
        yield return i;   // produces values on demand
}

// ============================================
// STEP 3: Parallel processing
// ============================================

Parallel.ForEach(items, item =>
{
    Process(item);
});

// ============================================
// STEP 4: Modern Span iteration
// ============================================

ReadOnlySpan<int> data = stackalloc int[] { 1, 2, 3 };
for (int i = 0; i < data.Length; i++)
{
    // zero allocation iteration
}

/*
DEEPER BREAKDOWN:

foreach is often as fast as for because the JIT optimizes it.

yield return creates a state machine — great for large or infinite sequences but has overhead.

Parallel.ForEach is excellent for CPU-bound work but can cause problems with shared state or I/O.

JUNIOR PERSPECTIVE:

Always measure. A well-written foreach is usually fine. Use Parallel only when the work per item is significant and independent.

COMMON PITFALLS IN PRODUCTION:

- Modifying a collection while iterating with foreach.
- Capturing loop variables in lambdas (mostly fixed in modern C# but still watch closures).
- Using Parallel.ForEach with blocking I/O.
- Forgetting to materialize lazy sequences when needed (multiple enumeration).

EXPERIMENTS:

1. Benchmark foreach vs for on a large array using BenchmarkDotNet.
2. Implement a custom iterator using yield return that reads lines from a large file lazily.
3. Compare sequential vs Parallel.ForEach on a CPU-heavy workload.

JUNIOR CHALLENGE:

Write a method that processes a large list in parallel batches (e.g. 100 items at a time) while respecting a CancellationToken and reporting progress.
Use both traditional loops and modern constructs.
*/