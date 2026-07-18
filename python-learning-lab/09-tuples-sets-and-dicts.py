"""
BEGINNER GOAL:
Learn about tuples, sets, and dictionaries — Python's other main collection types.

REAL WORLD USE CASE:
- Tuples: fixed data like coordinates, RGB colors, database records
- Sets: unique items, removing duplicates, membership testing
- Dicts: key-value data like user profiles, configuration, JSON data

CONCEPTS COVERED:
- tuple (immutable ordered collection)
- set (unique unordered collection)
- dict (key-value pairs)
- Basic operations for each
"""

# ============================================
# STEP 1: Tuples (immutable)
# ============================================

point = (10, 20)
rgb = (255, 128, 0)

print(point[0])     # 10
# point[0] = 5      # Error! Tuples are immutable

x, y = point        # Unpacking
print(x, y)         # 10 20

# ============================================
# STEP 2: Sets (unique values)
# ============================================

tags = {"python", "coding", "python"}
print(tags)                    # {'python', 'coding'} — duplicates removed

tags.add("beginner")
print("python" in tags)        # True

# ============================================
# STEP 3: Dictionaries (key-value)
# ============================================

user = {
    "name": "Alex",
    "age": 28,
    "active": True
}

print(user["name"])            # Alex
print(user.get("city", "Unknown"))  # Unknown (default)

user["age"] = 29               # Update
user["city"] = "Berlin"        # Add new key

print(list(user.keys()))       # ['name', 'age', 'active', 'city']


"""
LINE-BY-LINE BREAKDOWN:

point = (10, 20)
- Creates a tuple (use parentheses)

x, y = point
- Unpacks the tuple into variables

tags = {"python", "coding"}
- Creates a set (curly braces with no colons)

user = {"name": "Alex", ...}
- Creates a dictionary (key: value pairs)

user["name"]
- Access value by key

user.get("city", "Unknown")
- Safe access with default value

NOOB TRANSLATION:

- Tuple = locked shopping list (can't change after creation)
- Set = bag of unique items (no duplicates allowed)
- Dict = labeled boxes where each label (key) points to something (value)

COMMON MISTAKES:

1. Trying to change a tuple
2. Expecting sets to maintain order (before Python 3.7 they didn't)
3. Using a mutable object (like list) as a dictionary key
4. KeyError when accessing missing dict keys

TRY CHANGING THIS:

1. Create a tuple of your name and age. Try to unpack it.
2. Create a set from a list with duplicates and observe the result.
3. Add and remove items from a dictionary.

MINI CHALLENGE:

Create:
- A tuple representing a point (x, y)
- A set of unique tags
- A dictionary for a product (name, price, in_stock)

Print one value from each.
"""
