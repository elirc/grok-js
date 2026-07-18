/*
JUNIOR GOAL:
Leverage C#'s powerful pattern matching to write declarative, exhaustive, and maintainable decision logic.

REAL WORLD USE CASE:
Parsing, state machines, API response handling, and domain modeling with discriminated unions.

CONCEPTS COVERED:
- Type patterns and declarations
- Property, positional, and relational patterns
- List patterns
- Switch expressions with when guards
- Exhaustiveness and compiler diagnostics
*/

// ============================================
// STEP 1: Advanced switch
// ============================================

string Describe(object o) => o switch
{
    int i and > 0 => $"Positive int {i}",
    string { Length: > 10 } s => $"Long string: {s[..10]}...",
    Point { X: > 0, Y: > 0 } p => $"Point in first quadrant {p}",
    _ => "Something else"
};

// ============================================
// STEP 2: List patterns
// ============================================

bool IsValidHeader(byte[] bytes) => bytes is [0x89, 0x50, 0x4E, 0x47, ..];

/*
DEEPER BREAKDOWN:

Patterns let you match on both shape and value in a very readable way.

The compiler can prove exhaustiveness in many cases.

JUNIOR PERSPECTIVE:

Pattern matching is one of the best features added to C# in recent years. Use it to make complex conditional logic much clearer.

COMMON PITFALLS IN PRODUCTION:

- Overly clever nested patterns that become hard to read.
- Relying on the compiler for exhaustiveness when using interface hierarchies (it can't always help).

EXPERIMENTS:

1. Rewrite a complex if-else chain using patterns.
2. Use list patterns to validate binary formats or message structures.
3. Combine property patterns with when guards for business rules.

JUNIOR CHALLENGE:

Model a small expression language (Add, Multiply, Literal) using records + pattern matching.
Write an Evaluate function and a PrettyPrint function using switch expressions.
Add a new operation and show how the compiler helps you find all places that need updating.
*/