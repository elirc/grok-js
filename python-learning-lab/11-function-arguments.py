"""
BEGINNER GOAL:
Learn how to give functions information using arguments (parameters).
Arguments let functions work with different values each time they are called.

REAL WORLD USE CASE:
- greet any user by name
- calculate total for any cart
- format any price
- validate different inputs

CONCEPTS COVERED:
- Positional arguments
- Keyword arguments
- Default arguments
- *args and **kwargs (intro)
"""

# ============================================
# STEP 1: Positional arguments
# ============================================

def greet_user(name, greeting):
    print(f"{greeting}, {name}!")

greet_user("Alex", "Hello")      # Hello, Alex!

# ============================================
# STEP 2: Keyword arguments
# ============================================

greet_user(greeting="Hi", name="Sam")   # Order doesn't matter

# ============================================
# STEP 3: Default arguments
# ============================================

def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alex")                   # Hello, Alex!
greet("Sam", "Hey")             # Hey, Sam!

# ============================================
# STEP 4: *args and **kwargs
# ============================================

def print_all(*args, **kwargs):
    print("Positional:", args)
    print("Keyword:", kwargs)

print_all(1, 2, 3, name="Alex", age=28)


"""
LINE-BY-LINE BREAKDOWN:

def greet_user(name, greeting):
- name and greeting are parameters

greet_user("Alex", "Hello")
- "Alex" is passed as first positional argument

greet_user(greeting="Hi", name="Sam")
- Keyword arguments — order doesn't matter

greeting="Hello"
- Default value if no argument is provided

*args
- Collects extra positional arguments into a tuple

**kwargs
- Collects extra keyword arguments into a dictionary

NOOB TRANSLATION:

Think of parameters as labeled mailboxes.
When you call the function, you put values into those mailboxes.
Default values mean "if you don't put anything, I'll use this instead".

COMMON MISTAKES:

1. Mixing up the order of positional arguments
2. Forgetting that default arguments must come after non-default ones
3. Using *args and **kwargs without a clear reason

TRY CHANGING THIS:

1. Create a function calculate_total(price, quantity=1) and call it different ways.
2. Write a function that accepts any number of numbers and returns their sum using *args.

MINI CHALLENGE:

Create a function called describe_pet that takes:
- name (required)
- animal (required)
- age (optional, default 1)

Print a nice sentence. Call it with and without the age.
"""
