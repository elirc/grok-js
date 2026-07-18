/*
MID-LEVEL GOAL:
Write effective user-defined type guards and assertion functions to narrow types at runtime safely.

REAL WORLD USE CASE:
- API response validation
- Runtime type checking in libraries
- Narrowing complex unions after external data arrives
- Defensive programming in shared utilities

CONCEPTS COVERED:
- User-defined type predicates (x is Type)
- Assertion functions
- Custom type guards for objects
- Narrowing in arrays and control flow
*/

// ============================================
// STEP 1: Type predicate
// ============================================

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    typeof (obj as any).id === 'number'
  );
}

// ============================================
// STEP 2: Assertion function
// ============================================

function assertIsUser(obj: unknown): asserts obj is User {
  if (!isUser(obj)) {
    throw new Error('Not a user');
  }
}

// ============================================
// STEP 3: Array narrowing
// ============================================

const items: unknown[] = [/* ... */];
const users = items.filter(isUser); // User[]

/*
DEEPER BREAKDOWN:

The return type `obj is Type` tells the type checker to narrow in the true branch.

Assertion functions throw or never return in the false case.

These are especially valuable when dealing with data from JSON.parse or external systems.

MID-LEVEL PERSPECTIVE:

Good type guards are a bridge between the untyped world and your typed codebase.

COMMON PITFALLS:

- Writing incorrect guards that lie to the type system
- Not handling null/undefined edge cases
- Overly complex guards that are hard to maintain

EXPERIMENTS:

1. Write a type guard for a discriminated union.
2. Create an assertion function that also attaches a brand.
3. Use a guard inside .filter and .find.

MID-LEVEL CHALLENGE:

Build a set of composable guards (isString, isNumber, isObject, hasProperty) and a higher-order `isShape` function that validates against a schema-like object at runtime while providing full type narrowing.
*/