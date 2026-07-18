/*
MID-LEVEL GOAL:
Understand and use iterators, generators, and async iterators to create custom iterable behavior and lazy sequences.

REAL WORLD USE CASE:
- Processing large or infinite datasets lazily
- Custom data structures (trees, graphs)
- Async iteration over streams, paginated APIs, or WebSockets
- Implementing custom for...of / spread / destructuring support

CONCEPTS COVERED:
- Iterable and Iterator protocols
- Generator functions and yield
- yield* delegation
- Async generators and for await...of
- Memory and performance characteristics
*/

// ============================================
// STEP 1: Basic generator
// ============================================

function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for (const n of range(1, 5)) {
  console.log(n); // 1,2,3,4,5  (lazy)
}

// ============================================
// STEP 2: Delegation and composition
// ============================================

function* flatten(arrays) {
  for (const arr of arrays) {
    yield* arr; // delegate to another iterable
  }
}

// ============================================
// STEP 3: Async generator
// ============================================

async function* fetchPages(baseUrl) {
  let page = 1;
  while (true) {
    const res = await fetch(`${baseUrl}?page=${page}`);
    const data = await res.json();
    if (!data.length) break;
    yield data;
    page++;
  }
}

for await (const page of fetchPages('/api/items')) {
  console.log('Got page:', page);
}

/*
DEEPER BREAKDOWN:

Generators pause execution and can be resumed.
They are both producers and consumers (yield and next(value)).

Async generators combine generators with promises for async sequences.

These power many advanced patterns including custom observables and streaming.

MID-LEVEL PERSPECTIVE:

Iterators/generators give you lazy evaluation and custom control flow. They are underused but extremely powerful once understood.

COMMON PITFALLS:

- Consuming a generator multiple times (they're one-shot)
- Blocking the event loop with synchronous generators on large data
- Forgetting to handle errors in async generators

EXPERIMENTS:

1. Create a generator that yields Fibonacci numbers lazily up to a limit.
2. Implement a tree traversal generator (depth-first or breadth-first).
3. Build an async generator that polls an API until a condition is met.

MID-LEVEL CHALLENGE:

Create a `chunked` async generator that takes an async iterable (e.g. large file or paginated API) and yields fixed-size batches. It must be cancelable and handle backpressure conceptually.
*/