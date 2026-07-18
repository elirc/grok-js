"""
BEGINNER GOAL:
Learn how Python handles numbers. Practice basic math operations, and learn useful math functions for rounding, random numbers, etc.

REAL WORLD USE CASE:
Numbers are used constantly in apps:
- Shopping cart totals and prices
- Age calculations
- Quantities in inventory
- Ratings (4.8 stars)
- Percentages and discounts
- Page numbers, scores, countdown timers

CONCEPTS COVERED:
- int and float types
- Basic math operators: +, -, *, /, //, %, **
- Order of operations
- Built-in math functions: round(), abs(), pow()
- The math module
- random module basics
"""

import math
import random

# ============================================
# STEP 1: Storing numbers
# ============================================

price = 19.99          # float
quantity = 3           # int
tax_rate = 0.08        # float

print(type(price))     # <class 'float'>
print(type(quantity))  # <class 'int'>

# ============================================
# STEP 2: Doing math
# ============================================

subtotal = price * quantity      # 59.97
tax = subtotal * tax_rate        # 4.7976
total = subtotal + tax           # 64.7676

print("Total:", total)

# Integer division and modulo
print(17 // 4)   # 4  (floor division)
print(17 % 4)    # 1  (remainder)

# Exponent
print(2 ** 3)    # 8

# ============================================
# STEP 3: Useful built-in functions
# ============================================

print(round(4.678, 2))   # 4.68
print(abs(-15))          # 15
print(max(10, 3, 87))    # 87
print(min(10, 3, 87))    # 3

# ============================================
# STEP 4: The math module
# ============================================

print(math.pi)                    # 3.141592653589793
print(math.sqrt(16))              # 4.0
print(math.ceil(4.1))             # 5
print(math.floor(4.9))            # 4

# ============================================
# STEP 5: Random numbers
# ============================================

print(random.randint(1, 10))      # random int from 1 to 10
print(random.choice(["apple", "banana", "cherry"]))


"""
LINE-BY-LINE BREAKDOWN:

price = 19.99
- Creates a float variable

subtotal = price * quantity
- Uses the multiplication operator

17 // 4
- Floor division: divides and rounds down

2 ** 3
- Exponentiation (2 to the power of 3)

round(4.678, 2)
- Rounds to 2 decimal places

math.sqrt(16)
- Square root from the math module

random.randint(1, 10)
- Returns random integer between 1 and 10 inclusive

NOOB TRANSLATION:

Python has two main kinds of numbers:
- int = whole numbers (like counting apples)
- float = numbers with decimals (like measuring weight)

You can do normal math with +, -, *, /.
Special operators like // and % help with division remainders.

The math module gives you advanced tools like square roots and pi.

COMMON MISTAKES:

1. Expecting 10 / 3 to be 3.333... (in Python 3 it is, but watch integer division with //)
2. Forgetting to import math or random when needed
3. Using round() for financial calculations (better to use decimal module for money)
4. Confusing % (modulo) with percentages

TRY CHANGING THIS:

1. Change price and quantity, then recalculate total with proper rounding to 2 decimals.
2. Generate 5 random numbers between 1 and 100 and find the largest using max().
3. Use math.pow() and compare it with the ** operator.

MINI CHALLENGE:

You bought 7 items that cost 12.50 each.
- Calculate the subtotal
- Add 7% tax
- Round the final total to 2 decimal places
- Print: "Your total is $XX.XX"
"""
