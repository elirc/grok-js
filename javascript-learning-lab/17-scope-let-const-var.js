/*
BEGINNER GOAL:
Understand scope — where variables can be seen and used in your code.
This is one of the most confusing topics for beginners but extremely important.

REAL WORLD USE CASE:
- Variables created inside functions should not leak out
- Avoiding accidentally changing variables in other parts of the program
- Understanding why some variables are "not defined"
- Knowing when to use let vs const vs var

CONCEPTS COVERED:
- Global scope
- Function scope
- Block scope (let and const)
- var vs let vs const
- Why we almost never use var anymore
- How scope affects where you can read or change a variable
*/

// ============================================
// STEP 1: Global scope
// ============================================

// Variables declared outside of any function or block are global.
let globalName = "I am everywhere";

function showGlobal() {
  console.log(globalName); // Can see it inside the function
}

showGlobal();
console.log(globalName); // Also visible here

// ============================================
// STEP 2: Function scope
// ============================================

function createSecret() {
  let secret = "This is hidden inside the function";
  console.log("Inside function:", secret);
}

createSecret();

// console.log(secret); // ERROR! secret does not exist here
// The variable "secret" only lives inside createSecret

// ============================================
// STEP 3: Block scope with let and const
// ============================================

// A "block" is anything inside curly braces: if, for, while, etc.

let age = 25;

if (age >= 18) {
  let message = "You are an adult.";
  console.log(message); // works here
}

// console.log(message); // ERROR — message only exists inside the if block

// ============================================
// STEP 4: Loops create their own scope too
// ============================================

for (let i = 0; i < 3; i++) {
  console.log("Inside loop i =", i);
}

// console.log(i); // ERROR — i only exists inside the for loop

// ============================================
// STEP 5: var does NOT have block scope (this is why we avoid it)
// ============================================

if (true) {
  var oldStyle = "I leak out!";
}

console.log("var leaked:", oldStyle); // This works (bad!)

// With let this would have been an error outside the block:
if (true) {
  let modern = "I stay inside";
}
// console.log(modern); // ReferenceError

// ============================================
// STEP 6: Shadowing (same name in different scopes)
// ============================================

let username = "global user";

function printUsername() {
  let username = "local user"; // This is a completely different variable
  console.log("Inside function:", username);
}

printUsername();
console.log("Outside:", username);

// The inner username "shadows" the outer one while inside the function.

// ============================================
// STEP 7: Best practice summary
// ============================================

// - Use const by default
// - Use let when you need to reassign
// - Avoid var
// - Keep variables as close as possible to where they are used

function calculateTotal(items) {
  let total = 0; // only needed inside this function

  for (let item of items) {
    total = total + item.price;
  }

  return total;
}

/*
LINE-BY-LINE BREAKDOWN:

let globalName = "I am everywhere";
- Declared at the top level (outside any block or function)
- Visible everywhere in the file (global scope)

let secret = "...";
- Declared inside a function
- Only visible inside that function
- Gets destroyed when the function finishes

let message = "...";
- Declared inside an if block
- Only visible inside that block {}

for (let i = 0; ...)
- The variable i only exists inside the loop

var oldStyle = "...";
- var ignores block scope
- It only cares about function scope
- This is why it causes so many bugs

let username = "local user";
- This creates a new variable that temporarily hides the outer one
- Called "shadowing"

NOOB TRANSLATION:

Scope is like rooms in a house.

- Global variables are like things sitting in the living room that everyone can see.
- Variables created inside a function are like things inside a bedroom. Only people in that bedroom can see them.
- Variables created inside an if or for are even more private — they only exist inside that tiny space.

var is like a ghost that can walk through walls (blocks). We don't want ghosts.

COMMON MISTAKES:

1. Thinking you can use a variable from inside a function outside of it

2. Accidentally creating global variables by forgetting let/const

3. Using the same variable name in different places and getting confused

4. Using var and being surprised when variables leak out of loops and if statements

5. Trying to access loop counters after the loop has finished

TRY CHANGING THIS:

1. Create a variable inside a function and try to console.log it outside (see the error).

2. Use let inside an if block and try to access it after the if.

3. Replace a var with let in a loop and see if anything breaks outside the loop.

MINI CHALLENGE:

Write a function that declares a variable called counter inside it.
Try to use that counter outside the function.
Then fix it by moving the variable to the right scope or returning the value.
*/