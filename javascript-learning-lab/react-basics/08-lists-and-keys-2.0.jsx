/*
JUNIOR GOAL:
Render lists correctly and understand the performance and correctness implications of keys.

REAL WORLD USE CASE:
- Data tables
- Infinite scroll feeds
- Drag and drop lists
- Animated lists

CONCEPTS COVERED:
- Why keys are required
- Stable vs index keys
- List virtualization concepts
- Reconciliation impact of key choice
*/

// ============================================
// STEP 1: Proper key usage
// ============================================

items.map(item => <Item key={item.id} item={item} />);

// ============================================
// STEP 2: Reordering and animation
// ============================================

// Using stable ids allows React to move DOM nodes instead of recreating them.

// ============================================
// STEP 3: When index is acceptable
// ============================================

// Only when the list is static and never reorders, inserts, or deletes items.

staticList.map((item, index) => <StaticItem key={index} ... />);

/*
DEEPER BREAKDOWN:

Keys tell React which items correspond between renders.
Bad keys cause performance problems and bugs with component state.

JUNIOR PERSPECTIVE:

Choosing keys is one of the most common sources of subtle list bugs.

COMMON PITFALLS IN PRODUCTION:

1. Using array index for dynamic lists.
2. Using non-unique keys.
3. Not providing keys at all (React warns).

EXPERIMENTS:

1. Demonstrate component state being lost when using index keys during reorder.
2. Implement a list with stable keys and observe correct behavior.

JUNIOR CHALLENGE:

Create a reorderable list where items maintain their internal state (e.g. expanded/collapsed) correctly after reordering.
*/