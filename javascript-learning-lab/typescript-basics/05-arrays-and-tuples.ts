/*
BEGINNER GOAL:
Learn how to properly type arrays and the special concept of tuples in TypeScript.

REAL WORLD USE CASE:
Arrays are used constantly (lists of users, products, messages, etc.).
Tuples are useful when you have a small fixed set of values in a specific order (like coordinates or [status, message]).

CONCEPTS COVERED:
- Typing arrays with type[]
- Alternative syntax Array<type>
- Tuples - arrays with fixed length and specific types at each position
- Readonly arrays (basic)
*/

// ============================================
// STEP 1: Typing arrays
// ============================================

// An array of strings:
let colors: string[] = ["red", "green", "blue"];

// An array of numbers:
let scores: number[] = [85, 92, 78];

// Alternative syntax (less common but valid):
let names: Array<string> = ["Alex", "Sam"];

// ============================================
// STEP 2: Arrays of objects
// ============================================

interface User {
  name: string;
  age: number;
}

let users: User[] = [
  { name: "Alex", age: 28 },
  { name: "Sam", age: 31 }
];

// ============================================
// STEP 3: What happens if you put the wrong type in an array
// ============================================

// colors.push(42);   // Error! Argument of type 'number' is not assignable to parameter of type 'string'.

// TypeScript protects the contents of the array.

// ============================================
// STEP 4: Tuples - fixed position, fixed types
// ============================================

// A tuple is an array with a specific number of elements
// and a specific type for each position.

let personInfo: [string, number] = ["Alex", 28];
// First position must be string, second must be number

// personInfo = ["Sam", "thirty"];  // Error!

// Useful for small fixed structures:
let rgbColor: [number, number, number] = [255, 100, 50];
let httpResponse: [number, string] = [200, "OK"];

// ============================================
// STEP 5: Tuples with optional elements
// ============================================

let optionalTuple: [string, number?] = ["hello"];
optionalTuple = ["hello", 42];   // also valid

/*
LINE-BY-LINE BREAKDOWN:

let colors: string[] = ["red", "green", "blue"];
- The type annotation "string[]" means "array of strings"
- The square brackets after the type tell TypeScript this is an array

let users: User[] = [...]
- We can use any custom type (like our interface User) inside the array type

let personInfo: [string, number] = ["Alex", 28];
- This is tuple syntax
- We use regular array brackets [] but list the exact types in order inside
- Position 0 must be string
- Position 1 must be number
- The length is also enforced

NOOB TRANSLATION:

A regular typed array says:
"This box can hold as many strings as you want."

A tuple says:
"This is a small package that must contain exactly two things: first a string, then a number. Nothing else allowed."

Tuples are great when order and position actually matter.

COMMON MISTAKES:

1. Confusing arrays with tuples
   - Use [] when you want a list that can grow
   - Use tuple syntax when the number of items and their order are fixed

2. Trying to push into a tuple (length is usually fixed)

3. Forgetting that tuples are still arrays at runtime (they become regular arrays in the compiled JavaScript)

TRY CHANGING THIS:

1. Create a typed array of numbers called temperatures.

2. Create a tuple called movie that contains a string title and a number year.

3. Try to add an extra item to your tuple and see the error.

MINI CHALLENGE:

Create a tuple type called Point that always has exactly two numbers: [x, y].

Then create an array of Point tuples representing several points on a graph.
*/