/*
MID-LEVEL GOAL:
Use mapped types to transform existing types into new shapes programmatically.

REAL WORLD USE CASE:
- Generating form types from domain models
- Creating readonly / optional / required variants
- Building API request/response transformers
- Type-level pick/omit/partial at scale

CONCEPTS COVERED:
- Mapped type syntax [K in keyof T]
- Modifiers (readonly, ?)
- Key remapping (as)
- Combining with conditional types
- Template literal key remapping
*/

// ============================================
// STEP 1: Basic mapping
// ============================================

type ReadonlyUser = { readonly [K in keyof User]: User[K] };

// Equivalent to built-in Readonly<User>

// ============================================
// STEP 2: Key remapping
// ============================================

type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<User>;
// { getId: () => number; getName: () => string; ... }

// ============================================
// STEP 3: Filtering with never
// ============================================

type OnlyFunctions<T> = {
  [K in keyof T as T[K] extends Function ? K : never]: T[K];
};

type FunctionProps = OnlyFunctions<User>;

/*
DEEPER BREAKDOWN:

Mapped types iterate over keys and produce a new type.

'as' clause allows transforming keys (renaming, filtering via never).

Combining mapped + conditional gives enormous power.

MID-LEVEL PERSPECTIVE:

Mapped types are how you build "derived" types that stay in sync with your models automatically.

COMMON PITFALLS:

- Forgetting that mapped types are shallow by default
- Accidentally losing index signatures or call signatures
- Overusing complex mappings that hurt readability

EXPERIMENTS:

1. Implement a `Mutable<T>` that removes readonly from all properties.
2. Create a `RenameKeys<T, M>` using key remapping where M is a mapping type.
3. Build a type that makes all function properties optional.

MID-LEVEL CHALLENGE:

Create `DeepReadonly<T>` and `Paths<T>` (produces union of all possible deep paths as string literals, e.g. "user.profile.name").
*/