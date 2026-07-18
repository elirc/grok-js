/*
JUNIOR GOAL:
Use useEffect correctly and avoid common synchronization and cleanup mistakes.

REAL WORLD USE CASE:
- Data fetching
- Subscriptions and event listeners
- DOM measurements and manipulations
- Analytics and logging

CONCEPTS COVERED:
- Dependency array rules
- Cleanup functions
- Avoiding infinite loops
- useEffect for synchronization vs side effects
*/

// ============================================
// STEP 1: Proper dependencies
// ============================================

useEffect(() => {
  const sub = subscribe(userId, handleUpdate);
  return () => sub.unsubscribe();
}, [userId]);

// ============================================
// STEP 2: Cleanup importance
// ============================================

useEffect(() => {
  const handler = () => { /* ... */ };
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler);
}, []);

// ============================================
// STEP 3: Fetching pattern
// ============================================

useEffect(() => {
  let cancelled = false;
  fetchData().then(data => {
    if (!cancelled) setData(data);
  });
  return () => { cancelled = true; };
}, [id]);

/*
DEEPER BREAKDOWN:

The dependency array tells React when to re-run the effect.

Cleanup runs before the next effect and on unmount.

JUNIOR PERSPECTIVE:

useEffect is one of the most misused hooks.
Think of it as "synchronize this external thing when these values change."

COMMON PITFALLS IN PRODUCTION:

1. Missing dependencies causing stale closures.
2. Missing cleanup leading to memory leaks or duplicate subscriptions.
3. Using useEffect for everything instead of derived state or other hooks.

EXPERIMENTS:

1. Create an effect with a subscription and properly clean it up.
2. Cause and then fix an infinite effect loop.

JUNIOR CHALLENGE:

Build a hook useFetch(url) that handles loading, data, error, and cancellation properly.
*/