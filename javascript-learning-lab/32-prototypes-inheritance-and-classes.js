/*
MID-LEVEL GOAL:
Understand JavaScript's prototype chain, how inheritance actually works under the hood, and when (and why) to use ES6 classes versus other patterns.

REAL WORLD USE CASE:
- Understanding framework internals (React class components used to rely on this)
- Working with libraries that extend built-ins or use prototypes
- Debugging 'this' and method inheritance issues
- Deciding between composition and inheritance in your own abstractions

CONCEPTS COVERED:
- Prototype chain lookup
- __proto__ vs prototype vs constructor
- Object.create, new, and class under the hood
- Method sharing and memory
- Composition over inheritance patterns
*/

// ============================================
// STEP 1: The prototype chain
// ============================================

const animal = { eats: true };
const dog = Object.create(animal);
dog.barks = true;

console.log(dog.barks); // true (own)
console.log(dog.eats);  // true (inherited via [[Prototype]])

// dog.__proto__ === animal

// ============================================
// STEP 2: Constructor functions and .prototype
// ============================================

function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return `Hi, I'm ${this.name}`;
};

const p = new Person('Alex');
console.log(p.greet());           // works
console.log(p.hasOwnProperty('name')); // true
console.log(p.hasOwnProperty('greet')); // false (on prototype)

// ============================================
// STEP 3: ES6 class is syntactic sugar
// ============================================

class Animal {
  constructor(name) { this.name = name; }
  speak() { return `${this.name} makes a sound`; }
}

class Dog extends Animal {
  speak() { return `${this.name} barks`; }
}

const d = new Dog('Rex');
console.log(d.speak()); // Rex barks
console.log(d instanceof Animal); // true

// Under the hood: Dog.prototype.__proto__ === Animal.prototype

// ============================================
// STEP 4: Prefer composition
// ============================================

const canFly = (state) => ({
  fly: () => `${state.name} is flying`
});

const canSwim = (state) => ({
  swim: () => `${state.name} is swimming`
});

function createDuck(name) {
  const state = { name };
  return {
    ...state,
    ...canFly(state),
    ...canSwim(state)
  };
}

const duck = createDuck('Donald');
console.log(duck.fly());
console.log(duck.swim());

/*
DEEPER BREAKDOWN:

Every object has an internal [[Prototype]] link.
Property lookup walks the chain until it finds the property or reaches null.

Functions have a .prototype property that becomes the [[Prototype]] of objects created with 'new'.

class syntax sets up the prototype chain for you and enables 'super'.

Object.create is the fundamental way to set up delegation.

MID-LEVEL PERSPECTIVE:

Most modern JS favors composition (mixins, factory functions, delegation) over deep inheritance hierarchies because they are more flexible and avoid fragile base class problems.

Understanding the prototype model helps you debug 'this' binding, method borrowing, and library behavior.

COMMON PITFALLS:

- Forgetting that methods on prototype share 'this' — arrow functions in class fields change this behavior
- Deep prototype chains that are hard to reason about
- Extending built-ins (Array, Error) incorrectly across environments
- Assuming class methods are not on the prototype

EXPERIMENTS:

1. Manually implement 'new' using Object.create and call.
2. Create a small inheritance chain and inspect the full prototype chain with a helper.
3. Convert a class-based hierarchy to a composition-based factory.

MID-LEVEL CHALLENGE:

Implement a simple "EventEmitter" using prototype delegation (no class). Then create a "LoggedEmitter" that composes logging behavior without using inheritance.
*/