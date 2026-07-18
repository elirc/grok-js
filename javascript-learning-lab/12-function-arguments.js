/*
BEGINNER GOAL:
Learn how to give functions information using arguments (also called parameters).
Arguments let functions work with different values each time they are called.

REAL WORLD USE CASE:
- A greet function that can greet any user by name
- A calculateTotal function that works for any cart
- A formatPrice function that formats any dollar amount
- A showError function that can show different error messages
- A filterProducts function that can filter by any category

CONCEPTS COVERED:
- Parameters (the names inside the parentheses when defining)
- Arguments (the actual values you pass when calling)
- How functions receive values through parameters
- Using multiple parameters
- Default values (basic)
- The difference between parameters and regular variables
*/

// ============================================
// STEP 1: A function without arguments (limited)
// ============================================

function sayHello() {
  console.log("Hello, friend!");
}

// This always says the same thing. Not very useful.
sayHello();

// ============================================
// STEP 2: Adding a parameter
// ============================================

// A parameter is a variable name you put inside the () when defining the function.
// It acts like a placeholder for a value that will be given later.

function greetUser(name) {
  // "name" is a parameter
  // When we call this function, whatever we put in the parentheses will become the value of "name"
  console.log("Hello, " + name + "!");
}

// Now when we call greetUser, we give it a value (this value is called an argument)
greetUser("Alex");
// Inside the function, name becomes "Alex"
// Output: Hello, Alex!

greetUser("Sam");
// Now name becomes "Sam"
// Output: Hello, Sam!

greetUser("Jordan");

// ============================================
// STEP 3: Using the parameter inside the function
// ============================================

function printFullName(firstName, lastName) {
  // This function has TWO parameters
  let full = firstName + " " + lastName;
  console.log("Full name: " + full);
}

printFullName("Maria", "Lopez");
// firstName gets "Maria"
// lastName gets "Lopez"
// Output: Full name: Maria Lopez

printFullName("Chris", "Nguyen");

// ============================================
// STEP 4: A practical example - price calculator
// ============================================

function calculateTotal(price, quantity) {
  // price and quantity are parameters
  let subtotal = price * quantity;
  let tax = subtotal * 0.08; // 8% tax
  let total = subtotal + tax;

  console.log("Subtotal: $" + subtotal);
  console.log("Tax: $" + tax);
  console.log("Total: $" + total);
}

calculateTotal(19.99, 3);
// price = 19.99, quantity = 3
// This calculates for 3 items at $19.99 each

calculateTotal(5.50, 10);
// Same function, completely different numbers

// ============================================
// STEP 5: Order of parameters matters
// ============================================

function describePet(name, animal, age) {
  console.log(name + " is a " + age + " year old " + animal + ".");
}

describePet("Luna", "cat", 3);
// Correct order: name, animal, age

// If you mix up the order, the result will be wrong:
describePet("cat", "Luna", 3);
// This would print: cat is a 3 year old Luna.

// ============================================
// STEP 6: Parameters are like local variables
// ============================================

function addFive(number) {
  // "number" only exists inside this function
  let result = number + 5;
  console.log(number + " plus 5 is " + result);
}

addFive(10);
// The variable "number" only lives during this call

// ============================================
// STEP 7: Using default parameter values (ES6)
// ============================================

// You can give a parameter a default value if nothing is passed

function greetWithDefault(name = "friend") {
  console.log("Hello, " + name + "!");
}

greetWithDefault("Alex");  // Uses the value we gave
greetWithDefault();        // Uses the default "friend"

/*
LINE-BY-LINE BREAKDOWN:

function greetUser(name) {
- "name" inside the parentheses is called a PARAMETER
- It is a variable that only exists while the function is running
- We decide what name we want to use for this incoming value

greetUser("Alex");
- "Alex" is the ARGUMENT
- The argument is the actual value we are sending to the function
- "Alex" gets copied into the parameter "name" for this call

function printFullName(firstName, lastName) {
- We can have as many parameters as we want, separated by commas
- Each parameter will receive one argument in order

let subtotal = price * quantity;
- Inside the function we can use the parameters just like normal variables
- They already contain the values that were passed in

calculateTotal(19.99, 3);
- The first value (19.99) goes to the first parameter (price)
- The second value (3) goes to the second parameter (quantity)

name = "friend"
- This is a default parameter value
- If no argument is provided for name, it will be "friend" instead of undefined

NOOB TRANSLATION:

Think of a function like a vending machine.
- The parameters are the slots where you put coins or select options
- When you call the function, you are putting specific values into those slots
- The machine uses whatever you put in to produce a result

Parameters are like labeled mailboxes:
function sendLetter(recipient, message) { ... }

When you call:
sendLetter("Mom", "I love you");

- The first mailbox (recipient) gets "Mom"
- The second mailbox (message) gets "I love you"

COMMON MISTAKES:

1. Mixing up the order of arguments
   - The function receives values in the order you pass them

2. Forgetting to pass arguments when the function needs them
   - The parameter will be undefined

3. Naming parameters poorly
   - Bad: function doThing(x, y)
   - Good: function calculateArea(width, height)

4. Trying to use a parameter outside of the function
   - Parameters only exist inside the function

5. Passing too many or too few arguments
   - Extra arguments are usually ignored
   - Missing arguments become undefined

TRY CHANGING THIS:

1. Create a function called multiply that takes two parameters and prints their product.

2. Write a function called introduce that takes name and job title as parameters.

3. Add a third parameter to calculateTotal called taxRate and use it instead of the hard-coded 0.08.

MINI CHALLENGE:

Create a function called formatProduct that takes three parameters:
- productName (string)
- price (number)
- quantity (number)

It should print:
"2 x Wireless Mouse @ $24.99 each = $49.98"

Call it with different products.
*/