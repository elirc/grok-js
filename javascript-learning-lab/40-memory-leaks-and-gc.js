/*
MID-LEVEL GOAL:
Identify, prevent, and debug memory leaks and understand how JavaScript's garbage collector works in practice.

REAL WORLD USE CASE:
- Long-running single page applications
- Heavy widget dashboards and editors
- Applications with lots of event listeners, observers, or timers
- Preventing OOM in Node.js services

CONCEPTS COVERED:
- Reachability and garbage collection
- Common leak patterns (closures, listeners, timers, detached DOM)
- Weak references
- Chrome DevTools memory profiling
- Best practices for cleanup
*/

// ============================================
// STEP 1: Common leak - forgotten listeners
// ============================================

function setup() {
  const handler = () => console.log('resize');
  window.addEventListener('resize', handler);

  // return cleanup function
  return () => window.removeEventListener('resize', handler);
}

// ============================================
// STEP 2: Closure holding large data
// ============================================

let bigData = new Array(1000000).fill('x');

function createLeakyHandler() {
  return function handler() {
    console.log(bigData.length); // closure keeps bigData alive
  };
}

// ============================================
// STEP 3: WeakRef for caches
// ============================================

const cache = new WeakRef(new Map()); // or use FinalizationRegistry for advanced cases

// ============================================
// STEP 4: Detached DOM nodes
// ============================================

// Holding a reference to a removed DOM node in a JS variable prevents GC.

/*
DEEPER BREAKDOWN:

The GC collects objects with no strong references from roots (globals, stack, etc.).

Closures, event listeners, and arrays of nodes are the usual suspects.

WeakMap/WeakSet/WeakRef help break reference chains.

MID-LEVEL PERSPECTIVE:

Memory leaks in SPAs are extremely common and often discovered only after the app has been open for hours or days.

COMMON PITFALLS:

- Adding listeners in effects without cleanup
- Storing component instances or large objects in module scope
- Infinite growth of arrays/logs/state
- Holding references to removed DOM nodes

EXPERIMENTS:

1. Use Chrome Performance > Memory to record a heap snapshot and find retained objects.
2. Create and fix a leak caused by a closure capturing a large array.
3. Demonstrate proper cleanup for a ResizeObserver + event listeners.

MID-LEVEL CHALLENGE:

Audit one of the previous mini-projects (todo list or dashboard) for potential leaks.
Implement a version that:
- Properly cleans all listeners, timers, and observers
- Uses WeakRef or WeakMap where appropriate for caches
- Includes a simple "memory usage" display (using performance.memory if available)
*/