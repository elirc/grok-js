/*
BEGINNER GOAL:
Learn template literals — the modern way to create strings that contain variables and expressions.
They use backticks (`) instead of quotes.

REAL WORLD USE CASE:
- Creating messages with user data ("Welcome back, Alex!")
- Building URLs dynamically
- Creating HTML strings for the DOM
- Logging helpful debug messages with variables
- Any time you need to mix text and data

CONCEPTS COVERED:
- Backtick syntax `
- ${} placeholder syntax
- Embedding variables
- Embedding expressions (math, function calls)
- Multi-line strings
- Comparison to old string concatenation
*/

// ============================================
// STEP 1: Old way vs new way
// ============================================

let name = "Alex";
let age = 28;

// Old way (string concatenation with +)
let oldGreeting = "Hello, " + name + "! You are " + age + " years old.";
console.log(oldGreeting);

// New way (template literal)
let newGreeting = `Hello, ${name}! You are ${age} years old.`;
console.log(newGreeting);

// ============================================
// STEP 2: Using expressions inside ${}
// ============================================

let price = 29.99;
let quantity = 3;

let message = `Total cost: $${price * quantity}`;
console.log(message);
// Output: Total cost: $89.97

// You can put any expression inside ${}
let status = `You are ${age >= 18 ? "an adult" : "a minor"}.`;
console.log(status);

// ============================================
// STEP 3: Multi-line strings (very useful)
// ============================================

let bio = `Name: ${name}
Age: ${age}
Location: New York`;

console.log(bio);

// ============================================
// STEP 4: Calling functions inside template literals
// ============================================

function getFullName(first, last) {
  return `${first} ${last}`;
}

let user = "Taylor";
let last = "Kim";

let welcome = `Welcome, ${getFullName(user, last)}!`;
console.log(welcome);

// ============================================
// STEP 5: Practical examples
// ============================================

let product = {
  name: "Wireless Mouse",
  price: 24.99
};

let productCard = `
Product: ${product.name}
Price: $${product.price}
`;

console.log(productCard);

let itemsInCart = 4;
let cartMessage = `You have ${itemsInCart} item${itemsInCart === 1 ? "" : "s"} in your cart.`;
console.log(cartMessage);

// ============================================
// STEP 6: Nesting template literals (rare but possible)
// ============================================

let outer = `This is ${`nested ${"deeply"}`}`;
console.log(outer);

/*
LINE-BY-LINE BREAKDOWN:

let newGreeting = `Hello, ${name}! ...`;
- Backticks (`) create a template literal instead of a normal string
- ${name} is a placeholder
- JavaScript will insert the value of the name variable here

`Total cost: $${price * quantity}`
- You can put any JavaScript expression between ${ and }
- Here we are doing math inside the string

`You are ${age >= 18 ? "an adult" : "a minor"}.`
- The ternary expression runs and its result is inserted

`Name: ${name}
Age: ${age}`
- Because we used backticks, the line breaks are preserved
- This is much cleaner than using \n everywhere

${getFullName(user, last)}
- You can call functions inside the ${} and use their return value

NOOB TRANSLATION:

Template literals are like mad-libs for code.
You write the sentence with holes (${}) and JavaScript fills in the holes with real values.

Instead of gluing strings together with + signs (which is messy), you write the sentence naturally and put variables where they belong.

COMMON MISTAKES:

1. Using regular quotes instead of backticks
   - "Hello ${name}" ← does not work, it stays as literal text
   - `Hello ${name}` ← correct

2. Forgetting the $ sign before the curly braces
   - {name} does nothing
   - ${name} works

3. Trying to use template literals with single or double quotes

4. Overcomplicating expressions inside ${} — sometimes it's cleaner to calculate first

TRY CHANGING THIS:

1. Create variables for your city and favorite food. Use a template literal to make a sentence about yourself.

2. Use a template literal to print "The total for 5 items at $12 each is $60" using variables and math inside ${}.

3. Make a multi-line template literal that looks like a small receipt with item names and prices.

MINI CHALLENGE:

Create a function called createProfileCard that takes name, age, and city.
It should return a nicely formatted multi-line string using a template literal.

Example output:
Name: Alex
Age: 28
City: New York
*/