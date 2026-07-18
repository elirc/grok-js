/*
JUNIOR GOAL:
Master the spread operator for both arrays and objects in immutable update patterns and composition.

REAL WORLD USE CASE:
- State updates in React/Redux
- Merging configuration
- Function argument spreading
- Creating shallow copies

CONCEPTS COVERED:
- Shallow vs deep copies
- Spread order and overriding
- Performance considerations with large objects
- Alternatives when spread is not ideal
*/

// ============================================
// STEP 1: Shallow copies and merges
// ============================================

const defaults = { theme: 'light', lang: 'en' };
const userPrefs = { theme: 'dark' };

const finalSettings = { ...defaults, ...userPrefs };

// ============================================
// STEP 2: Array composition
// ============================================

const newItems = [...existingItems, newItem];
const combined = [...arrayA, ...arrayB];

// ============================================
// STEP 3: Limitations
// ============================================

// Spread only does shallow copies
const deepCopy = JSON.parse(JSON.stringify(original)); // common but flawed

// Better to use structuredClone in modern environments

/*
DEEPER BREAKDOWN:

Spread creates shallow copies.
Nested objects are still shared by reference.

Order matters in object spread — later properties win.

JUNIOR PERSPECTIVE:

Spread is the foundation of immutable update patterns.
Understand its limitations to avoid hard-to-debug state bugs.

COMMON PITFALLS IN PRODUCTION:

1. Assuming spread creates deep copies.
2. Performance problems when spreading very large objects frequently.
3. Losing prototype or non-enumerable properties.

EXPERIMENTS:

1. Demonstrate that spread is shallow with nested objects.
2. Compare structuredClone vs spread.

JUNIOR CHALLENGE:

Create a function that deeply merges two objects using recursion or a library approach, then compare with spread.
*/