/*
BEGINNER GOAL:
Learn how JavaScript handles numbers. Practice basic math operations, and learn useful Math methods for rounding, generating random numbers, and more.

REAL WORLD USE CASE:
Numbers are used constantly in real applications:
- Shopping cart totals and prices
- Age calculations
- Quantities in inventory
- Ratings (4.8 stars)
- Percentages and discounts
- Page numbers, scores, countdown timers

CONCEPTS COVERED:
- Creating number variables
- Basic math operators: +, -, *, /, %
- Order of operations
- Incrementing and decrementing
- The Math object and common methods
- parseInt and parseFloat for converting strings to numbers
*/

// ============================================
// STEP 1: Storing numbers in variables
// ============================================

let price = 19.99;
let quantity = 3;
let taxRate = 0.08;   // 8% tax

console.log("Price per item:", price);
console.log("Quantity:", quantity);

// ============================================
// STEP 2: Doing math with numbers
// ============================================

// JavaScript supports normal math using these symbols:
// + addition
// - subtraction
// * multiplication
// / division
// % modulo (remainder after division)

let subtotal = price * quantity;
// price is 19.99
// quantity is 3
// subtotal becomes 19.99 * 3 = 59.97
console.log("Subtotal:", subtotal);

let taxAmount = subtotal * taxRate;
console.log("Tax amount:", taxAmount);

let total = subtotal + taxAmount;
console.log("Total with tax:", total);

// ============================================
// STEP 3: Order of operations (PEMDAS)
// ============================================

// JavaScript follows the same order as math class:
// Parentheses, Exponents, Multiplication/Division, Addition/Subtraction

let result1 = 2 + 3 * 4;
// First 3 * 4 = 12, then 2 + 12 = 14
console.log(result1); // 14

let result2 = (2 + 3) * 4;
// Parentheses first: 2 + 3 = 5, then 5 * 4 = 20
console.log(result2); // 20

// ============================================
// STEP 4: Modulo operator %
// ============================================

// % gives you the remainder after division.
// Very useful to check if a number is even or odd.

let items = 17;
let itemsPerBox = 4;

let fullBoxes = Math.floor(items / itemsPerBox);
let leftoverItems = items % itemsPerBox;

console.log("Full boxes:", fullBoxes);       // 4
console.log("Items left over:", leftoverItems); // 1

// Check if a number is even:
let number = 24;
if (number % 2 === 0) {
  console.log(number + " is even");
}

// ============================================
// STEP 5: Changing numbers (increment / decrement)
// ============================================

let score = 100;

score = score + 10;   // Add 10 to the current score
console.log("New score:", score); // 110

// There is a shorter way to add 1:
let lives = 3;
lives = lives + 1;     // normal way
// lives += 1;         // shorter way (we'll see compound assignment soon)
lives++;               // shortest way to add exactly 1
console.log("Lives left:", lives);

// You can also subtract:
let health = 80;
health = health - 20;
health -= 10;          // even shorter: health = health - 10
console.log("Health:", health);

// ============================================
// STEP 6: Using the built-in Math object
// ============================================

// JavaScript gives us a Math object with many helpful tools.

// Math.round() rounds to the nearest whole number
console.log(Math.round(4.6));   // 5
console.log(Math.round(4.3));   // 4

// Math.floor() always rounds DOWN
console.log(Math.floor(4.9));   // 4

// Math.ceil() always rounds UP
console.log(Math.ceil(4.1));    // 5

// Math.max() and Math.min() find the biggest or smallest
console.log(Math.max(10, 3, 87, 45)); // 87
console.log(Math.min(10, 3, 87, 45)); // 3

// Math.random() gives a random decimal between 0 and 1 (not including 1)
let randomNumber = Math.random();
console.log("Random number between 0 and 1:", randomNumber);

// To get a random whole number between 1 and 10:
let random1to10 = Math.floor(Math.random() * 10) + 1;
console.log("Random number 1-10:", random1to10);

// ============================================
// STEP 7: Converting strings to numbers
// ============================================

// Sometimes you get numbers as text (especially from forms or APIs).
// You need to convert them to real numbers to do math.

let priceFromInput = "24.50";   // this is a string!

// parseFloat keeps decimals
let realPrice = parseFloat(priceFromInput);
console.log("As number:", realPrice);
console.log("Add 5:", realPrice + 5);

// parseInt gives you a whole number only
let wholeNumber = parseInt("42.99");
console.log("parseInt result:", wholeNumber); // 42

// If the string cannot be turned into a number, you get NaN (Not a Number)
let badConversion = parseFloat("hello");
console.log("Bad conversion:", badConversion); // NaN

/*
LINE-BY-LINE BREAKDOWN:

let subtotal = price * quantity;
- Takes the value inside price and multiplies it by the value inside quantity
- Stores the result in a new variable called subtotal
- The * symbol means multiplication

let taxAmount = subtotal * taxRate;
- Uses the result from the previous calculation as part of a new calculation
- This is very common: build results step by step

items % itemsPerBox
- The % operator (modulo) divides and gives only the remainder
- Extremely useful for checking even/odd or grouping items

lives++;
- This is the increment operator
- It adds exactly 1 to the variable and stores it back

Math.floor(Math.random() * 10) + 1
- Math.random() gives a decimal 0 to 0.999...
- Multiply by 10 → gives 0 to 9.999...
- Math.floor removes the decimal → gives 0 to 9
- Add 1 → gives 1 to 10

parseFloat(priceFromInput)
- parseFloat is a built-in function
- It takes a string as its argument
- It tries to read it as a number and returns the number (or NaN)

NOOB TRANSLATION:

Numbers in JavaScript are like counting with magic.
You can:
- Add, subtract, multiply, divide normally using +, -, *, /
- Ask "what's left over?" using %
- Ask for random numbers using Math.random()
- Force numbers to be whole using Math.floor() or Math.round()
- Turn text that looks like a number ("42") into an actual number you can calculate with using parseFloat or parseInt

COMMON MISTAKES:

1. Forgetting that "24.50" is a string, not a number
   - "24.50" + 5 gives "24.505" instead of 29.5

2. Using Math.random() and expecting a whole number
   - It always gives a decimal between 0 and 1

3. Confusing Math.floor (down) with Math.ceil (up)

4. Trying to do math with variables that contain strings by accident

5. Not realizing that 0.1 + 0.2 does not equal exactly 0.3 (floating point weirdness)

TRY CHANGING THIS:

1. Change the price and quantity, then watch how subtotal and total update.

2. Use Math.random() to simulate rolling a 6-sided die. Print the result.

3. Take the string "15.75" and use parseFloat to turn it into a number. Then calculate 20% of it.

MINI CHALLENGE:

You bought 7 items that cost $12.50 each.
- Calculate the subtotal
- Add 7% tax
- Round the final total to 2 decimal places (hint: use Math.round and divide by 100)
- Print: "Your total is $XX.XX"
*/