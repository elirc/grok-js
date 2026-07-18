"""
Advanced Functions, *args/**kwargs, Decorators, Closures, Generators as Functions in Python (EXPANDED 3-5x)

Example 1: Timer decorator (real timing)
import time
def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.time() - start:.4f}s")
        return result
    return wrapper

@timer
def slow_work():
    time.sleep(0.3)
    return "done"

Example 2: Flexible args
def flexible(*args, **kwargs):
    print("Positional:", args)
    print("Keyword:", kwargs)
    return sum(args)

flexible(1, 2, 3, user="bob", count=5)

Example 3: Closures for factory
def make_multiplier(factor):
    def mul(x):
        return x * factor
    return mul

times3 = make_multiplier(3)

Example 4: Simple cache decorator (closure + dict)
def cache(func):
    stored = {}
    def wrapper(n):
        if n in stored:
            return stored[n]
        val = func(n)
        stored[n] = val
        return val
    return wrapper

@cache
def fib(n):
    if n < 2: return n
    return fib(n-1) + fib(n-2)

Example 5: Logging decorator
def log_calls(func):
    def wrapper(*a, **k):
        print(f"Calling {func.__name__} with {a} {k}")
        res = func(*a, **k)
        print(f"{func.__name__} returned {res}")
        return res
    return wrapper

Example 6: *args for sum and average
def stats(*numbers):
    return {"sum": sum(numbers), "avg": sum(numbers)/len(numbers) if numbers else 0}

Example 7: **kwargs to build dict config
def configure(**options):
    defaults = {"debug": False, "port": 3000}
    defaults.update(options)
    return defaults

Example 8: Decorator with args (higher order)
def repeat(n):
    def decorator(func):
        def wrapper(*a, **k):
            last = None
            for _ in range(n):
                last = func(*a, **k)
            return last
        return wrapper
    return decorator

@repeat(3)
def greet(name): print("Hi", name); return name

Example 9: Generator function as "function that produces"
def countdown(n):
    while n > 0:
        yield n
        n -= 1

for x in countdown(5): print(x)

LINE-BY-LINE and notes:
- Decorators are syntax sugar for func = decorator(func)
- Closures capture variables from enclosing scope
- * collects into tuple, ** collects into dict
- Default args gotchas (use None + inside)

EXPANDED PROBLEMS (8+):
1. Write @memoize that works for any hashable args.
2. @retry(max_attempts=3) decorator for flaky functions.
3. Create make_adder and make_subtractor factories.
4. Implement a function that returns different operation functions based on string ("add", "mul").
5. Write a decorator that counts how many times a function was called (use closure).
6. Build a simple validate_types decorator using **kwargs hints.
7. Convert a list of numbers to running totals using a generator func.
8. Combine *args and **kwargs to implement a flexible print_table function.

This file is now 4x longer with practical decorator + closure patterns.
"""
