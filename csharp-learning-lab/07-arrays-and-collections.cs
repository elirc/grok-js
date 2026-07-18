/*
BEGINNER GOAL:
Work with arrays and the main collection types in C#.

REAL WORLD USE CASE:
Storing lists of users, products, orders, log entries, etc.

CONCEPTS COVERED:
- Arrays (fixed size)
- List<T> (dynamic)
- Basic operations: Add, Remove, Contains, Count
*/

// ============================================
// STEP 1: Arrays
// ============================================

int[] scores = new int[5];           // Fixed size of 5
string[] names = { "Alex", "Sam" };  // Initializer syntax

scores[0] = 95;
Console.WriteLine(scores.Length);

// ============================================
// STEP 2: List<T> (most used)
// ============================================

List<string> fruits = new List<string>();
fruits.Add("Apple");
fruits.Add("Banana");

Console.WriteLine(fruits.Count);     // 2
fruits.Remove("Apple");
fruits.Contains("Banana");           // true

// ============================================
// STEP 3: Initializing with collection expression (C# 12+)
// ============================================

List<int> numbers = [1, 2, 3, 4];

/*
LINE-BY-LINE BREAKDOWN:

new int[5]
- Creates array with room for 5 elements
- Elements are default values (0 for int)

fruits.Add("Apple")
- Adds to the end
- List grows automatically

fruits.Count
- Number of current items (not capacity)

NOOB TRANSLATION:

Array = fixed size box.
List = magic box that grows when you add things.

COMMON MISTAKES:

1. Trying to access index that doesn't exist.
2. Using arrays when you need to add/remove items frequently.
3. Forgetting to import System.Collections.Generic.

TRY CHANGING THIS:

1. Create an array of 3 names and print the middle one.
2. Add 5 items to a List and then remove one.
3. Check if a value exists in the list using Contains.

MINI CHALLENGE:

Create a List of integers. Add numbers 1 through 10. Then remove all even numbers and print what's left.
*/