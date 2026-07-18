/*
JUNIOR GOAL:
Use TypeScript's type system to model real domain data accurately and catch more bugs at compile time.

REAL WORLD USE CASE:
- Modeling API responses
- Domain entities (User, Order, Product)
- Function contracts in shared libraries

CONCEPTS COVERED:
- Primitive types and literals
- Type inference vs explicit annotations
- When to be explicit
- Type widening
*/

// ============================================
// STEP 1: Literal types for better modeling
// ============================================

type OrderStatus = 'pending' | 'shipped' | 'delivered' | 'cancelled';

let status: OrderStatus = 'pending';

// ============================================
// STEP 2: Inference vs annotation decisions
// ============================================

const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000
} as const; // 'as const' locks the types more tightly

// ============================================
// STEP 3: Modeling nullable data
// ============================================

type User = {
  id: number;
  name: string;
  email: string | null;
};

/*
DEEPER BREAKDOWN:

Literal union types are extremely powerful for modeling finite states.

'as const' is useful for configuration objects.

Being explicit about nullability forces you to handle missing data.

JUNIOR PERSPECTIVE:

Good typing is about accurately describing the shape and constraints of your data.

COMMON PITFALLS IN PRODUCTION:

1. Using string instead of more specific literal unions.
2. Over-annotating simple variables where inference is sufficient.
3. Ignoring null/undefined in API models.

EXPERIMENTS:

1. Model a real API response using literal types for status fields.
2. Compare inference with and without 'as const'.

JUNIOR CHALLENGE:

Create a type for a Task that has:
- id, title, status (literal union), dueDate (Date or null), assignee (User or null)
*/