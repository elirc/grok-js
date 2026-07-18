/*
MID-LEVEL GOAL:
Understand and create declaration files to provide types for JavaScript code and third-party libraries.

REAL WORLD USE CASE:
- Adding types to legacy JS modules
- Publishing typed libraries
- Working with DefinitelyTyped or authoring .d.ts
- Augmenting global types and module declarations

CONCEPTS COVERED:
- .d.ts files and ambient declarations
- declare module, declare global
- Module augmentation
- Triple-slash directives and reference types
- emitDeclarationOnly and declaration maps
*/

// ============================================
// STEP 1: Declaring a JS module
// ============================================

// legacy.js
// module.exports = { add: (a, b) => a + b };

// legacy.d.ts
declare module 'legacy' {
  export function add(a: number, b: number): number;
}

// ============================================
// STEP 2: Module augmentation
// ============================================

declare module 'express' {
  interface Request {
    user?: User;
  }
}

// Now req.user is typed in Express handlers.

// ============================================
// STEP 3: Global augmentation
// ============================================

declare global {
  interface Window {
    myAppConfig: { apiKey: string };
  }
}

/*
DEEPER BREAKDOWN:

Declaration files describe the shape without providing implementation.

Augmentation lets you extend existing modules/globals safely.

For libraries, use "types" field in package.json and "typesVersions" for conditions.

MID-LEVEL PERSPECTIVE:

Being able to type untyped code or safely extend third-party types is a very common mid-level task.

COMMON PITFALLS:

- Out-of-date .d.ts that don't match the JS
- Accidentally polluting the global namespace
- Incorrect augmentation that breaks on library upgrades

EXPERIMENTS:

1. Write a .d.ts for a small untyped JS utility.
2. Augment a popular library (e.g. add a custom property to Express Request).
3. Create a global type augmentation for a browser API.

MID-LEVEL CHALLENGE:

Publish (simulated) a small JS utility with full TypeScript declarations, including:
- Proper "types" and "exports" in package.json
- Separate .d.ts
- Example of module augmentation for consumers
*/