/*
JUNIOR GOAL:
Handle events in a way that is performant, accessible, and works well with React's rendering model.

REAL WORLD USE CASE:
- Complex interactive UIs
- Forms and input handling
- Keyboard and touch interactions

CONCEPTS COVERED:
- Event pooling (historical) and current behavior
- SyntheticEvent
- Preventing default and stopping propagation
- Accessibility considerations (onKeyDown etc.)
*/

// ============================================
// STEP 1: Proper handler patterns
// ============================================

function handleSubmit(e) {
  e.preventDefault();
  // process form
}

// ============================================
// STEP 2: Passing handlers down
// ============================================

function Parent() {
  const handleItemClick = useCallback((id) => {
    // stable reference
  }, []);

  return <Child onItemClick={handleItemClick} />;
}

// ============================================
// STEP 3: Accessibility
// ============================================

<div 
  role="button" 
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
/>

/*
DEEPER BREAKDOWN:

useCallback is often used with event handlers passed to memoized children.

Many accessibility features require handling keyboard events in addition to clicks.

JUNIOR PERSPECTIVE:

Event handling in React is mostly straightforward, but performance and accessibility add complexity.

COMMON PITFALLS IN PRODUCTION:

1. Creating new handler functions on every render unnecessarily.
2. Forgetting to preventDefault on form submits.
3. Ignoring keyboard accessibility.

EXPERIMENTS:

1. Implement a button that works with both click and Enter/Space keys.
2. Use useCallback properly to stabilize handlers.

JUNIOR CHALLENGE:

Create a searchable dropdown that handles:
- Click to open
- Keyboard navigation
- Click outside to close
- Proper ARIA attributes
*/