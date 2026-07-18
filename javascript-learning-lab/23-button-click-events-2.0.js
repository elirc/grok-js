/*
JUNIOR GOAL:
Handle DOM events professionally with proper cleanup, delegation, and state management.

REAL WORLD USE CASE:
- Interactive components
- Custom UI libraries
- Accessibility and keyboard support

CONCEPTS COVERED:
- addEventListener options (once, passive, capture)
- Event delegation
- Cleanup and memory leaks
- Custom events
*/

// ============================================
// STEP 1: Proper listener options
// ============================================

button.addEventListener('click', handleClick, { once: true, passive: true });

// ============================================
// STEP 2: Delegation for dynamic content
// ============================================

container.addEventListener('click', (e) => {
  const button = e.target.closest('button[data-action]');
  if (!button) return;
  dispatchAction(button.dataset.action, button.dataset.id);
});

// ============================================
// STEP 3: Cleanup
// ============================================

function setup() {
  const handler = (e) => { /* ... */ };
  element.addEventListener('click', handler);
  return () => element.removeEventListener('click', handler);
}

/*
DEEPER BREAKDOWN:

{ once: true }
- Automatically removes the listener after first invocation.

passive: true
- Improves scroll performance for touch/wheel events.

closest()
- Very useful for delegation with nested elements.

JUNIOR PERSPECTIVE:

Always think about when and how listeners are removed, especially in single-page applications.

COMMON PITFALLS IN PRODUCTION:

1. Adding listeners without removal (memory leaks).
2. Not using delegation on dynamic lists.
3. Blocking the main thread with heavy work in click handlers.

EXPERIMENTS:

1. Create a component that properly cleans up its listeners.
2. Implement a simple custom event system.

JUNIOR CHALLENGE:

Build a reusable click-outside hook or function that supports multiple elements and proper cleanup.
*/