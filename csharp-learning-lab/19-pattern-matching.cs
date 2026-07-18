/*
BEGINNER GOAL:
Use modern pattern matching features in C# for cleaner code.

REAL WORLD USE CASE:
Handling different types or shapes of data elegantly.

CONCEPTS COVERED:
- is patterns
- switch expressions with patterns
- Property patterns
*/

// ============================================
// STEP 1: Type patterns
// ============================================

if (obj is string s)
{
    Console.WriteLine(s.ToUpper());
}

// ============================================
// STEP 2: Property patterns
// ============================================

string GetCategory(Product p) => p switch
{
    { Price: > 1000 } => "Expensive",
    { Price: > 100 } => "Mid-range",
    _ => "Cheap"
};

/*
LINE-BY-LINE BREAKDOWN:

is string s
- Checks type and declares variable at the same time

{ Price: > 1000 }
- Matches on properties

NOOB TRANSLATION:

Pattern matching is a powerful way to check shapes and values in one expression.

COMMON MISTAKES:

1. Over-complicated patterns.
2. Forgetting the _ (default) case.

TRY CHANGING THIS:

1. Add more patterns.
2. Use list patterns if on newer C#.

MINI CHALLENGE:

Write a switch expression that handles different shapes (Circle, Rectangle) and calculates area.
*/