/*
BEGINNER GOAL:
Learn about three special types in TypeScript: any, unknown, and never.
Understanding these helps you avoid common traps.

REAL WORLD USE CASE:
- any: used when migrating from JavaScript or dealing with untyped data
- unknown: safer replacement for any when you don't know the type yet
- never: represents values that should never happen

CONCEPTS COVERED:
- any (escape hatch - use sparingly)
- unknown (safer alternative)
- never (for impossible states)
- When each one appears
*/

// ============================================
// STEP 1: The any type (avoid when possible)
// ============================================

let data: any = 42;
data = "hello";
data = { foo: "bar" };

// With any, TypeScript basically turns off type checking for that variable.
// This defeats the purpose of using TypeScript.

function processData(input: any) {
  return input.something.nested;   // No safety at all
}

// ============================================
// STEP 2: The unknown type (better than any)
// ============================================

let userInput: unknown;

userInput = "hello";
userInput = 42;

// You cannot use an unknown value without checking its type first:

// console.log(userInput.toUpperCase());   // Error

if (typeof userInput === "string") {
  console.log(userInput.toUpperCase());   // Now it's safe
}

// ============================================
// STEP 3: The never type
// ============================================

// never represents a value that can never exist.

function throwError(message: string): never {
  throw new Error(message);
}

// This function never returns normally — it always throws.

// never is also used by TypeScript when it detects impossible code paths.

function handleStatus(status: "success" | "error") {
  if (status === "success") {
    return "Great!";
  } else if (status === "error") {
    return "Oops";
  }
  // If we reach here, it's impossible. TypeScript infers never.
  const check: never = status;
}

/*
LINE-BY-LINE BREAKDOWN:

let data: any
- any means "I don't care about types for this"
- You lose all protection

let userInput: unknown
- unknown means "I don't know the type yet"
- You must prove the type (using typeof, checks, etc.) before using it

function throwError(): never
- The function is marked as never returning a value
- This is useful for functions that only throw

NOOB TRANSLATION:

- any = "Whatever, just let me do anything" (dangerous)
- unknown = "I don't know yet, I'll figure it out safely later" (responsible)
- never = "This situation is impossible"

Try to use unknown instead of any when you truly don't know the type.

COMMON MISTAKES:

1. Using any everywhere because "it's easier"
   - This removes all the benefits of TypeScript

2. Being scared of unknown
   - It's actually the safer choice

3. Trying to assign values to a never variable in normal code

TRY CHANGING THIS:

1. Create a variable typed as any and do wild things with it.

2. Create a variable typed as unknown and try to use it without checking.

3. Write a function that always throws and mark its return type as never.

MINI CHALLENGE:

Write a function that accepts a parameter of type unknown.
Inside the function, check if it's a string or a number and handle each case.
If it's neither, throw an error.
*/