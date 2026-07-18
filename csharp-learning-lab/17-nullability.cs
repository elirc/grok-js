/*
BEGINNER GOAL:
Understand nullable reference types and how to work safely with potentially null values.

REAL WORLD USE CASE:
Preventing NullReferenceException — one of the most common bugs.

CONCEPTS COVERED:
- Nullable reference types (C# 8+)
- ? and !
- Null coalescing and null conditional operators
*/

// ============================================
// STEP 1: Nullable reference types
// ============================================

string? name = null;           // Can be null
string name2 = "Alex";         // Cannot be null (compiler warning if you assign null)

// ============================================
// STEP 2: Safe access
// ============================================

string display = name ?? "Unknown";
int length = name?.Length ?? 0;

// ============================================
// STEP 3: Null-forgiving operator
// ============================================

string definitelyNotNull = name!; // I promise it's not null

/*
LINE-BY-LINE BREAKDOWN:

string?
- This reference can be null

??
- If left is null, use right side

name?.Length
- If name is null, the whole expression is null

NOOB TRANSLATION:

Nullable reference types help the compiler catch places where you might get a null.

COMMON MISTAKES:

1. Using ! too much (defeating the purpose).
2. Ignoring compiler warnings about possible nulls.

TRY CHANGING THIS:

1. Enable nullable in a project and fix the warnings.
2. Use null conditional on a chain of properties.

MINI CHALLENGE:

Write a method that takes a nullable string and returns its uppercase version or "N/A" if null.
*/