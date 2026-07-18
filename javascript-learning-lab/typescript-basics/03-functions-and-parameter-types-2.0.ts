/*
JUNIOR GOAL:
Design well-typed function signatures that communicate intent and prevent misuse.

REAL WORLD USE CASE:
- Public API surfaces of internal packages
- Service layer methods
- Hook and utility function design

CONCEPTS COVERED:
- Parameter and return type annotations
- Optional and default parameters
- Function overloads (basic)
- Typing 'this' in methods
*/

// ============================================
// STEP 1: Clear contracts
// ============================================

function createOrder(userId: number, items: OrderItem[], discountCode?: string): Order {
  // ...
}

// ============================================
// STEP 2: Overloads for flexibility
// ============================================

function findUser(id: number): User | undefined;
function findUser(email: string): User | undefined;
function findUser(idOrEmail: number | string): User | undefined {
  // implementation
}

// ============================================
// STEP 3: Typing callbacks
// ============================================

function processItems(items: Item[], callback: (item: Item, index: number) => void) {
  items.forEach(callback);
}

/*
DEEPER BREAKDOWN:

Good function types act as documentation.
They tell consumers what they can and cannot do.

Overloads are useful when the same logical operation has different input shapes.

JUNIOR PERSPECTIVE:

Spend time designing the signature before implementing the body.

COMMON PITFALLS IN PRODUCTION:

1. Using any for callback parameters.
2. Not typing the return value when it matters for chaining.
3. Making parameters too loose.

EXPERIMENTS:

1. Add overloads to a function that can take an id or an object.
2. Type a higher-order function like withAuth.

JUNIOR CHALLENGE:

Design typed signatures for a repository pattern:
find, findById, create, update, delete
Include proper return types and optional parameters.
*/