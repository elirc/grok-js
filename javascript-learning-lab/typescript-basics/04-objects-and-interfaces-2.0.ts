/*
JUNIOR GOAL:
Model complex domain objects using interfaces and types in a maintainable way.

REAL WORLD USE CASE:
- Backend response modeling
- Form state and validation schemas
- Shared types between frontend and backend (via codegen or manual)

CONCEPTS COVERED:
- Interface declaration and extension
- Index signatures
- Readonly properties
- Type composition
*/

// ============================================
// STEP 1: Modeling entities
// ============================================

interface Product {
  readonly id: number;
  name: string;
  price: number;
  tags: ReadonlyArray<string>;
}

// ============================================
// STEP 2: Index signatures (use sparingly)
type StringRecord = {
  [key: string]: string | number;
};

// ============================================
// STEP 3: Extending and composing
// ============================================

interface Timestamped {
  createdAt: string;
  updatedAt: string;
}

interface Order extends Timestamped {
  id: number;
  items: Product[];
}

/*
DEEPER BREAKDOWN:

readonly prevents accidental reassignment of properties.

ReadonlyArray prevents mutation of arrays.

Interfaces are great for object shapes that will be extended.

JUNIOR PERSPECTIVE:

Spend time getting your core domain models right. Everything else builds on them.

COMMON PITFALLS IN PRODUCTION:

1. Overusing index signatures instead of proper types.
2. Making everything optional because "the API might not send it".
3. Mutating readonly properties at runtime.

EXPERIMENTS:

1. Create an interface hierarchy for a blog system (Post, Comment, User).
2. Use Readonly and ReadonlyArray in a real example.

JUNIOR CHALLENGE:

Model a complex Order that contains nested Address, LineItem[], and Payment objects using interfaces.
*/