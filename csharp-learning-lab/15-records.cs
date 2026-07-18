/*
BEGINNER GOAL:
Learn about records — a modern way to create immutable data types.

REAL WORLD USE CASE:
DTOs, configuration objects, data transfer between layers.

CONCEPTS COVERED:
- record and record struct
- Immutability
- Value equality
- with expressions
*/

// ============================================
// STEP 1: Record declaration
// ============================================

public record Person(string FirstName, string LastName, int Age);

// ============================================
// STEP 2: Creating and using
// ============================================

var p1 = new Person("Alex", "Rivera", 28);
var p2 = p1 with { Age = 29 }; // Creates new record with change

Console.WriteLine(p1 == p2); // False (different age)
Console.WriteLine(p1);       // Person { FirstName = Alex, ... }

/*
LINE-BY-LINE BREAKDOWN:

public record Person(...)
- Compiler generates constructor, properties, Equals, GetHashCode, ToString

with { Age = 29 }
- Non-destructive mutation — creates a copy with changes

NOOB TRANSLATION:

Records are great for "data bags" where you mostly just hold values.

COMMON MISTAKES:

1. Using records for everything (classes are still useful for behavior).
2. Forgetting that records are immutable by default.

TRY CHANGING THIS:

1. Add a method to a record (using 'with' style).
2. Compare record with a regular class.

MINI CHALLENGE:

Create a record for an Order and use 'with' to create a modified copy.
*/