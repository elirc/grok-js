"""
BEGINNER GOAL:
Learn about lambda functions — small anonymous functions you can write in one line.

REAL WORLD USE CASE:
Used heavily with map(), filter(), sorted(), and in GUI frameworks or data processing.

CONCEPTS COVERED:
- lambda syntax
- When to use lambdas
- Lambdas with built-in functions
- Limitations of lambdas
"""

# ============================================
# STEP 1: Regular function vs lambda
# ============================================

def square(x):
    return x ** 2

square_lambda = lambda x: x ** 2

print(square(5))          # 25
print(square_lambda(5))   # 25

# ============================================
# STEP 2: With built-in functions
# ============================================

numbers = [1, 2, 3, 4, 5]

squared = list(map(lambda x: x ** 2, numbers))
print(squared)   # [1, 4, 9, 16, 25]

evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)     # [2, 4]

# ============================================
# STEP 3: Sorting with lambda
# ============================================

users = [("Alex", 25), ("Sam", 31), ("Taylor", 19)]
sorted_users = sorted(users, key=lambda user: user[1])
print(sorted_users)


"""
LINE-BY-LINE BREAKDOWN:

lambda x: x ** 2
- Creates an anonymous function
- Takes one parameter x
- Returns x squared

map(lambda x: x**2, numbers)
- Applies the lambda to every item in numbers

filter(lambda x: x % 2 == 0, numbers)
- Keeps only items where the lambda returns True

key=lambda user: user[1]
- Tells sorted() to sort by the second element of each tuple

NOOB TRANSLATION:

A lambda is a tiny function you write in one line when you don't want to name it.
It's perfect for short operations you only need once.

COMMON MISTAKES:

1. Making lambdas too complex (use a regular function instead)
2. Forgetting that lambdas can only contain a single expression
3. Overusing lambdas when a named function would be clearer

TRY CHANGING THIS:

1. Use lambda with sorted() to sort users by name instead of age.
2. Use map() to convert a list of numbers to strings.
3. Use filter() to keep only numbers greater than 10.

MINI CHALLENGE:

You have a list of products:
products = [("Laptop", 999), ("Mouse", 29), ("Keyboard", 79)]

Use lambda with sorted() and filter() to:
1. Sort by price descending
2. Keep only products cheaper than 100
Print the results.
"""
