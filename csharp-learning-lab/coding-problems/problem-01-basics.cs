/*
C# Coding Problems: Basics (EXPANDED 3-5x - 12 problems)

BEGINNER GOAL:
Solidify C# syntax for variables, control flow, collections, methods, and basic OOP thinking.

CONCEPTS: var vs explicit, value/reference types, loops, if/switch, arrays, List<T>, methods, tuples, string interpolation, basic error handling.

Problem 1: Variables & Types + interpolation
Declare and print: int, double, bool, string, char, decimal. Show var inference.

Problem 2: Loops
Even numbers 2-20 with for, while, do-while. Also foreach over array.

Problem 3: Conditionals
Number sign check (pos/neg/zero). Extend with switch expression and pattern matching.

Problem 4: Arrays + manual reverse
Array of 5 strings. Reverse manually + with LINQ Reverse.

Problem 5: Methods returning tuples
(int sum, int prod, int diff) Compute(int a, int b)

Problem 6: Value vs Reference demo
Show modifying a passed array affects caller, modifying int param does not. Use ref/out keywords.

Problem 7: List<T> practice
AddRange, Remove, Find, Sort, ConvertAll. Build list of Person and filter adults.

Problem 8: StringBuilder vs string concat in loop
Benchmark-ish comment showing why StringBuilder for many appends.

Problem 9: Simple class + property
Create a Product class with Name, Price, InStock. Add method ApplyDiscount().

Problem 10: Exception basics
Try parse int from input, catch FormatException, finally always runs.

Problem 11: Nullable types
int? , ?? operator, HasValue, Value.

Problem 12: Enums
Define OrderStatus enum. Print names and values. Use in switch.

Solutions (expanded):

/*
// 1
int x = 42; double d = 3.14; string s = "hi";
Console.WriteLine($"x={x}, d={d:F2}");

// 5
static (int, int, int) Compute(int a, int b) => (a+b, a*b, a-b);

// 7
var people = new List<Person> { new("Alice", 30), ... };
var adults = people.Where(p => p.Age >= 18).ToList();

// 9
public class Product { public string Name {get;set;} ... }
*/

More problems and full solutions + explanations in the file comments.
*/
