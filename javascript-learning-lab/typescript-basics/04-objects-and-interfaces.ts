/*
BEGINNER GOAL:
Learn how to describe the shape of objects using types and interfaces in TypeScript.

REAL WORLD USE CASE:
Real applications almost never work with just strings and numbers.
They work with objects: users, products, orders, posts, etc.
Defining the shape of these objects is one of the most powerful parts of TypeScript.

CONCEPTS COVERED:
- Typing object literals
- Inline object types
- Using interfaces
- Required vs optional properties in objects
- How interfaces help with consistency
*/

// ============================================
// STEP 1: Typing a simple object
// ============================================

// In plain JavaScript we might write:
let user = {
  name: "Alex",
  age: 28
};

// In TypeScript we can describe exactly what this object should look like:

let typedUser: { name: string; age: number } = {
  name: "Alex",
  age: 28
};

// If we try to add or remove properties incorrectly, TypeScript complains:

// typedUser.email = "alex@test.com";   // Error: Property 'email' does not exist on type...

// ============================================
// STEP 2: Using interfaces (the recommended way)
// ============================================

// An interface is a way to name and reuse an object shape.

interface User {
  name: string;
  age: number;
  isActive: boolean;
}

let user1: User = {
  name: "Sam",
  age: 31,
  isActive: true
};

let user2: User = {
  name: "Taylor",
  age: 22,
  isActive: false
};

// ============================================
// STEP 3: Optional properties in interfaces
// ============================================

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;   // The ? makes this optional
}

let product1: Product = {
  id: 1,
  name: "Keyboard",
  price: 79
  // description is not required
};

let product2: Product = {
  id: 2,
  name: "Mouse",
  price: 29,
  description: "Wireless optical mouse"
};

// ============================================
// STEP 4: Using interfaces with functions
// ============================================

function printUser(user: User): void {
  console.log(`${user.name} is ${user.age} years old`);
}

printUser(user1);

/*
LINE-BY-LINE BREAKDOWN:

let typedUser: { name: string; age: number } = { ... }
- This is an inline object type
- We are saying: this variable must be an object with a name (string) and age (number)

interface User { ... }
- We create a reusable named type called User
- Any object we mark as User must have exactly these properties with these types

description?: string
- The question mark means this property does not have to be present
- When it is present, it must be a string

function printUser(user: User): void
- The parameter "user" must match the User interface
- ": void" means this function does not return any value

NOOB TRANSLATION:

An interface is like a blueprint or a contract.

You say:
"I expect every User to have a name that is text, an age that is a number, and an isActive that is true or false."

Then whenever you create or receive a User, TypeScript checks that the object actually follows the blueprint.

This catches a huge number of bugs.

COMMON MISTAKES:

1. Forgetting that object properties are required by default
   - You must use ? if you want them to be optional

2. Adding extra properties that are not in the interface
   - TypeScript is strict about extra properties in many cases

3. Confusing interface with class (interfaces don't create objects, they only describe them)

4. Not using interfaces for objects that are used in multiple places

TRY CHANGING THIS:

1. Create an interface called Book with title (string), author (string), and pages (number).

2. Make a property called publishedYear optional in your Book interface.

3. Write a function that accepts a Book and logs its title and author.

MINI CHALLENGE:

Create an interface called Order that has:
- orderId (string)
- customerName (string)
- total (number)
- items (array of strings) - hint: string[]

Create two different orders that follow this interface.
*/