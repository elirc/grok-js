"""
BEGINNER GOAL:
Understand what strings are (pieces of text) and how to work with them using string methods.
Learn how to transform, combine, and inspect text.

REAL WORLD USE CASE:
Strings are everywhere in apps:
- User names and emails
- Product titles and descriptions
- Messages in chat apps
- Form input validation ("is this email valid?")
- Displaying formatted text like "Welcome back, Sarah!"

CONCEPTS COVERED:
- Creating strings (single quotes, double quotes, triple quotes)
- String indexing and slicing
- Common string methods: upper, lower, strip, replace, split, join, find, in
- f-strings for formatting
- String immutability
"""

# ============================================
# STEP 1: Creating strings
# ============================================

# A string is text wrapped in quotes.
# You can use single quotes, double quotes, or triple quotes.
first_name = "Maria"
last_name = 'Rodriguez'
# Both are valid strings.

# Triple quotes are useful for multi-line strings or docstrings.
bio = """Maria is a software engineer.
She loves Python and coffee."""

# ============================================
# STEP 2: Finding out how long a string is
# ============================================

# Every string has a built-in len() function
print(len(first_name))   # Output: 5

full_name = "Maria Rodriguez"
print(len(full_name))    # Output: 15 (including the space)

# ============================================
# STEP 3: Getting characters and slicing
# ============================================

greeting = "Hello Python"

# Indexing starts at 0
print(greeting[0])   # H
print(greeting[6])   # P

# Negative indexing counts from the end
print(greeting[-1])  # n (last character)

# Slicing: string[start:stop:step]
print(greeting[0:5])     # Hello
print(greeting[6:])      # Python
print(greeting[::2])     # HloPto (every second character)

# ============================================
# STEP 4: Common string methods
# ============================================

text = "   hello, PYTHON world!   "

print(text.strip())           # Removes leading/trailing whitespace
print(text.lower())           # hello, python world!
print(text.upper())           #    HELLO, PYTHON WORLD!   
print(text.replace("PYTHON", "python"))  #    hello, python world!   

words = text.strip().split(",")   # ['hello', ' PYTHON world!']
print(words)

# Joining a list into a string
joined = " - ".join(["apple", "banana", "cherry"])
print(joined)   # apple - banana - cherry

# ============================================
# STEP 5: Checking if something exists
# ============================================

email = "student@school.edu"

print("@" in email)           # True
print(email.startswith("stu")) # True
print(email.endswith(".edu"))  # True

# ============================================
# STEP 6: f-strings (modern and recommended)
# ============================================

name = "Alex"
age = 28
print(f"{name} is {age} years old.")           # Alex is 28 years old.
print(f"{name.upper()} is {age + 5} next year.")  # ALEX is 33 next year.


"""
LINE-BY-LINE BREAKDOWN:

first_name = "Maria"
- Creates a variable and stores the string value "Maria"

len(full_name)
- len() is a built-in function that returns the number of characters

greeting[0]
- Square brackets access a character by index (0-based)

greeting[0:5]
- Slice syntax: from index 0 up to (but not including) index 5

text.strip()
- strip() is a method that returns a new string with whitespace removed from both ends

text.replace("PYTHON", "python")
- Returns a new string with all occurrences replaced

"@" in email
- The 'in' operator checks if a substring exists (returns bool)

f"{name} is {age} years old."
- f-string: expressions inside {} are evaluated and inserted

NOOB TRANSLATION:

Think of a string like a row of letter beads on a string.
- len() tells you how many beads there are
- [0] lets you look at the first bead
- upper() gives you a brand new necklace where every bead is uppercase
- replace() swaps specific beads for new ones
- f-strings are like filling in blanks in a sentence with real values

COMMON MISTAKES:

1. Forgetting that strings are zero-indexed
2. Thinking string methods change the original string (they return new strings)
3. Using + for concatenation in loops (very slow) instead of join() or f-strings
4. Case sensitivity issues with methods like startswith()

TRY CHANGING THIS:

1. Create a variable called messy = "   PyThOn Is FuN   " and clean it using strip(), lower(), and replace().
2. Use slicing to extract the first 3 and last 3 characters of a string.
3. Build a sentence using an f-string that includes the length of a name.

MINI CHALLENGE:

You have a username that might have accidental spaces:
messy_username = "   CoolCoder42   "

Do the following:
1. Remove the spaces
2. Convert it to lowercase
3. Check if it contains the word "coder"
4. Print the final clean version and its length
"""
