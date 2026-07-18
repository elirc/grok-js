/*
JUNIOR GOAL:
Use any, unknown, and never deliberately and understand the implications of each.

REAL WORLD USE CASE:
- Working with untyped third-party libraries
- Gradual migration from JavaScript
- Exhaustive type checking and impossible states

CONCEPTS COVERED:
- any as an escape hatch
- unknown as the safe "I don't know" type
- never for impossible code paths
- Strategies for reducing any usage
*/

// ============================================
// STEP 1: Reducing any
// ============================================

// Bad
function process(data: any) { }

// Better
function process(data: unknown) {
  if (typeof data === 'object' && data !== null) {
    // narrow further
  }
}

// ============================================
// STEP 2: never for exhaustiveness
// ============================================

function handle(action: 'create' | 'update' | 'delete') {
  switch (action) {
    case 'create': return;
    case 'update': return;
    case 'delete': return;
    default:
      const exhaustive: never = action;
  }
}

// ============================================
// STEP 3: Strategies
// ============================================

// Use @ts-ignore sparingly and with comments.
// Prefer unknown + type assertions only when you have runtime checks.

/*
DEEPER BREAKDOWN:

any disables the type checker.
unknown forces you to prove the type.

never is useful for both error cases and ensuring all cases are handled.

JUNIOR PERSPECTIVE:

Strive to write code with as little any as possible.
Every any is a place where bugs can hide.

COMMON PITFALLS IN PRODUCTION:

1. Using any "temporarily" and never removing it.
2. Using ! or as any to silence the compiler instead of fixing the root cause.
3. Not using never to catch new cases when adding variants.

EXPERIMENTS:

1. Take a function using any and gradually type it with unknown.
2. Add a new case to a union and use never to verify all paths are covered.

JUNIOR CHALLENGE:

Refactor a piece of code that uses any heavily.
Introduce proper types, unknown where necessary, and never for exhaustiveness.
*/