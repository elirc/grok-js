/*
BEGINNER GOAL:
Learn what variables are, why we use them, and how to create and change values in JavaScript.
This is the absolute first building block of every program.

REAL WORLD USE CASE:
Every single web app stores information using variables.
- A login form stores the username in a variable
- A shopping cart stores the number of items in a variable
- A weather app stores the current temperature in a variable
- Your bank balance, your profile name, the number of unread messages — all variables

CONCEPTS COVERED:
- What a variable is
- Declaring variables with let and const
- Assigning values (strings, numbers, booleans)
- Reading / using the value of a variable
- Reassigning values (changing them later)
- Why we use variables instead of hardcoding values everywhere
*/

// ============================================
// STEP 1: Creating your first variables
// ============================================

// The keyword "let" creates a variable that can be changed later.
// "let" is like saying "I'm making a box that I can put different things in later."
let userName;

// We use the equals sign = to put a value into the variable.
// This is called "assignment".
// Here we are storing the string "Alex" inside the variable userName.
userName = "Alex";

// Now when we use userName, JavaScript will give us back the value "Alex".
// This line below just shows the value in the console so we can see it.
console.log(userName);
// The line above prints: Alex

// We can also create a variable and give it a value in one line.
// This is the most common way you'll see it.
let userAge = 22;
// userAge is now a variable that holds the number 22

let isLoggedIn = true;
// isLoggedIn is a variable that holds the boolean value true
// true means "yes" or "the user is logged in"

// ============================================
// STEP 2: Using variables in real code
// ============================================

// Variables let us write code that is easy to read and change.
// Instead of writing "Alex" in 10 different places, we store it once.

// Here we are using the variables inside a sentence (a string).
// We combine text with variables using the + symbol.
let welcomeMessage = "Hello, " + userName + "! You are " + userAge + " years old.";
console.log(welcomeMessage);
// Output: Hello, Alex! You are 22 years old.

// If the user changes their age, we only have to update one place.
userAge = 23;
// We changed the value inside the userAge variable from 22 to 23
console.log("Updated age:", userAge);
// Output: Updated age: 23

// ============================================
// STEP 3: const - variables that cannot be changed
// ============================================

// "const" is used when you want the value to stay the same forever.
// Think of it as a "constant" — it cannot be reassigned.
const birthYear = 2002;
// birthYear will always be 2002 in this program. You cannot do birthYear = 2003;

// If you try to reassign a const, JavaScript will give you an error.
// birthYear = 2003;  // This would cause an error!

// Use const for things that should never change:
// - API URLs
// - Configuration values
// - Math constants (like pi)
// - IDs that identify something

const appName = "JavaScript Learning Lab";
console.log(appName);
// Output: JavaScript Learning Lab

// ============================================
// STEP 4: Why variables matter
// ============================================

// Without variables we would have to repeat values everywhere.
// That makes code hard to update and easy to make mistakes.

// Bad way (repeating the same value):
console.log("Welcome back, Alex");
console.log("Alex has 5 items in cart");
console.log("Profile for Alex");

// Good way (using variables):
let currentUser = "Alex";
let cartCount = 5;

console.log("Welcome back, " + currentUser);
console.log(currentUser + " has " + cartCount + " items in cart");
console.log("Profile for " + currentUser);

// If we want to change the user, we only edit currentUser once.
// The rest of the code automatically uses the new name.

// ============================================
// STEP 5: Different types of values we can store
// ============================================

let favoriteColor = "blue";        // string (text)
let numberOfFriends = 12;          // number
let hasPremiumAccount = false;     // boolean (true or false)
let nothingHereYet = null;         // null means "intentionally empty"
let notDefinedYet;                 // undefined means "has not been given a value yet"

console.log("Color:", favoriteColor);
console.log("Friends:", numberOfFriends);
console.log("Has Premium:", hasPremiumAccount);
console.log("Nothing here:", nothingHereYet);
console.log("Not defined:", notDefinedYet);

/*
LINE-BY-LINE BREAKDOWN:

let userName;
- Creates a variable named userName using let
- At this moment it has no value (it is undefined)

userName = "Alex";
- Uses the assignment operator =
- Puts the string value "Alex" into the userName variable
- From now on, using userName will give us "Alex"

let userAge = 22;
- Creates the variable AND assigns the value 22 in one line
- This is called "initialization"

let welcomeMessage = "Hello, " + userName + "! ...";
- Creates a new string by joining (concatenating) text and variables
- The + operator combines strings and variable values

userAge = 23;
- Reassigns a new value to an existing let variable
- The old value 22 is thrown away and replaced with 23

const birthYear = 2002;
- Creates a variable that can never be reassigned
- The value is locked in for the entire program

console.log(...);
- A built-in function that prints whatever you put inside the parentheses to the console
- Extremely useful for seeing what your variables contain while learning

NOOB TRANSLATION:

Imagine variables as labeled boxes in your kitchen.
- You can write a name on the box (userName)
- You can put something inside the box ("Alex")
- Later you can take that thing out and look at it
- You can even replace what's inside the box with something else (if you used let)
- If you use tape and write "const" on the box, you promise never to put anything else inside

Variables let your program remember information so it can use it later.

COMMON MISTAKES:

1. Forgetting to declare the variable (writing userName = "Alex" without let or const first)
   - In modern JavaScript this can cause problems or create global variables accidentally

2. Trying to change a const variable later
   - const birthYear = 2002; then birthYear = 2003; → Error

3. Spelling the variable name wrong when using it
   - userName vs username (JavaScript is case-sensitive)

4. Using a variable before giving it a value and being surprised it says "undefined"

5. Using var instead of let/const (old way, avoid it for now)

TRY CHANGING THIS:

1. Change the value assigned to userName from "Alex" to your own name. Then re-run and see how the welcome message updates.

2. Add 5 to userAge using userAge = userAge + 5; and see what the new value becomes.

3. Create a new variable called favoriteFood and give it a string value. Then use console.log to print a sentence that includes it.

MINI CHALLENGE:

Create three variables:
- One called petName that stores a pet's name
- One called petAge that stores how old the pet is
- One called isAdopted that stores true or false

Then print one sentence that uses all three variables.
Example output: "My pet Luna is 3 years old. Adopted: true"
*/