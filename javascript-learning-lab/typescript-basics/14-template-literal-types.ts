/*
MID-LEVEL GOAL:
Leverage template literal types to create string-based type safety and derive new types from strings.

REAL WORLD USE CASE:
- Typed event names and CSS properties
- Strongly typed API paths and query params
- Internationalization key safety
- Generating method names and property accessors

CONCEPTS COVERED:
- Template literal type syntax
- Intrinsic string manipulation utilities (Uppercase, Capitalize, etc.)
- Union distribution in templates
- Combining with mapped and conditional types
*/

// ============================================
// STEP 1: Basic template literals
// ============================================

type Greeting = `Hello, ${string}`;

type EventName = `on${Capitalize<string>}`;

// ============================================
// STEP 2: Path safety
// ============================================

type ApiPath = `/users/${string}` | `/posts/${string}`;

function get(path: ApiPath) { /* ... */ }

// ============================================
// STEP 3: Advanced derivation
// ============================================

type Methods<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

/*
DEEPER BREAKDOWN:

Template literal types turn strings into type-level data.
Combined with unions they explode into many possible strings.

Capitalize, Uppercase, Lowercase, Uncapitalize are built-in.

Very useful for reducing stringly-typed code.

MID-LEVEL PERSPECTIVE:

These types eliminate entire classes of "wrong string" bugs at compile time.

COMMON PITFALLS:

- Generating enormous union types that slow down the type checker
- Overusing them when simple string literals would suffice
- Forgetting distribution behavior with unions

EXPERIMENTS:

1. Create a type-safe CSS property name type.
2. Build a `PathsToStringProps<T>` using recursion + templates.
3. Generate all possible "user.action" event names from a union of actions.

MID-LEVEL CHALLENGE:

Design a type-safe router where route definitions produce a `RouteNames` union and a `navigate(name, params)` function that is fully typed based on the route's expected params.
*/