/*
JUNIOR GOAL:
Use DOM selection responsibly in vanilla JS contexts and understand performance implications.

REAL WORLD USE CASE:
- Progressive enhancement
- Vanilla JS widgets inside larger apps
- Testing and scraping scenarios

CONCEPTS COVERED:
- querySelector vs getElementById performance
- Caching selections
- Working with live vs static NodeLists
- Delegation patterns
*/

// ============================================
// STEP 1: Cache selections
// ============================================

const buttons = document.querySelectorAll('.action-btn');
// Avoid calling querySelectorAll repeatedly

// ============================================
// STEP 2: Event delegation
// ============================================

document.body.addEventListener('click', (e) => {
  if (e.target.matches('.action-btn')) {
    handleAction(e.target.dataset.id);
  }
});

// ============================================
// STEP 3: Live collections
// ============================================

const liveList = document.getElementsByTagName('div'); // Live
const staticList = document.querySelectorAll('div');   // Static

/*
DEEPER BREAKDOWN:

querySelector is more flexible but can be slower than getElementById on very large pages.

Event delegation is essential for dynamic content.

JUNIOR PERSPECTIVE:

Minimize DOM queries. Cache references when possible.

COMMON PITFALLS IN PRODUCTION:

1. Querying inside loops or frequent event handlers.
2. Assuming NodeList is a real array (use Array.from or spread).
3. Forgetting that getElementsBy* returns live collections.

EXPERIMENTS:

1. Measure performance difference between getElementById and querySelector.
2. Implement basic event delegation for a list.

JUNIOR CHALLENGE:

Build a function that finds all elements matching a selector within a container and returns a real array with additional metadata.
*/