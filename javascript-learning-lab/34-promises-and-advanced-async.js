/*
MID-LEVEL GOAL:
Master the Promise API and advanced async patterns including concurrency control, cancellation, and error handling strategies.

REAL WORLD USE CASE:
- API clients with retry/backoff
- Batch processing with concurrency limits
- Cancelable operations in SPAs
- Building robust data pipelines

CONCEPTS COVERED:
- Promise states and microtask queue
- Promise.all / allSettled / any / race
- Cancellation with AbortController
- Sequential vs concurrent execution control
- Building custom promise utilities
*/

// ============================================
// STEP 1: Concurrency control
// ============================================

async function mapWithConcurrency(items, fn, limit) {
  const results = [];
  let i = 0;

  async function worker() {
    while (i < items.length) {
      const index = i++;
      results[index] = await fn(items[index]);
    }
  }

  const workers = Array.from({ length: limit }, worker);
  await Promise.all(workers);
  return results;
}

// ============================================
// STEP 2: Cancellation pattern
// ============================================

async function fetchWithCancel(url, signal) {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(res.status);
  return res.json();
}

// Usage with AbortController
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000);
const data = await fetchWithCancel('/api/data', controller.signal);

// ============================================
// STEP 3: Retry with exponential backoff
// ============================================

async function withRetry(fn, retries = 3, delay = 100) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise(r => setTimeout(r, delay * (2 ** attempt)));
    }
  }
}

/*
DEEPER BREAKDOWN:

All .then/.catch/.finally callbacks run as microtasks.
This is why promises run before setTimeout (macrotask).

Promise.all fails fast; allSettled waits for everything.

AbortController is the standard way to cancel fetch and other async operations.

MID-LEVEL PERSPECTIVE:

You need to control concurrency, handle partial failures, and clean up resources. Raw async/await is not enough for production data fetching layers.

COMMON PITFALLS:

- Unbounded concurrency causing rate limit errors or OOM
- Not propagating cancellation signals
- Swallowing errors in parallel operations
- Retrying non-idempotent operations

EXPERIMENTS:

1. Implement a p-limit style concurrency limiter.
2. Add proper cleanup when an AbortSignal is triggered mid-operation.
3. Build a function that runs tasks with limited concurrency and collects successes/failures.

MID-LEVEL CHALLENGE:

Create an async utility called `runTasks` that accepts an array of task functions and options:
- concurrency
- retries per task
- abort signal

It should return an object with succeeded and failed results, and respect cancellation.
*/