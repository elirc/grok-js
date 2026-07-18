/*
JUNIOR GOAL:
Use array mutation methods responsibly and know when to reach for more powerful alternatives like find, some, every, and splice patterns.

REAL WORLD USE CASE:
- Managing queues and stacks
- Checking membership in permission lists or selected items
- Removing items by index or predicate in state updates

CONCEPTS COVERED:
- When mutation is acceptable (local only)
- find, some, every for queries
- Splice for surgical edits
- Performance characteristics
*/

// ============================================
// STEP 1: Safe mutation in controlled scopes
// ============================================

function addToLocalQueue(queue, item) {
  // Only mutate when you own the array
  queue.push(item);
  return queue;
}

// ============================================
// STEP 2: Better alternatives to includes
// ============================================

const roles = ['admin', 'editor'];

const hasAdmin = roles.includes('admin');
const hasEditor = roles.some(r => r === 'editor');

// ============================================
// STEP 3: Removing items safely
// ============================================

function removeAtIndex(arr, index) {
  if (index < 0 || index >= arr.length) return arr;
  const copy = [...arr];
  copy.splice(index, 1);
  return copy;
}

function removeByPredicate(arr, predicate) {
  return arr.filter((item, i) => !predicate(item, i));
}

/*
DEEPER BREAKDOWN:

push/pop on arrays you own is fine.
Never push/pop on arrays coming from props or external state.

some / every
- Short-circuit. Better than filter + length checks.

splice
- Powerful but mutates. Always copy first when needed.

JUNIOR PERSPECTIVE:

Mastering when to mutate vs when to return new arrays is a key junior-to-mid transition.

COMMON PITFALLS IN PRODUCTION:

1. Mutating arrays from API responses or Redux state.
2. Using splice in render methods or derived data.
3. Forgetting that includes uses SameValueZero comparison.

EXPERIMENTS:

1. Implement a priority queue using unshift + pop.
2. Write remove functions that work both by index and by value.

JUNIOR CHALLENGE:

Build a small notification manager that supports:
- add(notification)
- removeById(id)
- markAsRead(id)
- getUnreadCount()

All operations should not mutate the original array passed in.
*/