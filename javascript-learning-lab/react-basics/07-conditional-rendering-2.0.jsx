/*
JUNIOR GOAL:
Implement complex conditional UI logic cleanly without sacrificing readability or performance.

REAL WORLD USE CASE:
- Loading, error, and empty states
- Permission-based UI
- Feature flagging and A/B testing

CONCEPTS COVERED:
- Multiple conditional strategies
- Component extraction for conditions
- Early returns in components
- Memoization of conditional branches
*/

// ============================================
// STEP 1: State machine style rendering
// ============================================

function Dashboard({ status, data, error }) {
  if (status === 'loading') return <Spinner />;
  if (status === 'error') return <ErrorMessage error={error} />;
  if (!data?.length) return <EmptyState />;

  return <DataView data={data} />;
}

// ============================================
// STEP 2: Extracting conditionals
// ============================================

function PermissionGate({ can, children }) {
  return can ? children : null;
}

// ============================================
// STEP 3: Avoiding unnecessary renders
// ============================================

const ExpensiveComponent = React.memo(({ show }) => {
  if (!show) return null;
  return <HeavyUI />;
});

/*
DEEPER BREAKDOWN:

Early returns are often the cleanest approach in components.

Extracting conditionals into components improves testability.

JUNIOR PERSPECTIVE:

Conditional rendering is where a lot of "spaghetti UI" lives.
Keep conditions simple and push complexity into dedicated components.

COMMON PITFALLS IN PRODUCTION:

1. Complex ternaries inside JSX.
2. Rendering heavy components conditionally without memo or lazy.
3. Not handling all possible states.

EXPERIMENTS:

1. Refactor a component with heavy nested conditions.
2. Create a <When> or <Show> component for declarative conditions.

JUNIOR CHALLENGE:

Build a component that handles four states for a data view: idle, loading, success with data, success with empty data, and error.
*/