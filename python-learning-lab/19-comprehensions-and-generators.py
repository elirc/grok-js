"""
BEGINNER GOAL:
Master list/dict/set comprehensions and generator expressions for clean data transformations.

REAL WORLD USE CASE:
Quickly filtering and transforming data from APIs, files, or databases.

CONCEPTS COVERED:
- List comprehensions
- Dict and set comprehensions
- Generator expressions (lazy)
- Conditional logic inside comprehensions
"""

# ============================================
# STEP 1: List comprehension
# ============================================

numbers = [1, 2, 3, 4, 5, 6]

squares = [n**2 for n in numbers]
evens = [n for n in numbers if n % 2 == 0]
labels = ["even" if n % 2 == 0 else "odd" for n in numbers]

print(squares)
print(evens)
print(labels)

# ============================================
# STEP 2: Dict comprehension
# ============================================

names = ["Alex", "Sam", "Jordan"]
name_lengths = {name: len(name) for name in names}
print(name_lengths)

# ============================================
# STEP 3: Generator expression (memory efficient)
# ============================================

# This does NOT create a list of 1 million items
big_squares = (n**2 for n in range(1_000_000))

print(next(big_squares))  # 0
print(next(big_squares))  # 1


"""
LINE-BY-LINE BREAKDOWN:

[n**2 for n in numbers]
- For every n, square it and collect into list

[n for n in numbers if n % 2 == 0]
- Filter + collect

"even" if ... else "odd"
- Conditional expression inside

{name: len(name) for name in names}
- Builds a dictionary

(n**2 for n in range(...))
- Generator expression — lazy, no big list created

NOOB TRANSLATION:

Comprehensions are a short way to say:
"Make a new collection by doing something to every item (optionally only some of them)."

Generator expressions are the same but they give you items one at a time.

COMMON MISTAKES:

1. Making very long comprehensions that are hard to read
2. Using list comprehension when a generator would save memory
3. Forgetting that they create new collections (original is unchanged)

TRY CHANGING THIS:

1. Create a dict of word -> length from a sentence split into words.
2. Use a generator expression to sum squares from 1 to 100 without creating a list.
3. Add an else clause to a list comprehension.

MINI CHALLENGE:

Given a list of product dicts:
products = [
    {"name": "Laptop", "price": 999, "in_stock": True},
    {"name": "Mouse", "price": 29, "in_stock": False},
]

Use comprehensions to create:
1. List of names of products that are in stock
2. Dict of name -> price for all products
3. Set of prices that are over 100
"""
