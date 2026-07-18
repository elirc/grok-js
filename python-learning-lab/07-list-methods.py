"""
BEGINNER GOAL:
Learn the most common list methods in detail.

REAL WORLD USE CASE:
Managing dynamic collections of data like carts, tasks, search results.

CONCEPTS COVERED:
- append, extend, insert
- remove, pop, clear
- index, count
- sort, reverse
- copy
"""

# ============================================
# STEP 1: Adding
# ============================================

items = ["a", "b"]
items.append("c")
items.extend(["d", "e"])
items.insert(1, "x")
print(items)   # ['a', 'x', 'b', 'c', 'd', 'e']

# ============================================
# STEP 2: Removing
# ============================================

items.remove("x")     # by value
popped = items.pop(0) # by index
print(popped)
print(items)

# ============================================
# STEP 3: Info and sorting
# ============================================

print(items.count("b"))
items.sort()
items.reverse()
print(items)

copy = items.copy()   # shallow copy


"""
LINE-BY-LINE BREAKDOWN:

append vs extend
- append adds one item
- extend adds multiple items from an iterable

pop() returns the removed item

sort() and reverse() modify in place

copy() creates a shallow copy

NOOB TRANSLATION:

These are the tools you use to modify your shopping list after you've created it.

COMMON MISTAKES:

1. Using remove() when you have the index (use pop instead)
2. Forgetting that sort() changes the list
3. Shallow copy issues with nested lists

TRY CHANGING THIS:

1. Start with an empty list and build it using append and insert.
2. Sort a list of strings in reverse.
3. Use count to see how many times a value appears.

MINI CHALLENGE:

Start with numbers = [3, 1, 4, 1, 5, 9]
- Remove all the 1s
- Sort descending
- Print the second item
"""
