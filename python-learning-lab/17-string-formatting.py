"""
BEGINNER GOAL:
Learn different ways to format strings in Python, especially f-strings which are modern and powerful.

REAL WORLD USE CASE:
Creating user messages, log output, reports, dynamic SQL (carefully), and UI text.

CONCEPTS COVERED:
- f-strings (recommended)
- .format() method
- % formatting (old style)
- Alignment and padding
"""

# ============================================
# STEP 1: f-strings (best for most cases)
# ============================================

name = "Alex"
age = 28
print(f"{name} is {age} years old.")

# Expressions inside
print(f"Next year you will be {age + 1}")

# Formatting numbers
price = 19.99
print(f"Price: ${price:.2f}")   # Price: $19.99

# ============================================
# STEP 2: .format() method
# ============================================

message = "Hello, {}! You are {}.".format(name, age)
print(message)

# Named placeholders
print("Hello, {name}!".format(name=name))

# ============================================
# STEP 3: Alignment
# ============================================

print(f"|{name:>10}|")   # Right align
print(f"|{name:<10}|")   # Left align
print(f"|{name:^10}|")   # Center


"""
LINE-BY-LINE BREAKDOWN:

f"{name} is {age}"
- f-string: expressions in {} are evaluated

f"Price: ${price:.2f}"
- :.2f means format as float with 2 decimal places

.format(name, age)
- Positional replacement

"{name}".format(name=name)
- Named replacement

>10, <10, ^10
- Alignment with width

NOOB TRANSLATION:

f-strings are like Mad Libs with real data.
You write the sentence and put {variables} where the blanks are.

COMMON MISTAKES:

1. Forgetting the f before the string (just gets literal {name})
2. Using old % formatting when f-strings are available
3. Not handling None or missing keys gracefully

TRY CHANGING THIS:

1. Format a number as percentage with 1 decimal.
2. Create a table-like output with aligned columns.
3. Use .format() with a dictionary.

MINI CHALLENGE:

Create variables for product name and price.
Print a nicely formatted receipt line like:
"Product: Laptop          Price: $  999.00"
Use width and alignment in an f-string.
"""
