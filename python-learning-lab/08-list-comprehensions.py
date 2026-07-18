"""
BEGINNER GOAL:
Learn list comprehensions — a powerful and concise way to create new lists from existing ones.

REAL WORLD USE CASE:
Transforming data, filtering lists, creating new collections quickly and readably.

CONCEPTS COVERED:
- Basic list comprehension syntax
- Adding conditions (filtering)
- Applying transformations
- Nested comprehensions (basic)
"""

# ============================================
# STEP 1: Basic transformation
# ============================================

numbers = [1, 2, 3, 4, 5]

squared = [x ** 2 for x in numbers]
print(squared)   # [1, 4, 9, 16, 25]

# ============================================
# STEP 2: Filtering with condition
# ============================================

even_numbers = [x for x in numbers if x % 2 == 0]
print(even_numbers)   # [2, 4]

# ============================================
# STEP 3: Real-world example
# ============================================

users = [
    {"name": "Alex", "age": 25, "active": True},
    {"name": "Sam", "age": 17, "active": True},
    {"name": "Jordan", "age": 32, "active": False},
]

active_adult_names = [
    user["name"] 
    for user in users 
    if user["active"] and user["age"] >= 18
]
print(active_adult_names)   # ['Alex']

# ============================================
# STEP 4: With else (conditional expression)
# ============================================

labels = ["adult" if user["age"] >= 18 else "minor" for user in users]
print(labels)


"""
LINE-BY-LINE BREAKDOWN:

[x ** 2 for x in numbers]
- For each item x in numbers, calculate x squared
- Collect results into a new list

[x for x in numbers if x % 2 == 0]
- Only include x if the condition is True

user["name"] for user in users if ...
- Transform + filter in one line

"adult" if ... else "minor"
- Conditional expression inside comprehension

NOOB TRANSLATION:

A list comprehension is like saying:
"Make a new list by doing this to every item in the old list (but only the ones that match this rule)."

It's shorter and often more readable than writing a for loop + append.

COMMON MISTAKES:

1. Making comprehensions too long and hard to read
2. Forgetting that they always create a new list
3. Using them when a regular for loop would be clearer
4. Nesting too deeply

TRY CHANGING THIS:

1. Create a list of squares of even numbers from 1 to 20.
2. From the users list, get names of all inactive users.
3. Create a list that says "high" for numbers > 10, else "low".

MINI CHALLENGE:

Given a list of product prices:
prices = [10, 25, 5, 40, 15]

Create:
1. A list of prices with 10% tax added (rounded to 2 decimals)
2. A list of only prices over 20
3. A list of strings like "$10.00", "$25.00", etc.
"""
