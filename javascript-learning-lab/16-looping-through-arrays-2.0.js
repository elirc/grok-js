/*
JUNIOR GOAL:
Apply different iteration strategies to arrays with awareness of readability, performance, and side effects.

REAL WORLD USE CASE:
- Rendering lists in UI frameworks
- Data processing pipelines
- Event processing and batch jobs

CONCEPTS COVERED:
- for...of with entries()
- forEach gotchas
- for vs map/filter/reduce tradeoffs
- Iteration protocols
*/

// ============================================
// STEP 1: Getting index and value
// ============================================

for (const [index, item] of items.entries()) {
  console.log(index, item);
}

// ============================================
// STEP 2: forEach limitations
// ============================================

items.forEach((item, index) => {
  if (item.invalid) return; // Only skips current callback, not the loop
  process(item);
});

// ============================================
// STEP 3: Choosing the right tool
// ============================================

// Use for...of when you need break/continue or complex logic
// Use map when transforming
// Use filter when selecting
// Use reduce when aggregating

/*
DEEPER BREAKDOWN:

.entries() gives you both index and value cleanly.

forEach is fine for simple side effects but cannot short-circuit.

JUNIOR PERSPECTIVE:

Know the strengths of each iteration method. Choosing the wrong one is a common source of confusing code.

COMMON PITFALLS IN PRODUCTION:

1. Expecting forEach to stop early.
2. Using map when you don't need the returned array (causes unnecessary work).

EXPERIMENTS:

1. Implement breakable forEach using a for loop.
2. Benchmark different iteration methods.

JUNIOR CHALLENGE:

Given an array of events, write code that:
- Logs the first 10 error events
- Collects all unique userIds from events after a certain date
Use appropriate iteration techniques for each task.
*/