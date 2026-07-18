/*
MID-LEVEL GOAL:
Understand and apply metaprogramming features (Symbol, Proxy, Reflect) for advanced use cases.

REAL WORLD USE CASE:
- Building reactive systems and ORMs
- Creating validated or logged property access
- Implementing custom iteration or equality
- Library internals and debugging tools

CONCEPTS COVERED:
- Well-known symbols (iterator, toStringTag, etc.)
- Proxy traps
- Reflect for safe default operations
- Private fields vs symbols
*/

// ============================================
// STEP 1: Symbols for unique keys
// ============================================

const ID = Symbol('id');
const user = { name: 'Alex', [ID]: 123 };

console.log(Object.keys(user)); // ['name'] — symbol not enumerable

// ============================================
// STEP 2: Proxy for interception
// ============================================

const handler = {
  get(target, prop, receiver) {
    console.log(`Getting ${String(prop)}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value) {
    if (prop === 'age' && value < 0) throw new Error('Age cannot be negative');
    return Reflect.set(target, prop, value);
  }
};

const person = new Proxy({ name: 'Sam' }, handler);

// ============================================
// STEP 3: Custom iteration
// ============================================

const collection = {
  items: [1, 2, 3],
  [Symbol.iterator]() {
    let i = 0;
    return {
      next: () => ({ value: this.items[i], done: i++ >= this.items.length })
    };
  }
};

/*
DEEPER BREAKDOWN:

Symbols provide truly unique property keys that won't collide.
Proxy lets you intercept fundamental operations on objects.

Reflect provides the default behavior you can delegate to.

MID-LEVEL PERSPECTIVE:

These are power tools. Use them when you need to deeply customize object behavior.

COMMON PITFALLS:

- Using Proxy for everything (huge performance cost)
- Forgetting that symbols are not enumerable by default
- Incorrectly implementing traps and breaking invariants

EXPERIMENTS:

1. Create a Proxy that logs all property access and mutations.
2. Implement a custom iterator for a tree structure.
3. Use Symbol.toStringTag to improve debugging output.

MID-LEVEL CHALLENGE:

Build a "validated object" using Proxy that:
- Enforces a schema on property assignment
- Supports deep validation
- Provides a way to get validation errors without throwing
- Uses symbols internally so they don't pollute the public interface
*/