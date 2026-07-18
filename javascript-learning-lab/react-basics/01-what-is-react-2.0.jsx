/*
JUNIOR GOAL:
Understand React's mental model, reconciliation, and why certain patterns exist in production React code.

REAL WORLD USE CASE:
- Choosing between different rendering strategies
- Understanding performance characteristics
- Designing component APIs that scale

CONCEPTS COVERED:
- Reconciliation and the virtual DOM
- Component lifecycle thinking
- Composition over inheritance
- When React is and isn't the right tool
*/

// ============================================
// STEP 1: Reconciliation basics
// ============================================

// React builds a virtual representation and diffs it against the previous one.
// This is why key props matter and why mutating state directly breaks things.

// ============================================
// STEP 2: Composition patterns
// ============================================

function Layout({ header, sidebar, children }) {
  return (
    <div>
      {header}
      <div className="main">
        {sidebar}
        {children}
      </div>
    </div>
  );
}

// ============================================
// STEP 3: Thinking in terms of data flow
// ============================================

// Data flows down through props.
// Events and callbacks flow up.
// This unidirectional flow is a core constraint that enables many optimizations.

/*
DEEPER BREAKDOWN:

Reconciliation is what makes React efficient.
Understanding keys and immutability helps you write code that works well with it.

JUNIOR PERSPECTIVE:

React is a UI library with strong opinions about data flow and rendering.
Learning those opinions will make you a better React developer.

COMMON PITFALLS IN PRODUCTION:

1. Mutating state or props.
2. Using indexes as keys in dynamic lists.
3. Over-rendering due to new function/object references on every render.

EXPERIMENTS:

1. Build a small app both with class components (old style) and function components to feel the difference.
2. Profile a list render with and without proper keys.

JUNIOR CHALLENGE:

Explain in comments why mutating an array in state would break a list rendered with .map(), and demonstrate the correct immutable pattern.
*/