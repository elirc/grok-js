/*
BEGINNER GOAL:
Learn how to create and use methods (functions) to organize and reuse code.

REAL WORLD USE CASE:
Breaking large programs into small, testable pieces.

CONCEPTS COVERED:
- Method syntax
- Parameters and return values
- Method overloading
- static methods
*/

// ============================================
// STEP 1: Basic method
// ============================================

static int Add(int a, int b)
{
    return a + b;
}

// ============================================
// STEP 2: Method with no return (void)
// ============================================

static void Greet(string name)
{
    Console.WriteLine($"Hello, {name}!");
}

// ============================================
// STEP 3: Overloading
// ============================================

static int Multiply(int a, int b) => a * b;
static double Multiply(double a, double b) => a * b;

/*
LINE-BY-LINE BREAKDOWN:

static int Add(int a, int b)
- static = belongs to the type, not an instance
- int before name = return type
- Parameters in parentheses

return a + b;
- Sends value back to the caller

void Greet
- No return value

NOOB TRANSLATION:

A method is a named block of code you can run whenever you want.
You give it inputs (parameters) and it can give you back a result.

COMMON MISTAKES:

1. Forgetting the return type.
2. Not using the value returned by a method.
3. Making methods too long.

TRY CHANGING THIS:

1. Create a method that takes a name and age and returns a greeting string.
2. Overload a method to accept different number of parameters.

MINI CHALLENGE:

Write a method called IsEven that takes an int and returns true if it's even.
*/