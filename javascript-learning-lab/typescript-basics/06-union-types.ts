/*
BEGINNER GOAL:
Learn union types — one of the most useful and common features in TypeScript.
A union type lets a value be one of several different types.

REAL WORLD USE CASE:
- A function that can accept either a string ID or a number ID
- Status that can be "loading", "success", or "error"
- A property that can be a string or null
- API responses that can return different shapes

CONCEPTS COVERED:
- The | (pipe) symbol for union types
- Using unions with variables and function parameters
- Type narrowing (how TypeScript helps you safely work with unions)
*/

// ============================================
// STEP 1: Basic union type
// ============================================

let id: string | number;

id = "user_123";   // OK
id = 456;          // OK
// id = true;      // Error!

// ============================================
// STEP 2: Union types in functions
// ============================================

function printId(id: string | number) {
  console.log("Your ID is: " + id);
}

printId("abc123");
printId(999);

// ============================================
// STEP 3: Type narrowing with unions
// ============================================

// When a value can be more than one type, we need to check the type before using it.

function formatId(id: string | number): string {
  if (typeof id === "string") {
    // Inside this block, TypeScript knows id is a string
    return id.toUpperCase();
  } else {
    // Here TypeScript knows id is a number
    return "ID-" + id;
  }
}

// ============================================
// STEP 4: Union of literal values (very powerful)
// ============================================

type Status = "loading" | "success" | "error";

let currentStatus: Status = "loading";
// currentStatus = "pending";   // Error! Only the three allowed values

function handleStatus(status: Status) {
  if (status === "loading") {
    console.log("Please wait...");
  } else if (status === "success") {
    console.log("Done!");
  } else {
    console.log("Something went wrong");
  }
}

/*
LINE-BY-LINE BREAKDOWN:

let id: string | number;
- The | symbol creates a union
- This variable can be either a string OR a number

function printId(id: string | number)
- The parameter can accept either type

if (typeof id === "string")
- This is called a type guard
- TypeScript is smart enough to understand that inside the if, id must be a string
- This is called "narrowing"

type Status = "loading" | "success" | "error";
- We can create unions of specific string values (literal types)
- This is extremely common for states and options

NOOB TRANSLATION:

A union type says:
"This value can be one of these options."

It's like saying a light switch can be "on" or "off", or a delivery can be "pending", "shipped", or "delivered".

TypeScript forces you to handle the different cases safely.

COMMON MISTAKES:

1. Forgetting to narrow the type before using methods that only exist on one of the types

2. Making unions too wide (string | any is almost useless)

3. Not realizing that literal unions are case-sensitive

TRY CHANGING THIS:

1. Create a variable that can be either a string or a boolean.

2. Write a function that accepts a string | number and returns its length if it's a string, or the number itself if it's a number.

3. Create a union type called Theme that can only be "light", "dark", or "system".

MINI CHALLENGE:

Create a function called getDisplayName that accepts a user which can be either:
- A string (the name directly)
- An object { firstName: string, lastName: string }

Return the display name in both cases.
*/