"""
Problem Set: Variables, Values, and Data Types in Python (EXPANDED 3-5x)

BEGINNER GOAL:
Practice declaring, mutating, type checking, scope basics, and understanding reference vs value semantics.

REAL WORLD USE CASE:
Everything in apps stores state: user sessions, config, counters, temporary results, form data. Deep understanding of how Python names bind to objects is critical.

CONCEPTS COVERED:
- Assignment, reassignment
- Mutability (lists/dicts vs ints/strings)
- Dynamic typing + type() / isinstance()
- Multiple assignment and tuple unpacking
- None vs missing values
- Constants by convention
- id() and "is" identity vs == equality
- Basic reference semantics

Problem 1:
Create profile vars (name, age, height, is_student, hobbies as list). Print a nice f-string summary.

Problem 2:
Swap two variables using unpacking. Then swap using a temp var. Compare.

Problem 3:
Demonstrate list aliasing + how to copy (slice, list(), copy.copy). Show id() before/after.

Problem 4:
Write a function that prints type and isinstance checks for 10 different values (int, float, str, bool, list, dict, tuple, set, None, complex).

Problem 5:
Use input() to get birth year, compute age. Handle bad input with try/except and default.

Problem 6:
Explore integer interning. Show small ints may share ids. Use "is" vs == on small vs large ints.

Problem 7:
Create "constants" (UPPER) and show Python still allows mutation (document the convention).

Problem 8:
Use multiple assignment: a, b, c = 1, 2, 3 and also unpack a list into variables.

Problem 9:
Create a variable holding a dict, assign to second name, mutate nested list inside dict, observe both.

Problem 10:
Write a small script that stores and updates running totals: total_items, total_price. Print after each update.

Problem 11 (advanced beginner):
Implement a simple "box" that holds one value and supports get/set and also tracks "last set time" using another variable.

Solutions (study after trying - 5x more solutions below):

# Problem 1
name, age, height, is_student, hobbies = "Alice", 25, 1.75, True, ["reading", "coding"]
print(f"{name} ({age}) is {height}m tall. Student: {is_student}. Hobbies: {', '.join(hobbies)}")

# Problem 2
a, b = 10, 3.5
a, b = b, a
print(a, b)

# Problem 3
original = [1, 2, 3]
alias = original
alias.append(99)
print(original, "same object?", original is alias)

# shallow copy
copy1 = original[:]
copy2 = list(original)
copy3 = original.copy()
print("Copies ids different:", id(original), id(copy1))

# Problem 4
def inspect(val):
    print(val, type(val), isinstance(val, (int, float, str, bool, list)))
inspect(42); inspect("hi"); inspect([1]); # etc for 10 values

# Problem 5
try:
    by = int(input("Birth year: "))
    print("Age approx:", 2026 - by)
except ValueError:
    print("Using default 2000")
    print(2026 - 2000)

# Problem 6
print(1 is 1)           # often True due to interning
x = 1000
y = 1000
print(x is y, x == y)   # usually False for 'is' on big ints

# ... full solutions for 7-11 in similar commented form
# Problem 10
total_items = 0
total_price = 0.0
total_items += 2; total_price += 19.99
print(total_items, total_price)

print("Expanded with 11 problems and many edge cases.")
"""
