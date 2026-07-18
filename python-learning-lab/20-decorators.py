"""
BEGINNER GOAL:
Learn about decorators — functions that modify other functions.

REAL WORLD USE CASE:
Logging, timing functions, authentication checks, caching, and Flask/Django route decorators.

CONCEPTS COVERED:
- What a decorator is
- Writing simple decorators
- Using @ syntax
- Decorators that take arguments
"""

import time
from functools import wraps

# ============================================
# STEP 1: Simple decorator
# ============================================

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.time() - start:.4f} seconds")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    print("Done!")

slow_function()

# ============================================
# STEP 2: Decorator with arguments
# ============================================

def repeat(times):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(times):
                func(*args, **kwargs)
        return wrapper
    return decorator

@repeat(3)
def say_hello():
    print("Hello!")

say_hello()


"""
LINE-BY-LINE BREAKDOWN:

def timer(func):
- A decorator takes a function

@wraps(func)
- Preserves the original function's name and docstring

def wrapper(*args, **kwargs):
- Accepts any arguments and passes them through

@timer
- Applies the decorator

NOOB TRANSLATION:

A decorator is like a wrapper around a function.
You can add extra behavior (logging, timing, checks) without changing the original function.

COMMON MISTAKES:

1. Forgetting to use @wraps (loses function metadata)
2. Not returning the result from the wrapper
3. Making decorators too complicated

TRY CHANGING THIS:

1. Create a decorator that prints "Starting..." and "Finished...".
2. Make a decorator that only runs the function if a debug flag is True.
3. Add arguments to a simple decorator.

MINI CHALLENGE:

Write a decorator called count_calls that keeps track of how many times a function has been called.
Print the count every time the function runs.
"""
