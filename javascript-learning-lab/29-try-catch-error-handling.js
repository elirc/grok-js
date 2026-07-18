/*
BEGINNER GOAL:
Learn how to handle errors gracefully using try and catch.
Good programs expect things to go wrong and know how to recover.

REAL WORLD USE CASE:
- Network requests that might fail
- Parsing bad data
- User input that doesn't match what you expected
- Accessing properties that might not exist
- Any situation where you want to prevent the whole app from crashing

CONCEPTS COVERED:
- try block
- catch block
- finally block
- Throwing custom errors with throw
- Error objects
- Why error handling makes your code more reliable
*/

// ============================================
// STEP 1: Basic try/catch
// ============================================

try {
  // Code that might break goes here
  let result = someVariableThatDoesNotExist * 2;
  console.log(result);
} catch (error) {
  // If something goes wrong, this block runs instead of crashing
  console.log("Caught an error:", error.message);
}

console.log("Program continues running...");

// ============================================
// STEP 2: Catching specific problems
// ============================================

function getUserAge(user) {
  try {
    // This will fail if user or user.profile is undefined
    return user.profile.age;
  } catch (error) {
    console.log("Could not get user age. Returning default.");
    return 0;
  }
}

let badUser = null;
console.log(getUserAge(badUser)); // 0 instead of crash

// ============================================
// STEP 3: Throwing your own errors
// ============================================

function divide(a, b) {
  if (b === 0) {
    // We can create and throw our own error
    throw new Error("Cannot divide by zero!");
  }
  return a / b;
}

try {
  let answer = divide(10, 0);
  console.log(answer);
} catch (error) {
  console.log("Math error:", error.message);
}

// ============================================
// STEP 4: The finally block
// ============================================

// finally always runs, whether there was an error or not
// Great for cleanup (closing connections, hiding loading spinners, etc.)

function riskyOperation() {
  try {
    console.log("Doing risky work...");
    // pretend something fails
    throw new Error("Something broke");
  } catch (error) {
    console.log("Error handled:", error.message);
  } finally {
    console.log("Cleanup always happens (finally block)");
  }
}

riskyOperation();

// ============================================
// STEP 5: Using try/catch with async/await
// ============================================

async function loadDataSafely() {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    let data = await response.json();
    console.log("Data loaded safely:", data.title);
  } catch (error) {
    console.log("Failed to load data:", error.message);
  }
}

// loadDataSafely();

// ============================================
// STEP 6: Real world defensive coding
// ============================================

function safeParseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.log("Invalid JSON, returning empty object instead.");
    return {};
  }
}

let badJSON = "{ not valid json }";
let result = safeParseJSON(badJSON);
console.log("Result:", result);

/*
LINE-BY-LINE BREAKDOWN:

try { ... } catch (error) { ... }
- try runs the code that might fail
- If any line throws an error, execution jumps straight to catch
- The error object contains .message and other info

throw new Error("message")
- We can intentionally stop execution and create our own error
- Very useful for enforcing rules ("you can't divide by zero")

finally { ... }
- This block runs no matter what happened
- Whether the try succeeded or the catch ran, finally still executes
- Perfect for cleanup code

async function loadDataSafely() {
  try { await ... } catch ...
- With async/await we use regular try/catch instead of .catch()
- Much easier to read when you have many steps

NOOB TRANSLATION:

try/catch is like wearing a seatbelt.
You hope nothing bad happens, but if it does, you don't want to get hurt.

Instead of letting the program explode when something goes wrong,
you say "if this fails, here's what I want to do instead."

COMMON MISTAKES:

1. Wrapping too much code in try — hard to know what actually failed

2. Catching errors but doing nothing with them (silent failures)

3. Forgetting that async code needs await inside try

4. Throwing strings instead of Error objects

5. Using try/catch for normal control flow (if/else is better for expected cases)

TRY CHANGING THIS:

1. Wrap a piece of code that accesses a property on undefined and catch the error.

2. Write a function that throws an error if a name is shorter than 3 characters.

3. Add a finally block that always logs "Operation finished".

MINI CHALLENGE:

Write a function called safeGetProperty that takes an object and a property name.
It should try to return the property value.
If anything goes wrong (object is null, property doesn't exist, etc), it should return null instead of throwing.
*/