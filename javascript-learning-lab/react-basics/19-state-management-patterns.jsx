/*
MID-LEVEL GOAL:
Evaluate and implement different state management approaches beyond basic useState + Context.

REAL WORLD USE CASE:
- Medium to large applications with complex data flows
- Sharing state across routes and distant components
- Optimizing for performance and developer experience
- Choosing between local state, context, and external stores

CONCEPTS COVERED:
- When Context is enough vs when it becomes a problem
- Prop drilling vs global state tradeoffs
- State colocation principle
- Patterns like Zustand / Jotai / Redux concepts (without full libs)
- Derived and computed state
*/

// ============================================
// STEP 1: State colocation
// ============================================

// Bad: everything in one giant context
// Good: each feature owns its state close to where it's used

function FeatureA() {
  const [local, setLocal] = useState(...);
  return <ChildA data={local} />;
}

// ============================================
// STEP 2: Context + reducer for global concerns
// ============================================

// Use for truly app-wide state: auth, theme, notifications
// Avoid for data that only a subtree needs

// ============================================
// STEP 3: External store thinking
// ============================================

// For very complex or high-frequency updates, consider external stores.
// Pattern: subscribe + snapshot (same as useSyncExternalStore)

// Example simplified store
function createStore(initial) {
  let state = initial;
  const listeners = new Set();

  return {
    getState: () => state,
    setState: (fn) => {
      state = fn(state);
      listeners.forEach(l => l());
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
}

/*
DEEPER BREAKDOWN:

Most apps benefit from a mix:
- Local useState for UI state
- Context for low-frequency global concerns
- External store or server state library for complex domains

Colocating state makes components more predictable and easier to delete.

MID-LEVEL PERSPECTIVE:

Choosing the right state solution is a skill. The answer is almost never "put everything in one big store."

COMMON PITFALLS:

- Using Context for high-frequency updates (causes too many re-renders)
- Global state for things that should be route-local
- Duplicating state in multiple places

EXPERIMENTS:

1. Refactor a Context-heavy app by moving state closer to the components that use it.
2. Build a tiny external store and subscribe to it from a component using useSyncExternalStore.
3. Measure re-render count when updating Context vs a more targeted solution.

MID-LEVEL CHALLENGE:

Design the state architecture for a dashboard application with:
- Multiple widgets that can be added/removed
- Shared filters that affect several widgets
- Per-widget local state (sorting, pagination)
- User preferences that persist

Document your decisions and draw the data flow.
*/