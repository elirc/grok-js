/*
THINK-PREDICT STYLE — Socratic / Active Recall Version
This is a DIFFERENT learning approach from the classic 01-variables-and-values.js.

HOW TO USE THIS FILE:
1. For every "PREDICT" block, STOP.
2. Think hard about what the code will do.
3. Write your guess in a comment.
4. THEN uncomment or run the code (or mentally simulate).
5. Compare your prediction with reality.
6. Read the "WHY" section only after you committed to a guess.

This style forces your brain to retrieve and test understanding instead of just reading explanations.
*/

console.log("=== 01 VARIABLES - THINK & PREDICT ===\n");

/*
PREDICT BLOCK 1
----------------
let name = "Sam";
console.log(name);
name = "Alex";
console.log(name);

What will be printed?
Write your guess below BEFORE moving on:
*/

// YOUR GUESS 1:
// 
// 

// --- RUN / REVEAL ---
let name = "Sam";
console.log(name);
name = "Alex";
console.log(name);
// Actual: Sam then Alex on next line

/*
WHY IT BEHAVED THAT WAY:
- let creates a mutable binding
- First assignment puts "Sam" in
- Reassignment replaces the value in the same "box"
- console.log shows the current value at the moment it runs

If your guess was wrong, which assumption did you hold?
*/

/*
PREDICT BLOCK 2
----------------
const age = 25;
// age = 26;   // <-- what happens if you uncomment this?

What is the result of trying to reassign a const?
*/

// YOUR GUESS 2:
// 
// 

// --- REVEAL (uncomment in your mind or editor) ---
/*
const age = 25;
age = 26;   // TypeError: Assignment to constant variable.
*/

/*
WHY:
const means the binding cannot be reassigned (the arrow on the box is glued).
Note: for objects, the contents can still be mutated unless you also freeze.
*/

/*
PREDICT BLOCK 3 — Reference gotcha
----------------------------------
let cart = { total: 10 };
let sameCart = cart;
sameCart.total = 99;

console.log(cart.total);

What prints for cart.total?
*/

// YOUR GUESS 3:
// 
// 

let cart = { total: 10 };
let sameCart = cart;
sameCart.total = 99;
console.log("cart.total after mutation via alias:", cart.total);
// Actual: 99

/*
WHY (very important):
- Objects are stored by reference
- sameCart and cart point to the *same object* in memory
- Changing via one name affects everyone holding the reference
- This is the source of many "wtf" bugs in real apps

Prediction success rate on this one is usually low for beginners. If you got it wrong you are normal.
*/

/*
PREDICT BLOCK 4 — Primitive vs reference copy
---------------------------------------------
let x = 5;
let y = x;
y = 42;
console.log(x);

let obj1 = { val: 5 };
let obj2 = obj1;
obj2.val = 42;
console.log(obj1.val);
*/

// YOUR GUESS 4:
// x will be ___   obj1.val will be ___

let x = 5;
let y = x;
y = 42;
console.log("primitive x after y change:", x);

let obj1 = { val: 5 };
let obj2 = obj1;
obj2.val = 42;
console.log("object obj1.val after obj2 change:", obj1.val);

/*
EXPLANATION:
Primitives (number, string, boolean, etc) are copied by value.
Objects (and arrays, functions) are copied by reference (the pointer is copied).

This single mental model explains 30% of confusing JS behavior later.
*/

/*
PREDICT BLOCK 5 — Temporal dead zone
------------------------------------
console.log(usingLet);   // what happens?
let usingLet = 10;
*/

// YOUR GUESS 5:
// 

/*
let usingLet = 10;
console.log(usingLet);
*/

/*
ANSWER: ReferenceError: Cannot access 'usingLet' before initialization

WHY:
let and const are block-scoped and have a "temporal dead zone" from the start of the block until the declaration line.
Unlike var (which gets hoisted as undefined), let/const throw if used too early.
*/

/*
QUICK SELF-QUIZ (try to answer without looking back)
----------------------------------------------------
Q1. Difference between let and const?
Q2. What happens when two variables reference the same object and you mutate it?
Q3. Why does this throw: console.log(z); let z = 3;
Q4. Name two primitive types.

Write your answers, then check against the file.
*/

/*
REFLECT
-------
Which prediction surprised you the most?
Write one sentence about what you will remember because you guessed wrong first.
*/

console.log("\n=== End of Think-Predict Variables ===");