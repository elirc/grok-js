/*
BEGINNER GOAL:
Learn the most common basic types in TypeScript and how to write type annotations for variables.

REAL WORLD USE CASE:
Every variable, function parameter, and object property in a TypeScript project will use these basic types.
You will see string, number, boolean, and others constantly when reading real code.

CONCEPTS COVERED:
- string type
- number type
- boolean type
- Type annotations syntax (variable: type)
- Type inference (when TypeScript figures out the type by itself)
- Explicit vs implicit typing
*/

// ============================================
// STEP 1: The string type
// ============================================

// string means text

let firstName: string = "Alex";
// The colon and "string" tell TypeScript: this variable must always be text.

let lastName: string = 'Rivera';

// You can also let TypeScript infer the type:

let city = "Seattle";
// TypeScript sees the quotes and automatically knows city is a string.
// This is called "type inference".

// city = 42;   // Error! TypeScript knows city should be a string.

// ============================================
// STEP 2: The number type
// ============================================

// number represents all numeric values (integers and decimals)

let age: number = 28;
let price: number = 19.99;
let temperature: number = -5;

// TypeScript does not have separate types for int and float like some languages.
// Everything numeric is just "number".

// ============================================
// STEP 3: The boolean type
// ============================================

// boolean can only be true or false

let isLoggedIn: boolean = true;
let hasPermission: boolean = false;

let isActive = true;   // TypeScript infers boolean here too

// ============================================
// STEP 4: Explicit vs inferred types
// ============================================

// Explicit (you write the type):
let score: number = 100;

// Inferred (you don't write it, TypeScript figures it out):
let total = 250;

// Both are valid. Many developers prefer to let TypeScript infer when possible
// and only write types when they add clarity or safety.

// ============================================
// STEP 5: Using these types in practice
// ============================================

function formatUser(name: string, age: number): string {
  return `${name} is ${age} years old`;
}

// The function above says:
// - name must be a string
// - age must be a number
// - This function will return a string

let userInfo = formatUser("Sam", 31);
console.log(userInfo);

// formatUser("Sam", "thirty one");  // Error! age must be number

/*
LINE-BY-LINE BREAKDOWN:

let firstName: string = "Alex";
- We declare a variable
- We use a type annotation ": string"
- TypeScript will now only allow string values to be assigned to firstName

let city = "Seattle";
- No type annotation is written
- TypeScript looks at the value "Seattle" and infers that the type is string
- This is called type inference

let price: number = 19.99;
- Explicitly telling TypeScript this variable will only hold numbers

function formatUser(name: string, age: number): string
- This is a function with typed parameters
- name must be string
- age must be number
- After the parentheses we have ": string" — this is the return type
- TypeScript will make sure we actually return a string from this function

NOOB TRANSLATION:

A type annotation is like putting a label on a container that says:
"This container is only allowed to hold strings."

When you write:
let name: string = "Alex";

You're saying "I am creating a box called name. Only text is allowed inside."

If you later try to put a number inside, TypeScript stops you.

Type inference is when TypeScript is smart enough to read the label itself without you writing it.

COMMON MISTAKES:

1. Writing the type after the value instead of before:
   - let name = "Alex": string;   ← wrong
   - let name: string = "Alex";   ← correct

2. Thinking number only means whole numbers
   - 3.14 is also a valid number in TypeScript

3. Overusing explicit types when inference is clear
   - Sometimes writing every type makes code more noisy

4. Forgetting that once you annotate a type, you cannot change it later

TRY CHANGING THIS:

1. Create a variable with type string and try assigning a number to it on the next line.

2. Create a variable without a type annotation and assign a boolean. Then try to assign a string to it.

3. Write a function that takes two numbers and returns their sum. Add type annotations to the parameters and return type.

MINI CHALLENGE:

Declare the following with proper type annotations:
- A variable called productName that is a string
- A variable called quantity that is a number
- A variable called inStock that is a boolean

Then create a function called getProductLabel that accepts these three values (with types) and returns a string describing the product.
*/