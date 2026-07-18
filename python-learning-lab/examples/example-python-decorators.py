"""
Example: Decorators for Cross-Cutting Concerns
"""

import time
from functools import wraps

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timer
def slow_computation(n):
    time.sleep(0.1)
    return n * 2

print(slow_computation(21))

"""
A decorator is a function that takes another function and returns a new function that usually wraps the original. The @ syntax is syntactic sugar for assignment after definition.

We used @wraps from functools so that the wrapper function still looks like the original to introspection tools and debuggers (it copies __name__, __doc__, etc.).

Decorators are the standard way to add logging, timing, caching, authentication checks, or retry logic without polluting the business logic of every function.

A junior reading this should understand that the decorated function is replaced at definition time. The name slow_computation now points to the wrapper that was returned by timer.
"""
