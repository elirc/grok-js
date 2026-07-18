/*
BEGINNER GOAL:
Learn the best ways to go through every item in an array.
This is one of the most common tasks in JavaScript.

REAL WORLD USE CASE:
- Showing every product in a product list
- Rendering every message in a chat
- Calculating totals from every item in a cart
- Checking every user to see if they have permission
- Updating every todo item

CONCEPTS COVERED:
- Classic for loop over arrays
- for...of loop (modern and clean)
- .forEach() method
- When to use each approach
- Accessing index while looping
*/

// ============================================
// STEP 1: Classic for loop (you already know this)
// ============================================

let fruits = ["apple", "banana", "cherry"];

for (let i = 0; i < fruits.length; i++) {
  console.log("Fruit #" + (i + 1) + ":", fruits[i]);
}

// ============================================
// STEP 2: for...of loop (cleaner for arrays)
// ============================================

// for...of lets you directly get each item without managing an index.

for (let fruit of fruits) {
  console.log("I like", fruit);
}

// This is often easier to read than the classic for loop.

// ============================================
// STEP 3: Getting the index with for...of + entries()
// ============================================

for (let [index, fruit] of fruits.entries()) {
  console.log("Index " + index + ":", fruit);
}

// ============================================
// STEP 4: .forEach() method
// ============================================

// forEach is a method that takes a function and runs it for every item.

fruits.forEach(function(fruit) {
  console.log("forEach fruit:", fruit);
});

// Using arrow function (very common)
fruits.forEach(fruit => {
  console.log("Arrow forEach:", fruit);
});

// ============================================
// STEP 5: forEach with index
// ============================================

fruits.forEach((fruit, index) => {
  console.log("Position " + index + ":", fruit);
});

// ============================================
// STEP 6: Real world - looping through objects in an array
// ============================================

let students = [
  { name: "Alex", grade: 92 },
  { name: "Sam", grade: 78 },
  { name: "Jordan", grade: 85 }
];

// Print each student's name and grade
students.forEach(student => {
  console.log(student.name + " scored " + student.grade);
});

// Calculate average grade using a loop
let total = 0;

for (let student of students) {
  total = total + student.grade;
}

let average = total / students.length;
console.log("Average grade:", average);

// ============================================
// STEP 7: Using a loop to build a new array
// ============================================

let prices = [10, 20, 30];
let doubledPrices = [];

for (let price of prices) {
  doubledPrices.push(price * 2);
}

console.log("Doubled prices:", doubledPrices);

// Note: In real code we would usually use .map() for this
// But understanding the loop version helps you understand what map does

// ============================================
// STEP 8: When to use which looping method
// ============================================

// - Classic for loop: when you need full control (break, continue, custom steps)
// - for...of: cleanest when you just need the items
// - forEach: great when you want to do something with each item (no return value expected)
// - map/filter/reduce: when you want to create new arrays or values

/*
LINE-BY-LINE BREAKDOWN:

for (let i = 0; i < fruits.length; i++)
- The classic pattern
- i is the index
- fruits[i] gets the actual item

for (let fruit of fruits)
- "fruit" will be each item in order
- No index variable unless you use .entries()

for (let [index, fruit] of fruits.entries())
- fruits.entries() gives you pairs of [index, value]
- This is destructuring (we'll cover later)

fruits.forEach(function(fruit) { ... })
- forEach takes a function as an argument
- That function is called once for every element
- The current element is passed as the first argument

students.forEach(student => {
- Arrow function version of the same idea
- Very common in real code

NOOB TRANSLATION:

Looping through an array means:
"Go through this list one by one and do something with each thing."

Different ways to say it:
- "For every box in this row, look inside" (classic for)
- "Take each thing from the list one by one" (for...of)
- "For each item, run this little function" (forEach)

COMMON MISTAKES:

1. Using for...of when you need the index (use .entries() or classic for)

2. Trying to return from forEach expecting it to create a new array
   - forEach always returns undefined

3. Modifying the array while looping with forEach or for...of can be tricky

4. Off-by-one errors with classic index loops

TRY CHANGING THIS:

1. Use for...of to loop through an array of 5 numbers and print each one doubled.

2. Use forEach on an array of names to print "Hello, [name]" for each.

3. Create an array of objects with price. Use a loop to calculate the sum of all prices.

MINI CHALLENGE:

You have:
let books = [
  { title: "JS Basics", pages: 150 },
  { title: "Advanced JS", pages: 420 },
  { title: "You Don't Know JS", pages: 250 }
];

Use a for...of loop to:
- Print every book title
- Find and print the book with the most pages
*/