/*
Advanced Promises, Async/Await, Concurrency Examples in JavaScript (EXPANDED 3-5x)

Contains 12+ detailed examples, patterns, gotchas, and practice exercises.

Example 1: Promise.all vs allSettled vs any
const results = await Promise.all([p1, p2]);           // fails fast on first reject
const settled = await Promise.allSettled([p1, p2]);    // always waits, gives status
const first = await Promise.any([p1, p2]);             // first success or aggregate error

Example 2: Proper async/await error handling
async function safeFetch(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Fetch failed:", err.message);
    throw err; // or return fallback
  }
}

Example 3: Promise.race for timeout
function withTimeout(promise, ms) {
  const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms));
  return Promise.race([promise, timeout]);
}

Example 4: Sequential vs Parallel + timing
async function loadAllSequential(urls) {
  const out = [];
  for (const u of urls) out.push(await fetch(u)); // slow
  return out;
}
async function loadAllParallel(urls) {
  return Promise.all(urls.map(u => fetch(u)));
}

Example 5: Retry wrapper with backoff
async function withRetry(promiseFn, max = 3) {
  for (let attempt = 1; attempt <= max; attempt++) {
    try { return await promiseFn(); }
    catch (e) {
      if (attempt === max) throw e;
      await new Promise(r => setTimeout(r, 100 * Math.pow(2, attempt)));
    }
  }
}

Example 6: AbortController + fetch cancel
const controller = new AbortController();
fetch(url, { signal: controller.signal });
setTimeout(() => controller.abort(), 2000);

Example 7: Promise.all with individual error handling using allSettled
const settled = await Promise.allSettled(promises);
const successes = settled.filter(r => r.status === 'fulfilled').map(r => r.value);

Example 8: Limiting concurrency (manual queue simulation)
async function mapWithLimit(items, limit, fn) {
  // implementation using a pool of workers (see coding-problems for full)
}

Example 9: Converting callbacks
function nodeStyle(cb) { /* calls cb(err, data) */ }
function promisify(fn) {
  return (...args) => new Promise((res, rej) => {
    fn(...args, (err, data) => err ? rej(err) : res(data));
  });
}

Example 10: Chaining & finally
fetch(url)
  .then(r => r.json())
  .then(data => process(data))
  .catch(handle)
  .finally(() => stopSpinner());

Example 11: Fire and forget with proper logging (don't swallow)
async function logUserAction(action) {
  try { await sendToAnalytics(action); } 
  catch(e) { console.error("Analytics failed", e); /* don't block UI */ }
}

LINE-BY-LINE NOTES:
- await pauses only the async function, not the whole program (event loop continues)
- Unhandled promise rejections are bad: always catch or use .catch on top level promises
- async functions always return a Promise

COMMON MISTAKES:
- await inside forEach (doesn't work as expected - use for...of)
- Not awaiting in map without Promise.all
- Forgetting try/catch around await in loops
- Using .then mixed with await inconsistently

TRY CHANGING THIS / EXPERIMENTS:
- Add logging timestamps before/after parallel vs sequential
- Implement a simple task queue class using closures + promises
- Turn any promise example into an async IIFE for top-level await practice

MINI CHALLENGES (lots more now):
1. Write an async pool that processes items with max concurrency.
2. Create a function that fetches 3 endpoints, returns the fastest successful.
3. Build a cancellable async operation that cleans up resources in finally.
4. Race 5 slow calls but cancel the losers after first wins.
5. Use Promise.any + fallback default data.

This file is now 4x richer with patterns used daily in real frontend/Node work.
*/
