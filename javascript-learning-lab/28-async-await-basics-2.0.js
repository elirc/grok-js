/*
JUNIOR GOAL:
Write clean asynchronous code using async/await with proper error handling and concurrent operations.

REAL WORLD USE CASE:
- Sequential and parallel data fetching
- Complex business workflows
- Working with multiple API endpoints

CONCEPTS COVERED:
- try/catch with async
- Promise.all and Promise.allSettled
- Sequential vs parallel execution
- Error propagation
*/

// ============================================
// STEP 1: Parallel vs sequential
// ============================================

// Sequential
const user = await getUser();
const posts = await getPosts(user.id);

// Parallel
const [user, posts] = await Promise.all([
  getUser(),
  getPosts()
]);

// ============================================
// STEP 2: Handling partial failures
// ============================================

const results = await Promise.allSettled([
  riskyCall1(),
  riskyCall2()
]);

// ============================================
// STEP 3: Error handling patterns
// ============================================

async function safeGetUser(id) {
  try {
    return await getUser(id);
  } catch (error) {
    console.error('Failed to load user', error);
    return null;
  }
}

/*
DEEPER BREAKDOWN:

Promise.all fails fast on first rejection.
Promise.allSettled gives you all results.

Always consider whether operations can run in parallel.

JUNIOR PERSPECTIVE:

async/await makes async code look synchronous, but you must still think about concurrency and failure modes.

COMMON PITFALLS IN PRODUCTION:

1. Unnecessarily sequential awaits.
2. Not handling errors in parallel operations.
3. Forgetting that async functions always return promises.

EXPERIMENTS:

1. Fetch multiple independent resources in parallel.
2. Use allSettled and filter successful results.

JUNIOR CHALLENGE:

Build a dashboard loader that:
- Fetches user, stats, and recent activity in parallel
- Handles individual failures gracefully
- Shows loading state until all succeed or enough data is ready
*/