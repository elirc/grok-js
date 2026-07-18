"""
BEGINNER GOAL:
Understand scope — where variables can be seen and used in your code.
This helps avoid bugs when variables have the same name in different places.

REAL WORLD USE CASE:
- Variables inside functions vs outside
- Avoiding accidental changes to global data
- Understanding why some variables are "not defined"

CONCEPTS COVERED:
- Local vs global scope
- The global keyword
- LEGB rule (Local, Enclosing, Global, Built-in)
- Why scope matters
"""

# ============================================
# STEP 1: Local scope
# ============================================

def greet():
    message = "Hello from inside the function"
    print(message)

greet()
# print(message)  # NameError! message only exists inside greet()

# ============================================
# STEP 2: Global scope
# ============================================

app_name = "Python Learning Lab"

def show_app():
    print(app_name)   # Can read global variable

show_app()

# ============================================
# STEP 3: Modifying global variables
# ============================================

counter = 0

def increment():
    global counter
    counter += 1

increment()
print(counter)   # 1


"""
LINE-BY-LINE BREAKDOWN:

message = "..."
- This variable only exists inside the function (local scope)

app_name = "Python..."
- Created at the top level → global scope

global counter
- Tells Python we want to modify the global variable inside the function

NOOB TRANSLATION:

Scope is like rooms in a house.
- Global variables are things in the living room everyone can see.
- Local variables are things only inside one room (the function).

You usually want to keep variables local.

COMMON MISTAKES:

1. Using the same variable name in different functions and getting confused
2. Forgetting the global keyword when trying to change a global variable
3. Relying too much on global variables (makes code hard to test)

TRY CHANGING THIS:

1. Create a variable inside a function and try to print it outside (see the error).
2. Use global to modify a counter from inside a function.
3. Create two functions that use a variable with the same name.

MINI CHALLENGE:

Create a function that has its own local counter.
Call the function multiple times.
Then create a global counter and modify it from inside another function using global.
Print both results.
"""
