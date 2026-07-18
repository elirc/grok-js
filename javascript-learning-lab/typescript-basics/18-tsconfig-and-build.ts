/*
MID-LEVEL GOAL:
Master tsconfig.json and project configuration to control type checking, output, and developer experience at scale.

REAL WORLD USE CASE:
- Monorepos with multiple packages
- Library vs application builds
- Strictness policies across teams
- Performance of the type checker on large codebases

CONCEPTS COVERED:
- Key compiler options (strict, module, target, paths)
- Project references and composite builds
- skipLibCheck, declaration, source maps
- extends, include/exclude, and references
- Performance tuning
*/

// ============================================
// STEP 1: Strict mode and its effects
// ============================================

// "strict": true enables:
// noImplicitAny, strictNullChecks, strictFunctionTypes, etc.
// Recommended for all new projects.

// ============================================
// STEP 2: Module and resolution
// ============================================

// "module": "ESNext" + "moduleResolution": "bundler" (modern)
// or "NodeNext" for native Node ESM

// "paths" for import aliases (needs bundler support too)

// ============================================
// STEP 3: Project references
// ============================================

// tsconfig.json
// {
//   "references": [{ "path": "./packages/core" }],
//   "files": []
// }

// Enables faster incremental builds and proper dependency tracking.

// ============================================
// STEP 4: Practical tips
// ============================================

// Use "incremental": true and "tsBuildInfoFile"
// "skipLibCheck": true for speed when types in node_modules are broken
// Separate tsconfig for build vs test vs lint

/*
DEEPER BREAKDOWN:

tsconfig controls what TypeScript sees and emits.
Misconfiguration is a very common source of confusing errors in teams.

Project references are essential for monorepos.

MID-LEVEL PERSPECTIVE:

You will be responsible for making the type system fast and correct for the whole team.

COMMON PITFALLS:

- Enabling paths without updating bundler config (broken imports at runtime)
- Using "any" to work around strict mode instead of fixing root causes
- Not using composite + references in large projects (slow type checking)

EXPERIMENTS:

1. Create a small monorepo structure with project references.
2. Benchmark type checking time with and without incremental and skipLibCheck.
3. Audit a tsconfig and explain the effect of each major option.

MID-LEVEL CHALLENGE:

Design a tsconfig setup for a monorepo containing:
- A shared types package
- A Node backend
- A React frontend

Include proper references, different strictness levels if needed, and build commands that use tsc -b.
*/