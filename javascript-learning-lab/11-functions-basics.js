/*
BEGINNER GOAL:
Learn what functions are and why they are one of the most important concepts in programming.
Functions let you package code so you can reuse it easily.

REAL WORLD USE CASE:
- A function to calculate the total price of a cart
- A function to format a user's full name
- A function to check if a password is strong enough
- A function to show or hide a loading spinner
- A function that gets called when a button is clicked

CONCEPTS COVERED:
- What a function is
- Declaring functions with the function keyword
- Calling (running) a function
- Code inside functions only runs when the function is called
- Why functions are better than repeating code
- Basic function structure
*/

// ============================================
// STEP 1: Why we need functions
// ============================================

// Without functions we would repeat the same code over and over.

let firstName = "Alex";
let lastName = "Rivera";

// Bad: repeating the same logic
let fullName1 = firstName + " " + lastName;
console.log("Welcome, " + fullName1 + "!");

let anotherFirst = "Sam";
let anotherLast = "Patel";
let fullName2 = anotherFirst + " " + anotherLast;
console.log("Welcome, " + fullName2 + "!");

// This gets very repetitive and hard to change later.

// ============================================
// STEP 2: Creating your first function
// ============================================

// A function is a reusable block of code.
// We define it once, then call it whenever we need it.

function greet() {
  // Everything inside these curly braces is the function body
  console.log("Hello there!");
  console.log("Welcome to the JavaScript Learning Lab.");
}

// Right now we have only DEFINED the function.
// Nothing has happened yet because we haven't called it.

// To run the function we write its name followed by parentheses:
greet();
// Output:
// Hello there!
// Welcome to the JavaScript Learning Lab.

// We can call it as many times as we want:
greet();
greet();

// ============================================
// STEP 3: A function that does something useful
// ============================================

function showCurrentDate() {
  let today = new Date();
  console.log("Today's date is: " + today.toDateString());
}

showCurrentDate();

// ============================================
// STEP 4: A function with a clear single purpose
// ============================================

// Good functions usually do ONE thing.

function printWelcomeBanner() {
  console.log("==============================");
  console.log("   JavaScript Learning Lab    ");
  console.log("==============================");
}

printWelcomeBanner();

// ============================================
// STEP 5: Functions help us avoid repetition
// ============================================

function printLine() {
  console.log("--------------------------------");
}

// Now we can reuse this simple pattern easily
printLine();
console.log("Section 1");
printLine();
console.log("Section 2");
printLine();

// ============================================
// STEP 6: Functions can contain any code
// ============================================

function checkAge() {
  let age = 22;

  if (age >= 18) {
    console.log("You are an adult.");
  } else {
    console.log("You are a minor.");
  }
}

checkAge();

// ============================================
// STEP 7: The difference between defining and calling
// ============================================

function sayHi() {
  console.log("Hi!");
}

// This does NOT run the code:
sayHi;   // ← just mentions the function, does nothing

// This actually runs it:
sayHi(); // ← the parentheses () mean "call this function now"

/*
LINE-BY-LINE BREAKDOWN:

function greet() {
- The keyword "function" tells JavaScript we are creating a function
- "greet" is the name we are giving to this function
- The parentheses () are where we will later put parameters (arguments)
- The curly braces {} contain all the code that belongs to this function

console.log("Hello there!");
- This line is inside the function
- It will only run when someone calls greet()

greet();
- This is a function call (also called "invoking" the function)
- The name greet followed by () tells JavaScript to find the function and run its code

function showCurrentDate() {
- We can name functions anything we want
- Good names describe what the function does

printWelcomeBanner();
- Calling a function is like telling a robot "do your job now"
- The robot only does the job when you give the command

NOOB TRANSLATION:

A function is like a recipe card.
- You write the recipe once (define the function)
- You can use the recipe any time you want (call the function)
- You don't have to rewrite all the steps every time you want to cook

Without functions you would have to copy and paste the same instructions everywhere.
With functions you keep the instructions in one place and just say "run this recipe".

COMMON MISTAKES:

1. Forgetting the parentheses when calling a function
   - greet    ← does nothing
   - greet()  ← runs the function

2. Trying to use a variable that was created inside a function from outside
   - Variables created inside functions are not visible outside (we'll learn scope later)

3. Defining a function but never calling it
   - The code inside will never run

4. Naming functions poorly (like doStuff or x)
   - Good names: calculateTotal, showErrorMessage, formatName

5. Putting too many different jobs inside one function

TRY CHANGING THIS:

1. Create a new function called sayGoodbye that prints two lines. Call it twice.

2. Make a function called printSeparator that prints 20 dashes. Use it between different sections of output.

3. Turn the age checking code into a reusable function called checkIfAdult that you can call.

MINI CHALLENGE:

Write a function called printUserProfile that does the following:
- Prints a header line
- Prints "Name: [some name]"
- Prints "Age: [some age]"
- Prints a footer line

Call the function once.
*/