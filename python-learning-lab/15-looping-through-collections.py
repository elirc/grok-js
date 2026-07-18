"""
BEGINNER GOAL:
Learn the best ways to go through collections (lists, dicts, etc.) in Python.

REAL WORLD USE CASE:
- Showing products
- Processing user data
- Calculating totals from items
- Filtering or transforming data

CONCEPTS COVERED:
- for loops over lists
- Looping over dictionaries (keys, values, items)
- enumerate()
- zip()
"""

# ============================================
# STEP 1: Looping over lists
# ============================================

fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(fruit)

# With index
for index, fruit in enumerate(fruits):
    print(index, fruit)

# ============================================
# STEP 2: Looping over dictionaries
# ============================================

user = {"name": "Alex", "age": 28, "city": "Berlin"}

for key in user:
    print(key, "->", user[key])

for key, value in user.items():
    print(f"{key}: {value}")

# ============================================
# STEP 3: zip() for parallel iteration
# ============================================

names = ["Alex", "Sam"]
ages = [28, 31]

for name, age in zip(names, ages):
    print(f"{name} is {age}")


"""
LINE-BY-LINE BREAKDOWN:

for fruit in fruits:
- Goes through each item

enumerate(fruits)
- Gives you (index, item) pairs

user.items()
- Gives (key, value) pairs from a dictionary

zip(names, ages)
- Pairs up items from multiple sequences

NOOB TRANSLATION:

Looping means "go through this collection one by one".
Python makes it easy with for ... in ...

enumerate gives you the position too.
zip lets you walk two lists side by side.

COMMON MISTAKES:

1. Trying to modify a list while looping over it directly
2. Using range(len(list)) when you can just loop over the list
3. Forgetting .items() when you need both keys and values

TRY CHANGING THIS:

1. Loop over a list of numbers and print only the even ones.
2. Create a dictionary and loop only over the values.
3. Use zip() on three lists.

MINI CHALLENGE:

You have two lists:
names = ["Alex", "Sam", "Jordan"]
scores = [85, 92, 78]

Use zip() and a loop to print:
"Alex scored 85"
"Sam scored 92"
etc.
"""
