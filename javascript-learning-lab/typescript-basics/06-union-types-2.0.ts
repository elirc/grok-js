/*
JUNIOR GOAL:
Use union types to model real variability in data and write type-safe code that handles all cases.

REAL WORLD USE CASE:
- Different shapes of API responses
- Finite state machines
- Polymorphic data (different kinds of notifications, events, etc.)

CONCEPTS COVERED:
- Discriminated unions
- Type narrowing techniques
- Exhaustiveness checking
- Union distribution
*/

// ============================================
// STEP 1: Discriminated unions
// ============================================

type Success = { status: 'success'; data: User };
type ErrorResult = { status: 'error'; message: string };

type ApiResult = Success | ErrorResult;

function handleResult(result: ApiResult) {
  if (result.status === 'success') {
    console.log(result.data); // narrowed
  }
}

// ============================================
// STEP 2: Exhaustiveness
// ============================================

function assertNever(x: never): never {
  throw new Error('Unexpected value: ' + x);
}

// ============================================
// STEP 3: Narrowing patterns
// ============================================

if ('data' in result) { /* ... */ }

/*
DEEPER BREAKDOWN:

Discriminated unions are one of TypeScript's killer features.
The common 'status' or 'type' field allows excellent narrowing.

Exhaustiveness checking catches bugs when you add new cases.

JUNIOR PERSPECTIVE:

Model states and variants explicitly. It pays off massively.

COMMON PITFALLS IN PRODUCTION:

1. Using string unions without discriminators.
2. Forgetting to handle all cases in switch/if chains.
3. Losing narrowing when assigning to variables.

EXPERIMENTS:

1. Model a payment result as a discriminated union.
2. Add a new variant and see where the compiler complains.

JUNIOR CHALLENGE:

Create a discriminated union for different notification types (info, warning, error, success) and write a renderer that handles all of them with exhaustiveness.
*/