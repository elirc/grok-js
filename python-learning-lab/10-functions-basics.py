"""
BEGINNER GOAL:
Learn what functions are and why they are one of the most important concepts in programming.
Functions let you package code so you can reuse it easily.

REAL WORLD USE CASE:
- Calculate total price of a cart
- Format a user's full name
- Check if a password is strong enough
- Any time you want to reuse code

CONCEPTS COVERED:
- Defining functions with def
- Calling functions
- Parameters
- Return values
- Why functions help organize code
"""

# ============================================
# STEP 1: Why we need functions
# ============================================

# Without functions we repeat code
print("Welcome, Alex!")
print("You have 3 items.")

# ============================================
# STEP 2: Creating a function
# ============================================

def greet():
    """Prints a welcome message."""
    print("Hello there!")
    print("Welcome to the Python Learning Lab.")

greet()
greet()   # Can call it as many times as we want

# ============================================
# STEP 3: Function with parameters
# ============================================

def greet_user(name):
    print(f"Hello, {name}!")

greet_user("Alex")
greet_user("Sam")

# ============================================
# STEP 4: Function with return value
# ============================================

def add(a, b):
    return a + b

result = add(5, 3)
print(result)   # 8


"""
LINE-BY-LINE BREAKDOWN:

def greet():
- Defines a function named greet
- The colon : starts the function body

def greet_user(name):
- name is a parameter
- When calling, you pass an argument that becomes the value of name

return a + b
- Sends the result back to where the function was called

greet_user("Alex")
- Calls the function and passes "Alex" as the argument

NOOB TRANSLATION:

A function is a reusable recipe.
You write the steps once (def), then you can use the recipe whenever you want by calling its name.

COMMON MISTAKES:

1. Forgetting the colon after the function definition
2. Incorrect indentation of the function body
3. Calling a function before it is defined (in some cases)
4. Not using the value returned by a function

TRY CHANGING THIS:

1. Create a function say_goodbye() that prints two goodbye messages.
2. Make a function called multiply that takes two numbers and returns their product.
3. Add a default parameter to greet_user.

MINI CHALLENGE:

Write a function called introduce that takes name and job title.
It should print: "Hi, I'm {name} and I work as a {job}."
Call it with different values.
"""
