/*
MID-LEVEL GOAL:
Deeply understand JavaScript module systems, how imports/exports work at runtime and build time, and the differences between ESM and CJS.

REAL WORLD USE CASE:
- Bundler configuration (webpack, Vite, esbuild, Rollup)
- Library authoring (dual ESM/CJS packages)
- Understanding tree-shaking, dead code elimination, and circular dependencies
- Working with Node.js native ESM vs require

CONCEPTS COVERED:
- Static vs dynamic imports
- Live bindings in ESM
- Module graph and hoisting
- Interoperability between ESM and CommonJS
- Top-level await and module evaluation
*/

// ============================================
// STEP 1: ESM live bindings vs CJS copies
// ============================================

// counter.js (ESM)
export let count = 0;
export function increment() { count += 1; }

// main.js
import { count, increment } from './counter.js';
console.log(count); // 0
increment();
console.log(count); // 1   ← live binding

// In CJS you would get a snapshot copy on require.

// ============================================
// STEP 2: Static analysis and tree shaking
// ============================================

// Bundlers can only tree-shake named exports that are not used.
// default exports and side-effectful modules are harder to eliminate.

// import { unused } from 'lib'; // can be shaken if pure

// ============================================
// STEP 3: Circular dependencies
// ============================================

// a.js
import { b } from './b.js';
export const a = 'A';
console.log('a loaded, b =', b);

// b.js
import { a } from './a.js';
export const b = 'B';
console.log('b loaded, a =', a);

// Order of evaluation matters and can produce undefined values.

// ============================================
// STEP 4: Dynamic import and interop
// ============================================

const mod = await import('./heavy.js'); // dynamic, returns namespace object

// CommonJS interop
import cjsModule from './legacy.cjs'; // may need "module": "NodeNext" or bundler config
console.log(cjsModule.default || cjsModule);

/*
DEEPER BREAKDOWN:

ESM is static: imports are hoisted and resolved before any code runs.
This enables tree-shaking but also means you can't have conditional top-level imports (use dynamic import).

Live bindings mean exported values can change after import.

CJS uses module.exports and require — values are copied at require time.

Top-level await (in ESM) pauses module evaluation.

MID-LEVEL PERSPECTIVE:

As a mid-level engineer you will frequently debug module resolution, circular dependency issues, and bundler configuration. Understanding the spec vs what bundlers do is crucial.

COMMON PITFALLS:

- Assuming require and import behave identically
- Creating accidental circular dependencies that work in dev but fail in production
- Side effects in modules that break tree-shaking
- Incorrect dual-package hazards when publishing libraries

EXPERIMENTS:

1. Create two modules with a circular dependency and observe initialization order.
2. Compare live binding behavior between ESM and a CJS simulation.
3. Use dynamic import to lazy-load a heavy module and measure impact.

MID-LEVEL CHALLENGE:

Create a small "plugin system" using dynamic imports. Plugins are discovered at runtime from a directory. The system should:
- Load plugins only when needed
- Handle both ESM and CJS plugins
- Provide a clean registration API
- Gracefully handle load failures
*/