/*
BEGINNER GOAL:
Learn how to add type annotations to function parameters and understand why this is one of the most useful features of TypeScript.

REAL WORLD USE CASE:
Functions are everywhere in real applications.
When multiple developers work on the same project, knowing exactly what type of data a function expects prevents many bugs.
TypeScript makes the "contract" of a function very clear.

CONCEPTS COVERED:
- Typing function parameters
- Required vs optional parameters
- Default parameter values with types
- How TypeScript helps when calling functions
*/

// ============================================
// STEP 1: Basic function parameter types
// ============================================

// In plain JavaScript:
function greet(name) {
  return "Hello " + name;
}

// In TypeScript we say what type name must be:
function greetUser(name: string) {
  return "Hello " + name;
}

greetUser("Alex");        // OK
// greetUser(42);         // Error! Argument of type 'number' is not assignable to parameter of type 'string'.

// ============================================
// STEP 2: Multiple parameters with types
// ============================================

function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

let total = calculateTotal(19.99, 3);
// TypeScript knows both arguments must be numbers

// ============================================
// STEP 3: Optional parameters
// ============================================

// Sometimes you want a parameter to be optional.
// Add a question mark ? after the parameter name.

function createUser(name: string, age?: number) {
  if (age) {
    return `${name} is ${age} years old`;
  }
  return `${name} (age not provided)`;
}

createUser("Sam");           // OK - age is optional
createUser("Jordan", 25);    // OK

// ============================================
// STEP 4: Default parameter values
// ============================================

// You can give a parameter a default value.
// When you do this, the type is usually inferred, but you can still write it.

function logMessage(message: string = "No message provided") {
  console.log(message);
}

logMessage();                    // Uses default
logMessage("Hello world");       // Uses the value you passed

// ============================================
// STEP 5: Why typed parameters are powerful
// ============================================

// Your code editor (VS Code + TypeScript) will show you hints and errors
// while you are typing the function call.

// This is called "intellisense" or "autocomplete".
// It makes development much faster and safer.

/*
LINE-BY-LINE BREAKDOWN:

function greetUser(name: string)
- "name" is the parameter name
- ": string" is the type annotation
- This tells anyone reading the code (and TypeScript) that this function expects text

function calculateTotal(price: number, quantity: number): number
- We have two parameters, each with their own type
- After the closing parenthesis we added ": number"
- This is the return type annotation. It says "this function will always return a number"

age?: number
- The ? makes this parameter optional
- You can call the function with or without this argument
- Inside the function, you should check if it was provided (it might be undefined)

message: string = "No message provided"
- This parameter has both a type and a default value
- If the caller doesn't pass anything, the default string is used

NOOB TRANSLATION:

Typing function parameters is like writing a very clear instruction manual for your function:

"Give me a string for the name. Give me a number for the age.
I will give you back a string."

If someone tries to give you the wrong kind of ingredient, TypeScript immediately says:
"Wait, you gave me a number where I asked for a string!"

COMMON MISTAKES:

1. Forgetting the colon when writing types in functions
   - function add(a number, b number) ← wrong syntax

2. Making every parameter optional when they should be required

3. Not handling the case where an optional parameter is undefined

4. Confusing the return type with parameter types

TRY CHANGING THIS:

1. Write a function called multiply that takes two numbers and returns their product. Add types to everything.

2. Create a function called sayHello that takes an optional name parameter (string). If no name is given, use "friend".

3. Call your functions with wrong argument types on purpose and read the error messages.

MINI CHALLENGE:

Write a function called describePet that accepts:
- petName (string, required)
- animalType (string, required)
- age (number, optional)

The function should return a nicely formatted sentence.
Add proper type annotations to parameters and return type.
*/