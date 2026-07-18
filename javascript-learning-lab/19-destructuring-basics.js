/*
BEGINNER GOAL:
Learn destructuring — a clean way to pull values out of arrays and objects into variables.

REAL WORLD USE CASE:
- Getting specific fields from API data
- Pulling values from function parameters
- Quickly grabbing what you need from complex objects
- Making code shorter and more readable when working with data

CONCEPTS COVERED:
- Array destructuring
- Object destructuring
- Default values
- Renaming variables during destructuring
- Nested destructuring (basic)
*/

// ============================================
// STEP 1: Array destructuring
// ============================================

let colors = ["red", "green", "blue"];

// Old way
let first = colors[0];
let second = colors[1];

// New way (destructuring)
let [primary, secondary] = colors;

console.log(primary);   // "red"
console.log(secondary); // "green"

// You can skip values with commas
let [firstColor, , thirdColor] = colors;
console.log(thirdColor); // "blue"

// ============================================
// STEP 2: Object destructuring
// ============================================

let user = {
  name: "Alex",
  age: 28,
  city: "Portland"
};

// Old way
let userName = user.name;
let userAge = user.age;

// New way
let { name, age } = user;

console.log(name); // "Alex"
console.log(age);  // 28

// ============================================
// STEP 3: Renaming while destructuring
// ============================================

let product = {
  id: 42,
  name: "Keyboard",
  price: 79
};

// Rename "name" to "productName" while pulling it out
let { name: productName, price } = product;

console.log(productName); // "Keyboard"
console.log(price);

// ============================================
// STEP 4: Default values
// ============================================

let settings = {
  theme: "dark"
  // no language property
};

let { theme, language = "en" } = settings;

console.log(theme);    // "dark"
console.log(language); // "en" (default used)

// ============================================
// STEP 5: Destructuring in function parameters
// ============================================

function printUser({ name, age }) {
  // The parameter is destructured immediately
  console.log(`${name} is ${age} years old.`);
}

let person = { name: "Sam", age: 31, city: "Seattle" };
printUser(person);

// ============================================
// STEP 6: Nested destructuring (basic)
// ============================================

let order = {
  id: "ORD-123",
  customer: {
    name: "Jordan",
    email: "jordan@email.com"
  }
};

let { customer: { name: customerName, email } } = order;

console.log(customerName);
console.log(email);

// ============================================
// STEP 7: Practical array destructuring
// ============================================

let scores = [95, 87, 92];

let [highest, , lowest] = scores;

console.log("Highest:", highest);
console.log("Lowest in this selection:", lowest);

/*
LINE-BY-LINE BREAKDOWN:

let [primary, secondary] = colors;
- The square brackets on the left side mean "destructure this array"
- primary gets the first value
- secondary gets the second value
- This is equivalent to two separate assignments

let { name, age } = user;
- The curly braces on the left mean "pull these properties out of the object"
- It looks for properties named "name" and "age" in the user object
- Creates variables with those exact names

let { name: productName } = product;
- We take the "name" property but store it in a variable called productName
- The colon lets us rename during destructuring

let { theme, language = "en" } = settings;
- If "language" doesn't exist on the object, we give it the default value "en"

function printUser({ name, age })
- When the function is called, the object passed in is immediately destructured
- Inside the function we can use name and age directly

NOOB TRANSLATION:

Destructuring is like unpacking a suitcase.
Instead of reaching into the suitcase every time (user.name, user.age),
you unpack the things you need once into their own boxes (variables).

Array destructuring = unpacking a row of items by position.
Object destructuring = unpacking labeled boxes by their labels.

COMMON MISTAKES:

1. Using the wrong brackets
   - [] for objects or {} for arrays

2. Trying to destructure a property that doesn't exist without a default
   - You get undefined

3. Forgetting that the names must match the object keys (unless you rename)

4. Destructuring undefined or null (causes error)

TRY CHANGING THIS:

1. Destructure an array of 4 numbers into variables called a, b, and d (skip the third).

2. Destructure an object with title and author into variables with those names.

3. Write a function that takes an object with firstName and lastName and logs the full name using destructuring in the parameter.

MINI CHALLENGE:

You have:
let book = {
  title: "JavaScript Basics",
  author: { first: "Alex", last: "Rivera" },
  year: 2024
};

Use destructuring to create variables:
- title
- authorFirst
- authorLast

Print them in a sentence.
*/