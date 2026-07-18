/*
BEGINNER GOAL:
Learn what callback functions are.
A callback is a function that you pass into another function so it can be called later.

REAL WORLD USE CASE:
- Running code after a button is clicked
- Doing something after data finishes loading
- Customizing how map, filter, and forEach work
- Any time you want to say "when this thing happens, run this code"

CONCEPTS COVERED:
- What a callback is
- Passing functions as arguments
- Anonymous functions as callbacks
- Arrow functions as callbacks
- setTimeout as a simple real example of async callbacks
- Understanding that functions can be values
*/

// ============================================
// STEP 1: Functions can be stored in variables
// ============================================

function sayHi() {
  console.log("Hi there!");
}

// We can store the function in a variable
let myFunction = sayHi;

// We can call it using the variable name
myFunction();

// ============================================
// STEP 2: Passing a function into another function
// ============================================

function doTwice(someFunction) {
  // someFunction is a parameter that expects a function
  someFunction();
  someFunction();
}

function laugh() {
  console.log("Haha!");
}

// We pass the laugh function (without calling it)
doTwice(laugh);

// ============================================
// STEP 3: Using anonymous functions as callbacks
// ============================================

doTwice(function() {
  console.log("This is an anonymous callback!");
});

// ============================================
// STEP 4: Arrow functions as callbacks (most common)
// ============================================

doTwice(() => {
  console.log("Arrow function callback!");
});

// ============================================
// STEP 5: Real example with setTimeout
// ============================================

// setTimeout runs a callback after a delay (in milliseconds)

console.log("Starting...");

setTimeout(function() {
  console.log("This runs 2 seconds later!");
}, 2000);

// The code below runs immediately — it does not wait
console.log("This runs right away.");

// ============================================
// STEP 6: Callbacks with array methods
// ============================================

let numbers = [1, 2, 3, 4];

let doubled = numbers.map(function(num) {
  return num * 2;
});

console.log(doubled);

// Using arrow
let tripled = numbers.map(num => num * 3);
console.log(tripled);

// ============================================
// STEP 7: A function that accepts a callback
// ============================================

function processUser(name, callback) {
  console.log("Processing user:", name);
  // Pretend some work is done...
  callback(name); // we call the callback when we're ready
}

processUser("Alex", function(name) {
  console.log("Done processing. Hello " + name);
});

// ============================================
// STEP 8: Why callbacks matter
// ============================================

// They let us control when code runs.
// Instead of the function deciding everything,
// we give it a piece of code to run at the right moment.

/*
LINE-BY-LINE BREAKDOWN:

let myFunction = sayHi;
- We are not calling sayHi here (no parentheses)
- We are passing the function itself as a value
- Functions are "first-class citizens" in JavaScript

function doTwice(someFunction) {
- The parameter someFunction will receive a function
- Inside we can call it just like any other function

doTwice(laugh);
- We pass the laugh function (without ())
- doTwice will call it for us

setTimeout(function() { ... }, 2000);
- The first argument is a callback function
- The second argument is the delay in milliseconds
- After the delay, JavaScript will call our callback

numbers.map(function(num) { ... })
- map expects you to give it a function
- It will call that function for every item
- Whatever your function returns becomes the new value

NOOB TRANSLATION:

A callback is like giving someone your phone number and saying:
"Call me when you're done."

You don't stand there waiting. You give them a function (your phone) and say "run this later."

When the work is finished (data loaded, button clicked, timer done), they call your function.

COMMON MISTAKES:

1. Calling the callback immediately instead of passing it
   - doTwice(laugh()) ← wrong, this calls it right now
   - doTwice(laugh)   ← correct, pass the function

2. Forgetting that the callback might run later (asynchronous)

3. Not understanding what arguments the callback will receive

4. Writing deeply nested callbacks (callback hell) — we'll learn better ways later

TRY CHANGING THIS:

1. Write a function called runThreeTimes that takes a callback and calls it three times.

2. Use setTimeout with an arrow function to print "Done!" after 1 second.

3. Pass an anonymous function to .forEach on an array of names that prints each name in uppercase.

MINI CHALLENGE:

Create a function called delayedGreet that takes two arguments:
- A name (string)
- A callback function

After 1.5 seconds, call the callback with the name.

Example usage:
delayedGreet("Sam", function(name) {
  console.log("Hello " + name);
});
*/