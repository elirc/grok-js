/*
BEGINNER GOAL:
Understand what TypeScript is, why it was created, and how it relates to regular JavaScript.
Learn that TypeScript adds "types" on top of JavaScript to help catch mistakes early.

REAL WORLD USE CASE:
Almost every medium-to-large JavaScript project today uses TypeScript.
- Companies use it to prevent bugs in production
- It makes working in teams easier because types act like documentation
- Popular frameworks like React, Next.js, and Angular use TypeScript by default
- When you look at job listings for frontend developers, "TypeScript" is often required

CONCEPTS COVERED:
- What TypeScript is
- How TypeScript relates to JavaScript
- The main benefit: catching errors before running code
- .ts files vs .js files
- The idea of "types"
- Why beginners benefit from learning TypeScript after JavaScript
*/

// ============================================
// STEP 1: What is TypeScript?
// ============================================

// TypeScript is a programming language that is a superset of JavaScript.
// This means: TypeScript = JavaScript + extra features (mainly types).

// You write code in TypeScript (.ts files).
// Then TypeScript is "compiled" (converted) into regular JavaScript (.js files)
// that browsers and Node.js can actually run.

// The biggest addition TypeScript gives us is: TYPES.

// ============================================
// STEP 2: Why do we need types?
// ============================================

// In plain JavaScript, you can do this:

let score = 42;
score = "hello";   // JavaScript allows this! No error until later when you try to use it as a number.

// This kind of mistake can cause bugs that are hard to find.

// In TypeScript, you can tell the computer what type of value a variable should hold:

let gameScore: number = 42;
// The ": number" part is called a "type annotation".

// gameScore = "hello";   // TypeScript will give you an error here!
// Error: Type 'string' is not assignable to type 'number'.

// ============================================
// STEP 3: Types act like a safety net
// ============================================

// Think of types as labels on boxes.

// In JavaScript:
// - You have boxes with no labels
// - You can put anything in any box
// - Later you might open the box expecting apples and find socks

// In TypeScript:
// - Every box has a clear label ("this box holds numbers only")
// - The computer checks the labels while you are writing code
// - You catch mistakes immediately instead of when the app crashes for users

// ============================================
// STEP 4: TypeScript does not replace JavaScript
// ============================================

// TypeScript does not run in the browser directly.
// The TypeScript compiler turns your .ts code into .js code.

// This means:
// - You still need to know JavaScript very well
// - Everything you learned in the original JavaScript files still applies
// - TypeScript just adds extra safety and better tooling

// ============================================
// STEP 5: When should you learn TypeScript?
// ============================================

// Best order for beginners:
// 1. Learn JavaScript first (variables, functions, arrays, objects, etc.)
// 2. Then learn TypeScript

// Trying to learn TypeScript before you are comfortable with JavaScript
// will feel much harder because the types are describing JavaScript concepts.

/*
LINE-BY-LINE BREAKDOWN:

let score = 42;
- This is regular JavaScript. No type information is given.

let gameScore: number = 42;
- This is TypeScript syntax.
- The colon : introduces a type annotation.
- "number" is the type we are assigning to this variable.
- TypeScript will now protect this variable and only allow numbers to be stored in it.

gameScore = "hello";
- In plain JavaScript this would work.
- In TypeScript this line causes a compile-time error.
- The error happens while you are writing the code (in your editor), not when the program runs.

.ts files
- Files with the .ts extension contain TypeScript code.
- They cannot be run directly by browsers or Node.
- They must be compiled first.

NOOB TRANSLATION:

Imagine JavaScript is like writing notes on loose paper.
TypeScript is like writing the same notes but also putting sticky labels on everything that say "this is a number", "this is a string", "this function must receive a user".

The labels don't change what the paper says — they just help you and your teammates avoid stupid mistakes.

TypeScript is your helpful friend who yells "Hey! That box is supposed to hold numbers!" before you ship your app.

COMMON MISTAKES:

1. Thinking you can skip learning JavaScript and go straight to TypeScript
   - TypeScript builds directly on JavaScript knowledge.

2. Writing types everywhere from day one without understanding what the JavaScript code is doing.

3. Getting frustrated because your editor shows red errors
   - Those red errors are actually helping you.

4. Thinking TypeScript makes your code slower
   - TypeScript is only used during development. The final output is regular JavaScript.

TRY CHANGING THIS:

1. In a regular JavaScript file, try assigning a string to a variable that was originally a number. Then do the same in a .ts file and notice the difference.

2. Open the TypeScript Playground (https://www.typescriptlang.org/play) and paste this code:
   let age: number = 25;
   age = "twenty five";
   Watch what error appears.

3. Write one line of TypeScript that declares a variable called isLoggedIn with the type boolean.

MINI CHALLENGE:

Create a new .ts file and declare three variables with type annotations:
- A string called userName
- A number called loginCount
- A boolean called isPremium

Then try (on purpose) to assign wrong types to them and observe the errors.
*/