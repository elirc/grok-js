/*
JUNIOR GOAL:
Write clean, maintainable JSX and understand how it compiles and behaves.

REAL WORLD USE CASE:
- Large component trees
- Conditional and list rendering at scale
- Integrating with design systems

CONCEPTS COVERED:
- JSX transformation
- Fragments and keys
- Children as a prop
- Performance implications of JSX
*/

// ============================================
// STEP 1: Fragments for cleaner trees
// ============================================

function List() {
  return (
    <>
      <Header />
      <ul>{/* items */}</ul>
    </>
  );
}

// ============================================
// STEP 2: Children prop
// ============================================

function Card({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="body">{children}</div>
    </div>
  );
}

// ============================================
// STEP 3: JSX is just syntax
// ============================================

// <MyComp /> becomes React.createElement(MyComp, null)
// Understanding this helps with debugging and higher-order components.

/*
DEEPER BREAKDOWN:

Fragments reduce unnecessary DOM nodes.
Children as props enables powerful composition (slots).

JSX is syntactic sugar. The runtime doesn't care about the syntax.

JUNIOR PERSPECTIVE:

Readability and performance often conflict in JSX.
Learn when to extract components vs use fragments and conditionals.

COMMON PITFALLS IN PRODUCTION:

1. Returning arrays of elements without keys.
2. Overusing fragments when a wrapper div would be clearer.
3. Putting complex logic directly in JSX.

EXPERIMENTS:

1. Convert a component using many wrapper divs to use fragments.
2. Implement a simple "Slot" component using children.

JUNIOR CHALLENGE:

Create a flexible Card component that accepts header, footer, and main content via children or named props.
*/