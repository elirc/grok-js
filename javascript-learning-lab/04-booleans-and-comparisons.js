/*
BEGINNER GOAL:
Learn what booleans are (true and false values). Understand how to compare values and create conditions using comparison operators and logical operators.

REAL WORLD USE CASE:
Booleans are the "yes/no" of programming:
- Is the user logged in? (true/false)
- Has the user paid? 
- Is this product on sale?
- Does this email contain an @ symbol?
- Is the password long enough?
- Should we show the "Add to Cart" button or the "Out of Stock" message?

CONCEPTS COVERED:
- Boolean values true and false
- Comparison operators: ===, !==, >, <, >=, <=
- Logical operators: && (AND), || (OR), ! (NOT)
- How comparisons produce boolean results
- Storing comparison results in variables
*/

// ============================================
// STEP 1: What is a boolean?
// ============================================

// A boolean is a value that can only be true or false.
// It represents a yes/no, on/off, or pass/fail answer.

let isLoggedIn = true;
let hasPaid = false;
let isAdmin = true;

console.log(isLoggedIn);  // true
console.log(hasPaid);     // false

// ============================================
// STEP 2: Creating booleans using comparisons
// ============================================

// When you compare two values, JavaScript gives you back a boolean.

let userAge = 19;
let minimumAge = 18;

// === means "is exactly equal to?"
let isOldEnough = userAge === minimumAge;
// userAge (19) is compared to minimumAge (18)
// 19 is not exactly equal to 18
// So isOldEnough becomes false
console.log("Is exactly 18?", isOldEnough);

// > means "is greater than?"
console.log(userAge > minimumAge);  // true  (19 > 18)

// < means "is less than?"
console.log(userAge < minimumAge);  // false

// >= means "greater than or equal to"
console.log(userAge >= minimumAge); // true

// !== means "is NOT equal to"
let username = "Alex";
console.log(username !== "Sam");    // true  (Alex is not Sam)

// ============================================
// STEP 3: Storing the result of a comparison
// ============================================

// It's very common to store the result so you can reuse it.

let password = "secret123";
let passwordLength = password.length;

let isPasswordLongEnough = passwordLength >= 8;
console.log("Password is valid length:", isPasswordLongEnough);
// Output: true

// ============================================
// STEP 4: The logical AND operator &&
// ============================================

// && means "both sides must be true"

let hasUsername = true;
let hasPassword = true;

let canLogIn = hasUsername && hasPassword;
// Only true if BOTH are true
console.log("Can log in?", canLogIn); // true

let hasEmail = true;
let isVerified = false;

let canPost = hasEmail && isVerified;
console.log("Can post?", canPost); // false (because isVerified is false)

// ============================================
// STEP 5: The logical OR operator ||
// ============================================

// || means "at least one side must be true"

let hasCoupon = false;
let isPremiumMember = true;

let getsDiscount = hasCoupon || isPremiumMember;
// true if EITHER is true
console.log("Gets discount?", getsDiscount); // true

// ============================================
// STEP 6: The NOT operator !
// ============================================

// ! flips the value: true becomes false, false becomes true

let isActive = true;
console.log(!isActive);  // false

let isBanned = false;
console.log(!isBanned);  // true

// Very useful for "is NOT something"
let cartIsEmpty = false;

if (!cartIsEmpty) {
  console.log("Show checkout button");
}

// ============================================
// STEP 7: Combining multiple comparisons
// ============================================

let userPoints = 120;
let hasCompletedProfile = true;
let isNewUser = false;

// User can get a badge if they have enough points AND completed profile
let qualifiesForBadge = (userPoints >= 100) && hasCompletedProfile;
console.log("Qualifies for badge:", qualifiesForBadge);

// User gets a welcome bonus if new OR has very low points
let getsWelcomeBonus = isNewUser || (userPoints < 10);
console.log("Gets welcome bonus:", getsWelcomeBonus);

// ============================================
// STEP 8: Comparing different types (be careful!)
// ============================================

// === is strict equality. It checks both value AND type.

console.log(5 === "5");   // false  (number vs string)
console.log(5 == "5");    // true   (loose equality - AVOID using ==)

// Always prefer === and !== for comparisons when learning

/*
LINE-BY-LINE BREAKDOWN:

let isOldEnough = userAge === minimumAge;
- The === operator compares two values
- It returns a boolean (true or false)
- The result is stored in the variable isOldEnough

userAge > minimumAge
- The > operator checks if the left value is greater than the right value
- Returns true or false directly

hasUsername && hasPassword
- && requires BOTH sides to be true
- If either side is false, the whole expression becomes false

hasCoupon || isPremiumMember
- || returns true if AT LEAST ONE side is true
- Only returns false when both sides are false

!isActive
- The ! (NOT) operator flips whatever boolean is on its right
- !true becomes false

passwordLength >= 8
- >= checks "greater than or equal to"
- Returns a boolean result

NOOB TRANSLATION:

Booleans are the answer to a yes-or-no question.
- Comparisons (===, >, <, etc.) are questions you ask
- The answer is always either true or false
- && means "AND both of these must be yes"
- || means "OR at least one of these is yes"
- ! means "the opposite of this answer"

Real life example:
"Can I drive?"
- Do I have a license? (true)
- Am I over 16? (true)
- license && over16 → true, you can drive

COMMON MISTAKES:

1. Using = instead of === by accident
   - if (age = 18)  ← this assigns 18, it doesn't compare!

2. Using == instead of === 
   - "5" == 5 is true but usually not what you want

3. Forgetting that && needs BOTH things to be true

4. Thinking || means "only one can be true" (no, it means at least one)

5. Confusing ! with "not equal"
   - !isLoggedIn means "is the opposite of logged in"
   - isLoggedIn !== true is a different way of saying the same thing

TRY CHANGING THIS:

1. Change userAge to 17 and see how all the comparisons using userAge change.

2. Create two booleans: hasCar and hasLicense. Use && to decide if someone can drive.

3. Take a number variable and use >, <, >=, and === to compare it to 50. Print all four results.

MINI CHALLENGE:

A user wants to access premium content.
Rules:
- Must be logged in
- Must be at least 18 years old
- OR must have a special access code (boolean)

Create the variables and use logical operators to decide if access should be granted.
Print "Access granted" or "Access denied".
*/