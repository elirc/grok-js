/*
BEGINNER GOAL:
Learn how to handle errors gracefully using try-catch.

REAL WORLD USE CASE:
Dealing with bad user input, network failures, file not found, etc.

CONCEPTS COVERED:
- try / catch / finally
- Exception types
- throw
- when clause
*/

// ============================================
// STEP 1: Basic try-catch
// ============================================

try
{
    int x = int.Parse("abc");
}
catch (FormatException ex)
{
    Console.WriteLine("Not a valid number: " + ex.Message);
}
finally
{
    Console.WriteLine("This always runs");
}

// ============================================
// STEP 2: Throwing exceptions
// ============================================

if (age < 0)
{
    throw new ArgumentException("Age cannot be negative");
}

/*
LINE-BY-LINE BREAKDOWN:

try { ... }
- Code that might fail

catch (FormatException ex)
- Only catches this specific type of error
- ex contains details

finally
- Always executes (cleanup)

NOOB TRANSLATION:

try = "attempt this"
catch = "if it fails, do this instead"
finally = "do this no matter what"

COMMON MISTAKES:

1. Catching Exception instead of specific types.
2. Empty catch blocks.
3. Not cleaning up resources in finally (use 'using' instead).

TRY CHANGING THIS:

1. Catch different exception types.
2. Throw your own exception.

MINI CHALLENGE:

Write code that tries to divide two numbers and catches DivideByZeroException.
*/