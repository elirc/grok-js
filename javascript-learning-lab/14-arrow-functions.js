/*
BEGINNER GOAL:
Learn the shorter, modern way to write functions using arrow syntax (=>).
Arrow functions are used everywhere in modern JavaScript, especially with arrays.

REAL WORLD USE CASE:
- Used heavily with .map(), .filter(), .reduce()
- Short functions for event handlers
- Quick calculations
- Any time you need a simple function

CONCEPTS COVERED:
- Arrow function syntax
- Implicit return (no need for return keyword in some cases)
- Differences from regular functions
- When to use each style
- Arrow functions with array methods
*/

// ============================================
// STEP 1: Regular function vs arrow function
// ============================================

// Traditional function
function addTraditional(a, b) {
  return a + b;
}

// Arrow function version (shorter)
const addArrow = (a, b) => {
  return a + b;
};

console.log(addTraditional(3, 4));
console.log(addArrow(3, 4));

// ============================================
// STEP 2: Implicit return (one-line arrow functions)
// ============================================

// If the function is very simple and just returns one expression,
// you can omit the curly braces {} and the return keyword.

const multiply = (x, y) => x * y;
// No curly braces, no "return" — it automatically returns x * y

console.log(multiply(6, 7)); // 42

const square = n => n * n;
// When there is only ONE parameter, you can even omit the parentheses

console.log(square(5)); // 25

// ============================================
// STEP 3: Arrow functions with no parameters
// ============================================

const sayHello = () => "Hello!";
console.log(sayHello());

// ============================================
// STEP 4: Arrow functions with array methods (very common)
// ============================================

let numbers = [1, 2, 3, 4, 5];

// Using arrow functions makes map, filter, reduce much cleaner

let doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);

let evens = numbers.filter(n => n % 2 === 0);
console.log("Even numbers:", evens);

let total = numbers.reduce((sum, n) => sum + n, 0);
console.log("Total:", total);

// ============================================
// STEP 5: Arrow functions with objects
// ============================================

let users = [
  { name: "Alex", age: 25 },
  { name: "Sam", age: 31 },
  { name: "Taylor", age: 19 }
];

// Get just the names
let names = users.map(user => user.name);
console.log("Names:", names);

// Filter adults
let adults = users.filter(user => user.age >= 21);
console.log("Adults:", adults);

// ============================================
// STEP 6: Multi-line arrow functions still need {}
// ============================================

const calculateArea = (width, height) => {
  // When we have multiple lines, we need curly braces
  let area = width * height;
  return area;
};

console.log(calculateArea(5, 8));

// ============================================
// STEP 7: A realistic example
// ============================================

let products = [
  { name: "Laptop", price: 999 },
  { name: "Mouse", price: 29 },
  { name: "Keyboard", price: 79 }
];

// Get all product names in uppercase
let upperNames = products
  .map(product => product.name.toUpperCase());

console.log("Uppercase names:", upperNames);

// Get only products cheaper than 100
let cheap = products.filter(product => product.price < 100);
console.log("Cheap products:", cheap);

/*
LINE-BY-LINE BREAKDOWN:

const addArrow = (a, b) => {
- const is used to store the function in a variable
- (a, b) are the parameters
- The arrow => points to the function body

const multiply = (x, y) => x * y;
- When there are no curly braces, whatever comes after => is automatically returned
- This is called "implicit return"

const square = n => n * n;
- With a single parameter you can omit the parentheses around the parameter
- This is just a shorter syntax

numbers.map(n => n * 2)
- We pass an arrow function directly as the argument to map
- For each number n, we return n * 2
- This is the most common use of arrow functions

users.filter(user => user.age >= 21)
- The arrow function receives each user
- It returns true or false
- filter keeps the ones that return true

NOOB TRANSLATION:

Arrow functions are just a shorter way to write functions.
Regular function:
function double(x) { return x * 2; }

Arrow version:
const double = x => x * 2;

They are especially useful when passing small functions into other functions like map and filter.

COMMON MISTAKES:

1. Forgetting that implicit return only works without curly braces
   - const fn = () => { x * 2 }  ← returns undefined!
   - const fn = () => x * 2      ← correct implicit return

2. Confusing this behavior (arrow functions handle "this" differently)
   - For beginners this rarely matters until you do classes or event handlers

3. Using arrow functions for everything even when a regular function is clearer

4. Trying to implicitly return an object without wrapping it in parentheses
   - () => { name: "Alex" }     ← wrong (looks like a block)
   - () => ({ name: "Alex" })   ← correct

TRY CHANGING THIS:

1. Rewrite a regular function that adds two numbers as an arrow function with implicit return.

2. Use .map() with an arrow function to turn an array of strings into all lowercase versions.

3. Use .filter() with an arrow function to keep only numbers greater than 10 from an array.

MINI CHALLENGE:

You have:
let todos = [
  { text: "Buy milk", done: false },
  { text: "Study JS", done: true },
  { text: "Walk dog", done: false }
];

Use arrow functions with:
- filter to get only unfinished todos
- map to get only the text of unfinished todos

Print the result.
*/