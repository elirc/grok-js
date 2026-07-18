/*
BEGINNER GOAL:
Learn how to make decisions in code using if, else if, and else.
This lets your program do different things depending on different conditions.

REAL WORLD USE CASE:
Conditionals are the "brain" of apps:
- Show "Log in" or "Log out" button depending on whether user is logged in
- Display "In stock" or "Out of stock" message
- Apply different shipping costs based on country or order total
- Show different messages based on user role (admin vs regular user)
- Validate form inputs and show error messages

CONCEPTS COVERED:
- if statement
- else if statement
- else statement
- Writing conditions inside parentheses
- else if chains for multiple possibilities
- Nesting if statements
- Using comparison and logical operators inside conditions
*/

// ============================================
// STEP 1: Basic if statement
// ============================================

// An if statement only runs the code inside {} if the condition is true.

let userAge = 17;

if (userAge >= 18) {
  // This code only runs if the condition is true
  console.log("You are old enough to vote.");
}

// Because userAge is 17, the message above will NOT print.

// ============================================
// STEP 2: Adding an else
// ============================================

// else runs when the if condition is false.

if (userAge >= 18) {
  console.log("You can vote.");
} else {
  console.log("Sorry, you are too young to vote.");
}
// Output: "Sorry, you are too young to vote."

// ============================================
// STEP 3: Using else if for multiple options
// ============================================

let score = 85;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  // This only gets checked if the first condition was false
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else if (score >= 60) {
  console.log("Grade: D");
} else {
  // else runs only if ALL previous conditions were false
  console.log("Grade: F");
}
// Output: Grade: B

// ============================================
// STEP 4: Real example - Login status
// ============================================

let isLoggedIn = true;
let username = "jessica";

if (isLoggedIn === true) {
  console.log("Welcome back, " + username + "!");
} else {
  console.log("Please log in to continue.");
}

// ============================================
// STEP 5: Using logical operators in conditions
// ============================================

let hasEmail = true;
let hasPassword = true;

if (hasEmail && hasPassword) {
  console.log("You can create an account.");
} else {
  console.log("Please provide both email and password.");
}

let isWeekend = false;
let isHoliday = true;

if (isWeekend || isHoliday) {
  console.log("No work today!");
} else {
  console.log("Time to work.");
}

// ============================================
// STEP 6: Checking multiple conditions for a shopping discount
// ============================================

let cartTotal = 120;
let isMember = true;

if (cartTotal >= 100 && isMember === true) {
  console.log("You get 20% member discount!");
} else if (cartTotal >= 100) {
  console.log("You get 10% discount for spending over $100.");
} else {
  console.log("No discount applied.");
}

// ============================================
// STEP 7: Nested if statements
// ============================================

let isAdmin = true;
let isActive = true;

if (isAdmin === true) {
  console.log("Admin panel available.");

  if (isActive === true) {
    console.log("You can edit all content.");
  } else {
    console.log("Your admin account is currently deactivated.");
  }
}

// ============================================
// STEP 8: Checking string values
// ============================================

let userRole = "editor";

if (userRole === "admin") {
  console.log("Full access granted.");
} else if (userRole === "editor") {
  console.log("You can edit content but not delete.");
} else if (userRole === "viewer") {
  console.log("You can only view content.");
} else {
  console.log("Unknown role.");
}

/*
LINE-BY-LINE BREAKDOWN:

if (userAge >= 18) {
- The keyword "if" starts a conditional
- Inside the parentheses () is the CONDITION (a question that returns true or false)
- The code inside the curly braces {} only runs if the answer is true

} else {
- "else" means "if the condition above was false, do this instead"
- You can only have one else per if statement

} else if (score >= 80) {
- "else if" lets you check another condition
- It is only tested if all previous if/else if conditions were false
- You can have as many else if blocks as you want

if (hasEmail && hasPassword)
- You can put any expression that evaluates to true or false inside the ()
- Logical operators && and || are frequently used here

NOOB TRANSLATION:

Imagine you're following a recipe with decisions:

if (I have eggs) {
  make scrambled eggs
} else if (I have bread) {
  make toast
} else {
  order pizza
}

The computer checks each possibility in order.
As soon as one condition is true, it does that thing and skips the rest.

COMMON MISTAKES:

1. Forgetting the parentheses around the condition
   - if userAge >= 18   ← wrong
   - if (userAge >= 18) ← correct

2. Using = instead of === inside the condition
   - if (role = "admin") ← this assigns, doesn't compare

3. Putting a semicolon after the if condition
   - if (age >= 18); { ... } ← the semicolon breaks it

4. Not using curly braces when you have multiple lines
   - Only the first line after if will be controlled without {}

5. Checking too many things in one giant else if chain instead of using better logic

TRY CHANGING THIS:

1. Change the value of score to different numbers (95, 72, 55, 30) and watch which message prints.

2. Create a variable called temperature. Write an if/else if/else that prints different messages for hot, warm, cool, and freezing.

3. Add a variable called hasPromoCode (boolean). Modify the discount example to give an extra 5% off if the user also has a promo code.

MINI CHALLENGE:

Write code that decides what message to show a user:

Rules:
- If the user is under 13 → "Sorry, you must be at least 13"
- If the user is 13-17 → "Welcome, teen user!"
- If the user is 18 or older AND isLoggedIn is true → "Welcome back!"
- Otherwise → "Please log in to continue"

Use at least one else if.
*/