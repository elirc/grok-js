/*
BEGINNER GOAL:
Master working with strings in C# — the most common type for text data.

REAL WORLD USE CASE:
User names, messages, log output, configuration values, JSON, file paths, emails — strings are everywhere.

CONCEPTS COVERED:
- String literals and interpolation
- Common methods (Length, Substring, Contains, Replace, Trim)
- Immutability
- StringBuilder for performance
- String comparison
*/

// ============================================
// STEP 1: String interpolation (preferred way)
// ============================================

string firstName = "Alex";
string lastName = "Rivera";
int age = 28;

string fullName = $"{firstName} {lastName}";
string greeting = $"Hello, {fullName}! You are {age} years old.";

// ============================================
// STEP 2: Useful string methods
// ============================================

string text = "  Hello, World!  ";

Console.WriteLine(text.Length);           // 17 (including spaces)
Console.WriteLine(text.Trim());           // "Hello, World!"
Console.WriteLine(text.ToUpper());        // "  HELLO, WORLD!  "
Console.WriteLine(text.Contains("World")); // True
Console.WriteLine(text.Replace("World", "C#")); 

// ============================================
// STEP 3: String is immutable
// ============================================

string original = "Hello";
string modified = original.Replace("H", "J"); // Creates new string

// original is still "Hello"
// modified is "Jello"

// ============================================
// STEP 4: StringBuilder (when you need performance)
// ============================================

using System.Text;

var sb = new StringBuilder();
sb.Append("Hello");
sb.Append(" ");
sb.Append("World");
string result = sb.ToString(); // "Hello World"

/*
LINE-BY-LINE BREAKDOWN:

$"{firstName} {lastName}"
- $ makes it an interpolated string
- {firstName} is replaced with the value at runtime

text.Trim()
- Returns a new string with whitespace removed from both ends
- Original string is unchanged (immutability)

text.Contains("World")
- Case sensitive by default
- Returns bool

StringBuilder
- Efficient when building strings in loops
- Avoids creating many temporary string objects

NOOB TRANSLATION:

Strings in C# are like written messages on paper.
Once you write it, you can't change the paper — you have to make a new one.
Methods like Replace and Trim give you a new piece of paper with the changes.

COMMON MISTAKES:

1. Using + to build strings in a loop (very slow for large data).
2. Forgetting that string methods return new strings.
3. Case sensitivity issues with Contains, Equals, etc.
4. Not using StringBuilder when concatenating many times.

TRY CHANGING THIS:

1. Use string interpolation to include a calculation inside the string.
2. Chain several string methods together (e.g. Trim().ToLower().Replace(...)).
3. Build a long string using + in a loop vs StringBuilder and compare.

MINI CHALLENGE:

Take a user's full name as input. Create:
- A username (lowercase, no spaces)
- A display name (Title Case)
- A greeting that includes the first name only

Print all three.
*/