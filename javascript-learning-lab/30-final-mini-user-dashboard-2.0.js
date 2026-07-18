/*
JUNIOR GOAL:
Build a more complete dashboard experience demonstrating data fetching, derived state, and component coordination in vanilla JS.

REAL WORLD USE CASE:
- Admin dashboards
- Analytics views
- User profile overviews

CONCEPTS COVERED:
- Coordinating multiple data sources
- Derived computations
- Optimistic UI updates
- Better separation of concerns
*/

// ============================================
// STEP 1: Data fetching layer
// ============================================

async function loadDashboardData() {
  const [user, stats, activity] = await Promise.all([
    fetchUser(),
    fetchStats(),
    fetchActivity()
  ]);

  return { user, stats, activity };
}

// ============================================
// STEP 2: Derived state
// ============================================

function computeEngagementScore(stats) {
  return Math.min(100, Math.floor((stats.posts * 2 + stats.followers * 0.1)));
}

// ============================================
// STEP 3: Action handlers
// ============================================

async function refreshDashboard() {
  try {
    const data = await loadDashboardData();
    renderDashboard(data);
  } catch (error) {
    showErrorState(error);
  }
}

/*
DEEPER BREAKDOWN:

Parallel fetching with Promise.all improves perceived performance.

Derived state should be computed rather than stored when possible.

JUNIOR PERSPECTIVE:

This file combines many concepts into a realistic small application.
Focus on data flow and separation of concerns.

COMMON PITFALLS IN PRODUCTION:

1. Over-fetching or waterfall requests.
2. Storing derived data that can get out of sync.
3. Poor error states that leave users confused.

EXPERIMENTS:

1. Add optimistic updates for a "follow" action.
2. Implement caching with a simple TTL.

JUNIOR CHALLENGE:

Enhance the dashboard with:
- Tabs or sections that can be refreshed independently
- A simple filter on the activity list
- A "last updated" timestamp with manual refresh button
- Proper loading and error states for each section
*/