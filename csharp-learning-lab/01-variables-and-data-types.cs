/*
BEGINNER GOAL:
Learn how to declare variables, understand C#'s strong typing system, and the main built-in data types.

REAL WORLD USE CASE:
Every C# program stores data in variables: user input, database records, calculations, configuration values, API responses. Choosing the right type prevents bugs and improves performance.

CONCEPTS COVERED:
- Variable declaration with type
- Built-in value types: int, double, bool, char, decimal
- Reference types basics (string)
- var vs explicit typing
- Constants
- Nullable types (basic)
*/

// ============================================
// STEP 1: Declaring variables with explicit types
// ============================================

int age = 25;              // Whole numbers, 32-bit
double price = 19.99;      // Floating point, good for most decimals
bool isActive = true;      // True or false
char grade = 'A';          // Single character
string name = "Alex";      // Text (reference type)
decimal money = 123.45m;   // Precise decimal (use for money!)

// ============================================
// STEP 2: Using var (type inference)
// ============================================

var count = 42;            // Compiler infers int
var message = "Hello";     // Compiler infers string

// Still strongly typed — you can't assign wrong type later
// count = "fifty";        // Compile error

// ============================================
// STEP 3: Constants
// ============================================

const double PI = 3.14159;           // Cannot be changed
const string APP_NAME = "MyApp";

// ============================================
// STEP 4: Nullable value types (C# 8+ nullable reference types context)
// ============================================

int? optionalAge = null;             // Can be null
string? optionalName = null;         // With nullable reference types enabled

if (optionalAge.HasValue)
{
    Console.WriteLine(optionalAge.Value);
}

/*
LINE-BY-LINE BREAKDOWN:

int age = 25;
- "int" is the type (32-bit signed integer)
- "age" is the variable name
- "= 25" assigns the initial value

var count = 42;
- "var" tells the compiler to figure out the type from the right side
- The variable is still statically typed as int

decimal money = 123.45m;
- The "m" suffix tells the compiler this is a decimal literal
- Always use decimal for financial calculations (avoids floating point precision issues)

const double PI = 3.14159;
- "const" means the value is known at compile time and cannot change

int? optionalAge = null;
- The ? makes it a nullable int
- Can hold a value or be null

NOOB TRANSLATION:

Think of a variable as a labeled box.
In C# you must tell the box what kind of thing it can hold (int, string, etc.).
Once declared, it usually can only hold that kind of thing.

"var" is like saying "you figure out what kind of box this is".

COMMON MISTAKES:

1. Using double for money (use decimal instead).
2. Forgetting the 'm' suffix on decimal literals.
3. Thinking var means "untyped" like in JavaScript.
4. Declaring variables without initializing when the compiler can't infer.

TRY CHANGING THIS:

1. Change the type of age to long or short and see what happens.
2. Try assigning a string to a variable declared as int.
3. Create a const for your favorite number and try to change it later (it should fail to compile).

MINI CHALLENGE:

Declare variables for:
- Your age (int)
- Your height in meters (double)
- Whether you are a student (bool)
- The first letter of your name (char)
- Your full name (string)

Then print a sentence using all of them.
*/