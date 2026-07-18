/*
BEGINNER GOAL:
Learn the different loop constructs in C# and when to use each.

REAL WORLD USE CASE:
Processing lists of data, repeating operations, searching, validation retries.

CONCEPTS COVERED:
- for loop
- while and do-while
- foreach
- break and continue
- when to prefer which loop
*/

// ============================================
// STEP 1: for loop (when you need the index)
// ============================================

for (int i = 0; i < 5; i++)
{
    Console.WriteLine($"Iteration {i}");
}

// ============================================
// STEP 2: foreach (most common for collections)
// ============================================

List<string> names = new() { "Alex", "Sam", "Jordan" };

foreach (string name in names)
{
    Console.WriteLine(name);
}

// ============================================
// STEP 3: while (when you don't know how many times)
// ============================================

int attempts = 0;
while (attempts < 3)
{
    // Try something
    attempts++;
}

// ============================================
// STEP 4: break and continue
// ============================================

foreach (int number in new[] { 1, 2, 3, 4, 5 })
{
    if (number == 3) continue;   // skip
    if (number == 5) break;      // stop
    Console.WriteLine(number);
}

/*
LINE-BY-LINE BREAKDOWN:

for (int i = 0; i < 5; i++)
- Initialization; Condition; Increment

foreach (string name in names)
- Clean way to iterate collections
- No index available (use for that)

while (condition)
- Check condition before each iteration

continue
- Skip rest of current iteration

break
- Exit the loop immediately

NOOB TRANSLATION:

- for: "I know exactly how many times"
- foreach: "Go through each item in this collection"
- while: "Keep doing this until something changes"

COMMON MISTAKES:

1. Infinite loops (forgetting to change the loop variable).
2. Modifying a collection while foreach-ing over it.
3. Using for when foreach is clearer.

TRY CHANGING THIS:

1. Print numbers 1 to 10 using all three loop types.
2. Use continue to skip even numbers.
3. Write a loop that stops when it finds a specific value.

MINI CHALLENGE:

Loop through numbers 1-20 and print only the even numbers using a for loop and the modulo operator.
*/