/*
MID-LEVEL GOAL:
Use conditional types to create sophisticated type-level logic and derive new types from existing ones.

REAL WORLD USE CASE:
- Building advanced utility types
- Type-safe API response transformers
- Extracting types from complex libraries (React, Zod, etc.)
- Implementing type-level pattern matching

CONCEPTS COVERED:
- Conditional type syntax (T extends U ? X : Y)
- Distributive conditional types
- infer keyword basics
- Chaining conditionals
- Conditional types with unions
*/

// ============================================
// STEP 1: Basic conditional
// ============================================

type IsString<T> = T extends string ? true : false;

type A = IsString<'hello'>; // true
type B = IsString<42>;      // false

// ============================================
// STEP 2: infer keyword
// ============================================

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type User = { name: string };
type MaybeUser = Promise<User>;
type PlainUser = UnwrapPromise<MaybeUser>; // User

// ============================================
// STEP 3: Distributivity
// ============================================

type ToArray<T> = T extends any ? T[] : never;

type Arr = ToArray<string | number>; // string[] | number[] (distributes)

// ============================================
// STEP 4: Practical utility
// ============================================

type NonNullable<T> = T extends null | undefined ? never : T;

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

/*
DEEPER BREAKDOWN:

Conditional types are evaluated at type level, similar to ternary at runtime.

infer lets you extract a type from a larger structure (very powerful).

Distributivity applies when the checked type is a naked type parameter over a union.

MID-LEVEL PERSPECTIVE:

Conditional types + infer are the foundation of most advanced utility types you'll encounter (Awaited, ReturnType, Parameters, etc.).

COMMON PITFALLS:

- Forgetting about distributivity leading to unexpected union results
- Creating deeply nested conditionals that are hard to debug
- Over-engineering when a simple type would suffice

EXPERIMENTS:

1. Implement your own version of Awaited<T>.
2. Create a type that extracts the element type of an array or the value type of a Promise.
3. Build a type that turns a union into an intersection using conditionals.

MID-LEVEL CHALLENGE:

Create a generic type `DeepRequired<T>` that recursively makes all properties required.
Then create `ExtractByType<T, U>` that extracts from T only the properties whose value type extends U.
*/