/*
JUNIOR GOAL:
Use useState effectively including functional updates, lazy initialization, and common state pitfalls.

REAL WORLD USE CASE:
- Form state
- UI toggles and modals
- Derived state vs stored state decisions

CONCEPTS COVERED:
- Functional updates for stale closures
- Lazy initial state
- Batching and multiple setState calls
- When to lift state
*/

// ============================================
// STEP 1: Functional updates
// ============================================

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(c => c + 1); // Safe even in stale closures
  };
}

// ============================================
// STEP 2: Lazy initialization
// ============================================

const [value, setValue] = useState(() => {
  return expensiveComputation(); // Only runs on first render
});

// ============================================
// STEP 3: Batching
// ============================================

// In modern React, multiple setState calls in the same event are batched automatically.

/*
DEEPER BREAKDOWN:

Always use functional form when new state depends on previous state.

Lazy init prevents expensive work on every render.

JUNIOR PERSPECTIVE:

useState looks simple but has several important nuances that cause bugs.

COMMON PITFALLS IN PRODUCTION:

1. Reading state immediately after setState and expecting the new value.
2. Capturing stale state in event handlers and timeouts.
3. Storing derived values in state instead of computing them.

EXPERIMENTS:

1. Demonstrate stale closure bug and fix with functional update.
2. Profile a component that does expensive work in useState initializer.

JUNIOR CHALLENGE:

Build a multi-step form where each step's state is managed, and "next" and "back" properly preserve entered data.
*/