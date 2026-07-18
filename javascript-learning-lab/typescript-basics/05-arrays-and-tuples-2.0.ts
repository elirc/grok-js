/*
JUNIOR GOAL:
Type arrays and tuples accurately for real data structures used in applications.

REAL WORLD USE CASE:
- API responses that return lists
- Fixed-length data (coordinates, RGB, matrix rows)
- Strongly typed function parameters that accept arrays

CONCEPTS COVERED:
- ReadonlyArray
- Tuple types with optional elements
- Array utility types
- Distinguishing arrays from tuples at the type level
*/

// ============================================
// STEP 1: Readonly arrays
// ============================================

function processUsers(users: ReadonlyArray<User>) {
  // Cannot push or mutate inside
}

// ============================================
// STEP 2: Tuples for structured data
// ============================================

type Coordinate = [number, number];
type RGB = [number, number, number];

const point: Coordinate = [10, 20];

// ============================================
// STEP 3: Utility types
// ============================================

type UserNames = Array<User['name']>;

/*
DEEPER BREAKDOWN:

Tuples give you position-based typing.
Very useful for small fixed structures.

ReadonlyArray communicates that the function will not mutate the array.

JUNIOR PERSPECTIVE:

Using the right array/tuple type prevents an entire class of bugs.

COMMON PITFALLS IN PRODUCTION:

1. Using any[] when the content type is known.
2. Treating tuples as regular arrays and losing type safety.
3. Forgetting that readonly only affects the type checker.

EXPERIMENTS:

1. Type a function that returns the min and max of an array as a tuple.
2. Use ReadonlyArray in several utility functions.

JUNIOR CHALLENGE:

Create types for:
- A 2D point
- An RGB color with optional alpha
- A function that accepts either a single item or an array of items (use union with array)
*/