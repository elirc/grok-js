"""
BEGINNER GOAL:
Learn what lists are and how to create, read, and modify them.
Lists are one of the most important ways to store collections of data in Python.

REAL WORLD USE CASE:
- List of products in a store
- List of messages in a chat
- List of tasks in a todo app
- List of users who liked a post

CONCEPTS COVERED:
- Creating lists with []
- Indexing (0-based)
- Slicing
- Adding/removing items
- List length
- Mutability
"""

# ============================================
# STEP 1: Creating a list
# ============================================

fruits = ["apple", "banana", "orange", "grape"]
print(fruits)                    # ['apple', 'banana', 'orange', 'grape']

numbers = [10, 20, 30]
mixed = ["hello", 42, True, None]

# ============================================
# STEP 2: Accessing items
# ============================================

print(fruits[0])     # apple (first item)
print(fruits[1])     # banana
print(fruits[-1])    # grape (last item)

# ============================================
# STEP 3: List length
# ============================================

print(len(fruits))   # 4

# Get last item using length
last = fruits[len(fruits) - 1]
print(last)          # grape

# ============================================
# STEP 4: Changing lists
# ============================================

fruits[1] = "blueberry"   # Replace item
print(fruits)

# ============================================
# STEP 5: Adding and removing
# ============================================

fruits.append("mango")    # Add to end
print(fruits)

removed = fruits.pop()    # Remove and return last item
print(removed)
print(fruits)

fruits.insert(1, "kiwi")  # Insert at specific position
print(fruits)


"""
LINE-BY-LINE BREAKDOWN:

fruits = ["apple", "banana", ...]
- Creates a list using square brackets
- Items are separated by commas

fruits[0]
- Access item at index 0 (first item)

len(fruits)
- Returns the number of items in the list

fruits[1] = "blueberry"
- Replaces the item at position 1

fruits.append("mango")
- Adds an item to the end of the list (modifies in place)

fruits.pop()
- Removes and returns the last item

NOOB TRANSLATION:

A list is like a shopping list on a piece of paper.
You can:
- Look at specific items by their position
- Change items
- Add new items to the end
- Cross items off the list

Lists can hold mixed types, but it's usually better to keep similar items together.

COMMON MISTAKES:

1. Forgetting that indexing starts at 0
2. Trying to access an index that doesn't exist (IndexError)
3. Confusing len() with last index (len-1 is last index)
4. Expecting lists to be sorted by default

TRY CHANGING THIS:

1. Add two more fruits using append(). Print the list and its length.
2. Replace the second item in the list. Print before and after.
3. Create a list of 5 numbers and print the first, middle, and last.

MINI CHALLENGE:

Create a list called favorite_movies with at least 4 movie titles.
- Print how many movies are in the list
- Replace the second movie
- Add a new movie using append()
- Remove the last movie using pop()
- Print the final list
"""
