/*
JUNIOR GOAL:
Understand TypeScript's value in a team environment and the tradeoffs of adding static typing to JavaScript projects.

REAL WORLD USE CASE:
- Large codebases maintained by multiple developers
- Reducing runtime errors in production
- Better IDE support and refactoring confidence
- API contract enforcement between frontend and backend

CONCEPTS COVERED:
- TypeScript as a development-time tool
- Gradual adoption strategies
- tsconfig and compilation targets
- How types improve collaboration
*/

// ============================================
// STEP 1: Why teams adopt TypeScript
// ============================================

// In a team of 5+, the cost of "I didn't know this variable could be null" becomes very high.
// TypeScript surfaces these issues at edit time rather than in production or PR reviews.

// ============================================
// STEP 2: Compilation and output
// ============================================

// tsconfig.json controls:
// - target (what JS version to emit)
// - strict (how strict the checker is)
// - module resolution
// - source maps for debugging

// The emitted .js is what actually runs. Types are erased.

// ============================================
// STEP 3: Gradual migration
// ============================================

// You can start with allowJs + checkJs or convert file by file.
// Many projects begin with "strict: false" and increase strictness over time.

/*
DEEPER BREAKDOWN:

TypeScript is not a runtime.
It is a static analyzer + compiler that helps you write better JavaScript.

The real power shows up in large codebases and during refactors.

JUNIOR PERSPECTIVE:

As a junior, learning TypeScript early will make you significantly more effective when joining most modern teams.

COMMON PITFALLS IN PRODUCTION:

1. Overly permissive tsconfig that provides false safety.
2. Using any too freely.
3. Ignoring compiler errors during CI.

EXPERIMENTS:

1. Convert a small JavaScript module to TypeScript and enable strict mode.
2. Explore how changing target affects emitted code.

JUNIOR CHALLENGE:

Set up a small project with strict mode enabled and migrate one of the earlier JavaScript examples.
Document the errors you encountered and how you fixed them.
*/