/*
MID-LEVEL GOAL:
Master generics to write flexible, reusable, and type-safe code that scales across a codebase.

REAL WORLD USE CASE:
- Building utility libraries and hooks
- API clients with typed responses
- Generic data structures and algorithms
- Component libraries that preserve type information

CONCEPTS COVERED:
- Generic functions, interfaces, and classes
- Type parameters and constraints
- Generic inference and explicit arguments
- Default type parameters
- Generic constraints with keyof and extends
*/

// ============================================
// STEP 1: Basic generic function
// ============================================

function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42);
const str = identity('hello'); // inferred

// ============================================
// STEP 2: Constraints
// ============================================

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: 'Alex' };
const name = getProperty(user, 'name'); // string

// ============================================
// STEP 3: Generic interfaces and classes
// ============================================

interface Repository<T> {
  findById(id: string): Promise<T | null>;
  save(entity: T): Promise<T>;
}

class InMemoryRepo<T extends { id: string }> implements Repository<T> {
  private store = new Map<string, T>();

  async findById(id: string) { return this.store.get(id) ?? null; }
  async save(entity: T) { this.store.set(entity.id, entity); return entity; }
}

/*
DEEPER BREAKDOWN:

Type parameters are placeholders resolved at call/use site.
Constraints limit what can be passed (extends).

keyof + generics gives you type-safe property access (very common pattern).

Inference usually works, but explicit types help when inference fails or for documentation.

MID-LEVEL PERSPECTIVE:

Generics are the primary tool for creating reusable abstractions without losing type safety. Over-using 'any' or duplicating types kills maintainability.

COMMON PITFALLS:

- Over-constraining or under-constraining generics
- Complex generic signatures that become unreadable
- Forgetting that generics are erased at runtime (no runtime reflection)
- Creating too many generic parameters

EXPERIMENTS:

1. Write a generic `groupBy` function that takes an array and a key selector.
2. Create a generic `Result<T, E>` type and helper functions.
3. Build a typed event emitter using generics for event names and payloads.

MID-LEVEL CHALLENGE:

Implement a generic `ApiClient` class that:
- Is parameterized by a resource type T
- Has typed methods: get(id), list(), create(data), update(id, data)
- Uses a generic base URL and optional transformer functions
- Provides proper error typing
*/