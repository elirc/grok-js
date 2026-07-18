/*
BEGINNER GOAL:
Understand boolean logic, comparison operators, and how to make decisions in code.

REAL WORLD USE CASE:
User permissions, feature flags, validation, business rules, filtering data.

CONCEPTS COVERED:
- bool type
- Comparison operators (==, !=, >, <, >=, <=)
- Logical operators (&&, ||, !)
- Conditional (ternary) operator
*/

// ============================================
// STEP 1: Boolean values and comparisons
// ============================================

int score = 85;
bool passed = score >= 60;           // true
bool isTopStudent = score == 100;    // false

// ============================================
// STEP 2: Logical operators
// ============================================

bool hasPermission = true;
bool isLoggedIn = true;

bool canAccess = hasPermission && isLoggedIn;  // true
bool canEdit = hasPermission || isAdmin;       // depends on isAdmin

bool isGuest = !isLoggedIn;                    // negation

// ============================================
// STEP 3: Ternary operator
// ============================================

string status = score >= 60 ? "Pass" : "Fail";

// ============================================
// STEP 4: Combining conditions
// ============================================

if (age >= 18 && hasId && !isBanned)
{
    Console.WriteLine("Access granted");
}

/*
LINE-BY-LINE BREAKDOWN:

score >= 60
- Comparison operator returns bool
- >= is "greater than or equal to"

hasPermission && isLoggedIn
- && means "AND" — both must be true
- Short-circuits (stops checking if left is false)

score >= 60 ? "Pass" : "Fail"
- Condition ? valueIfTrue : valueIfFalse
- Very useful for simple decisions

NOOB TRANSLATION:

Booleans are yes/no answers.
You ask questions with ==, >, < etc., and combine answers with AND (&&), OR (||), and NOT (!).

COMMON MISTAKES:

1. Using = instead of == for comparison.
2. Confusing && and ||.
3. Forgetting operator precedence (use parentheses).
4. Overly complex conditions (extract to methods).

TRY CHANGING THIS:

1. Change the score and see how passed and status change.
2. Add more conditions to the canAccess logic.
3. Rewrite the ternary as a regular if-else.

MINI CHALLENGE:

Create variables for:
- age (int)
- hasLicense (bool)
- isDrunk (bool)

Write logic that prints whether the person can drive.
*/