/*
BEGINNER GOAL:
Learn the spread operator (...).
It lets you expand arrays and objects into individual elements or copy them easily.

REAL WORLD USE CASE:
- Copying arrays without mutating the original
- Combining multiple arrays
- Adding items to arrays without push
- Copying and updating objects
- Passing array items as separate arguments to functions

CONCEPTS COVERED:
- Spread in arrays
- Spread in objects
- Creating copies
- Merging arrays and objects
- Common patterns used in real apps
*/

// ============================================
// STEP 1: Spreading an array
// ============================================

let numbers = [1, 2, 3];

// Spread the array into individual values
console.log(...numbers); // 1 2 3

// ============================================
// STEP 2: Copying an array (very important)
// ============================================

let original = ["a", "b", "c"];

// This does NOT copy — both variables point to the same array
let badCopy = original;

// This creates a real copy using spread
let goodCopy = [...original];

goodCopy.push("d");

console.log("Original:", original); // ["a", "b", "c"]
console.log("Good copy:", goodCopy); // ["a", "b", "c", "d"]

// ============================================
// STEP 3: Adding items while copying
// ============================================

let fruits = ["apple", "banana"];

let moreFruits = [...fruits, "orange", "grape"];
console.log(moreFruits);

// ============================================
// STEP 4: Combining arrays
// ============================================

let arr1 = [1, 2];
let arr2 = [3, 4];

let combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4]

// ============================================
// STEP 5: Spreading into function arguments
// ============================================

function sum(a, b, c) {
  return a + b + c;
}

let values = [10, 20, 30];

let total = sum(...values);
console.log("Sum:", total); // 60

// ============================================
// STEP 6: Spreading objects (copy + merge)
// ============================================

let user = {
  name: "Alex",
  age: 28
};

// Copy the object
let userCopy = { ...user };
console.log(userCopy);

// Add or override properties while copying
let updatedUser = {
  ...user,
  age: 29,
  city: "Seattle"
};

console.log(updatedUser);

// ============================================
// STEP 7: Merging objects
// ============================================

let defaults = { theme: "light", notifications: true };
let overrides = { theme: "dark" };

let finalSettings = { ...defaults, ...overrides };
console.log(finalSettings); // { theme: "dark", notifications: true }

/*
LINE-BY-LINE BREAKDOWN:

let goodCopy = [...original];
- The ... (three dots) "spreads" the contents of original
- We put those values into a brand new array literal []
- This creates a shallow copy

[...fruits, "orange", "grape"]
- We spread the existing items, then add more
- This is a very common pattern

[...arr1, ...arr2]
- Spread both arrays into one new array
- Order is preserved

sum(...values)
- Spreads the array so each element becomes a separate argument
- Equivalent to sum(10, 20, 30)

let updatedUser = { ...user, age: 29, city: "Seattle" };
- First we copy all properties from user
- Then we add/override specific ones

{ ...defaults, ...overrides }
- Later spreads can override earlier ones

NOOB TRANSLATION:

The spread operator (...) is like dumping everything out of one container into another.

When you do [...oldArray], you're saying:
"Take every item from oldArray and put them into this new box."

Same idea for objects.

It's the safe, modern way to copy or combine data without mutating the original.

COMMON MISTAKES:

1. Forgetting that spread only does a shallow copy
   - Nested objects/arrays are still shared

2. Using spread on something that is not iterable (like a number or object in wrong context)

3. Expecting deep copies of nested data

4. Confusing spread (...) with rest parameters (also uses ... but in function parameters)

TRY CHANGING THIS:

1. Take an array of 3 numbers and use spread to create a new array with an extra number at the beginning and end.

2. Copy an object and change one of its properties using spread.

3. Combine two arrays of strings into one using spread.

MINI CHALLENGE:

You have two objects:
let profile = { name: "Alex", age: 25 };
let updates = { age: 26, city: "Austin" };

Use spread to create a new object that has all info from both, with updates winning.

Also create a new array that contains all hobbies from two different hobby arrays using spread.
*/