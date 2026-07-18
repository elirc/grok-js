/*
BEGINNER GOAL:
Understand type aliases and how they help you create reusable custom types.

REAL WORLD USE CASE:
Instead of writing the same complex type over and over, you give it a name.
This makes code much more readable and maintainable.

CONCEPTS COVERED:
- The "type" keyword
- Creating type aliases for primitives, objects, and unions
- Difference between type and interface (basic comparison)
- Reusing custom types
*/

// ============================================
// STEP 1: Basic type alias
// ============================================

type UserID = string | number;

let currentUserId: UserID = "user_42";
let anotherId: UserID = 1001;

// ============================================
// STEP 2: Type alias for objects
// ============================================

type Product = {
  id: number;
  name: string;
  price: number;
};

let item: Product = {
  id: 1,
  name: "Laptop",
  price: 999
};

// ============================================
// STEP 3: Type alias for unions of literals
// ============================================

type Direction = "left" | "right" | "up" | "down";

function move(dir: Direction) {
  console.log("Moving " + dir);
}

move("left");
// move("forward"); // Error

// ============================================
// STEP 4: Type aliases can be used with arrays too
// ============================================

type StringList = string[];

let tags: StringList = ["react", "typescript"];

/*
LINE-BY-LINE BREAKDOWN:

type UserID = string | number;
- We create a new name "UserID" that represents this union
- Now we can use UserID anywhere instead of repeating string | number

type Product = { ... }
- We give a name to an object shape
- This is very similar to interface

type Direction = "left" | ...
- We create a limited set of allowed string values
- This is much safer than just using string

NOOB TRANSLATION:

A type alias is like giving a nickname to a complicated description.

Instead of writing:
let id: string | number

You write:
type UserID = string | number;
let id: UserID;

This makes your code easier to read and change later.

COMMON MISTAKES:

1. Using "type" and "interface" inconsistently in the same project
   - Both are valid. Pick one style and stick with it.

2. Thinking type aliases can do everything interfaces can (they are very similar but have small differences)

3. Creating too many tiny type aliases that make code harder to follow

TRY CHANGING THIS:

1. Create a type alias called Email that is just a string (for documentation purposes).

2. Create a type called Coordinates as an object with x and y as numbers.

3. Create a type called LoadingState as a union of three literal strings.

MINI CHALLENGE:

Create a type alias called CartItem that has:
- productId (number)
- name (string)
- quantity (number)

Then create an array type called Cart using CartItem[].

Make a variable of type Cart with two items.
*/