/*
BEGINNER GOAL:
Learn how to control program flow using if, else, and switch statements.

REAL WORLD USE CASE:
User role checks, order status handling, input validation, menu systems.

CONCEPTS COVERED:
- if / else if / else
- switch expression (modern)
- Pattern matching basics
- When to use each
*/

// ============================================
// STEP 1: if-else chain
// ============================================

int score = 85;

if (score >= 90)
{
    Console.WriteLine("A");
}
else if (score >= 80)
{
    Console.WriteLine("B");
}
else
{
    Console.WriteLine("C or lower");
}

// ============================================
// STEP 2: switch expression (recommended in modern C#)
// ============================================

string grade = score switch
{
    >= 90 => "A",
    >= 80 => "B",
    >= 70 => "C",
    _ => "F"          // default
};

// ============================================
// STEP 3: Traditional switch with fall-through prevention
// ============================================

switch (score)
{
    case >= 90:
        Console.WriteLine("Excellent");
        break;
    case >= 80:
        Console.WriteLine("Good");
        break;
    default:
        Console.WriteLine("Keep trying");
        break;
}

/*
LINE-BY-LINE BREAKDOWN:

if (score >= 90)
- Condition in parentheses
- Curly braces recommended even for one line

score switch { ... }
- Modern C# switch expression
- Returns a value
- Much cleaner for mapping values

_ => "F"
- Discard pattern / default case

NOOB TRANSLATION:

if-else is like asking a series of questions in order.
Switch is like looking up an answer in a table.

COMMON MISTAKES:

1. Forgetting break in traditional switch (C# requires it).
2. Overly long if-else chains (use switch or dictionaries).
3. Not handling all cases (use exhaustive switch when possible).

TRY CHANGING THIS:

1. Add more grade ranges.
2. Convert the if-else to a switch expression.
3. Use a switch on a string (day of week).

MINI CHALLENGE:

Write code that takes a day number (1-7) and prints the day name using switch.
*/