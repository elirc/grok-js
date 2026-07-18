/*
BEGINNER GOAL:
Work confidently with numeric types and perform common mathematical operations in C#.

REAL WORLD USE CASE:
Prices, quantities, ages, scores, statistics, financial calculations, game logic.

CONCEPTS COVERED:
- int, long, double, decimal
- Arithmetic operators
- Math class
- Casting and conversion
- Division gotchas
*/

// ============================================
// STEP 1: Choosing the right numeric type
// ============================================

int items = 42;           // Whole numbers, fast, limited range
long bigNumber = 9_000_000_000_000; // Bigger whole numbers
double precise = 3.14159; // Floating point (not for money)
decimal money = 99.99m;   // Precise decimal (use for money)

// ============================================
// STEP 2: Basic arithmetic
// ============================================

int a = 10;
int b = 3;

Console.WriteLine(a + b);  // 13
Console.WriteLine(a - b);  // 7
Console.WriteLine(a * b);  // 30
Console.WriteLine(a / b);  // 3  ← integer division!
Console.WriteLine(a % b);  // 1  ← remainder

// ============================================
// STEP 3: Math class and casting
// ============================================

double result = (double)a / b;           // 3.333...
double rounded = Math.Round(result, 2);  // 3.33
double root = Math.Sqrt(16);             // 4

// ============================================
// STEP 4: Converting between types
// ============================================

string numberAsText = "123";
int number = int.Parse(numberAsText);
int safeNumber = int.TryParse("abc", out int parsed) ? parsed : 0;

/*
LINE-BY-LINE BREAKDOWN:

a / b when both are int
- Performs integer division (truncates decimal)
- 10 / 3 = 3, not 3.333

(double)a
- Casts int to double before division
- Forces floating point division

decimal money = 99.99m
- The 'm' suffix is required for decimal literals

Math.Round
- Returns double (or decimal if you pass decimal)
- Use for display, not financial calculations

NOOB TRANSLATION:

Different number types are like different measuring tools.
- int: counting whole items
- double: approximate measurements
- decimal: exact money (never lose pennies!)

COMMON MISTAKES:

1. Integer division surprise (10/3 == 3).
2. Using double for money.
3. Forgetting the 'm' on decimal literals.
4. Not handling TryParse failures.

TRY CHANGING THIS:

1. Change the types of a and b to double and observe the division result.
2. Calculate the area of a circle using Math.PI.
3. Use TryParse to safely convert user input.

MINI CHALLENGE:

Write a small price calculator:
- Take quantity (int) and unitPrice (decimal)
- Calculate subtotal
- Add 8% tax using decimal
- Round to 2 decimal places for display
*/