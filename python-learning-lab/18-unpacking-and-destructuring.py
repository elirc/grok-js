"""
BEGINNER GOAL:
Learn unpacking — a clean way to pull values out of sequences and dictionaries.

REAL WORLD USE CASE:
- Getting values from tuples returned by functions
- Swapping variables
- Working with API responses that return multiple values
- Destructuring in loops

CONCEPTS COVERED:
- Unpacking tuples and lists
- * for collecting remaining values
- Dictionary unpacking
- Unpacking in for loops
"""

# ============================================
# STEP 1: Basic unpacking
# ============================================

point = (10, 20)
x, y = point
print(x, y)   # 10 20

# ============================================
# STEP 2: Collecting with *
# ============================================

numbers = [1, 2, 3, 4, 5]
first, *middle, last = numbers
print(first)     # 1
print(middle)    # [2, 3, 4]
print(last)      # 5

# ============================================
# STEP 3: Unpacking in loops
# ============================================

pairs = [("Alex", 28), ("Sam", 31)]

for name, age in pairs:
    print(f"{name} is {age}")

# ============================================
# STEP 4: Dictionary unpacking
# ============================================

user = {"name": "Alex", "age": 28}
print({**user, "city": "Berlin"})   # merges


"""
LINE-BY-LINE BREAKDOWN:

x, y = point
- Unpacks the two values from the tuple into x and y

first, *middle, last = numbers
- *middle collects all the middle values into a list

for name, age in pairs:
- Each tuple in the list is unpacked into name and age

{**user, "city": "Berlin"}
- ** unpacks the dictionary into key-value pairs

NOOB TRANSLATION:

Unpacking is like opening a package and taking out the items inside directly into variables.

COMMON MISTAKES:

1. Wrong number of variables when unpacking
2. Forgetting that * creates a list
3. Trying to unpack dictionaries without **

TRY CHANGING THIS:

1. Swap two variables using unpacking (a, b = b, a).
2. Unpack a list and ignore the middle values using _.
3. Merge two dictionaries using unpacking.

MINI CHALLENGE:

You have a list:
data = ["Alex", 28, "Berlin", "Germany"]

Unpack it so you get:
- first_name
- age
- A list called location with the remaining values

Print them nicely.
"""
