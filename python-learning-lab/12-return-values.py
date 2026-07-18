"""
BEGINNER GOAL:
Learn how functions can send information back using the return statement.
Return values let functions produce results that other code can use.

REAL WORLD USE CASE:
- Calculate totals and give the number back
- Format names and return the string
- Check conditions and return True/False
- Get data and return it

CONCEPTS COVERED:
- The return keyword
- Returning multiple values
- None (when nothing is returned)
- Using returned values
"""

# ============================================
# STEP 1: Basic return
# ============================================

def add(a, b):
    return a + b

result = add(5, 3)
print(result)   # 8

# ============================================
# STEP 2: Returning multiple values
# ============================================

def get_name_parts(full_name):
    parts = full_name.split()
    return parts[0], parts[-1]

first, last = get_name_parts("Maria Lopez")
print(first, last)   # Maria Lopez

# ============================================
# STEP 3: Early return
# ============================================

def is_adult(age):
    if age < 0:
        return False
    return age >= 18

print(is_adult(25))   # True
print(is_adult(-5))   # False

# ============================================
# STEP 4: Functions that return None
# ============================================

def greet(name):
    print(f"Hello {name}")
    # No return → returns None

result = greet("Alex")
print(result)   # None


"""
LINE-BY-LINE BREAKDOWN:

return a + b
- Immediately ends the function and sends the value back

first, last = get_name_parts(...)
- Unpacking the tuple returned by the function

if age < 0:
    return False
- Early return: stop as soon as we know the answer

No return statement
- The function returns None by default

NOOB TRANSLATION:

return is how a function gives you an answer.
Without return, the function just does work but doesn't give anything back.

COMMON MISTAKES:

1. Forgetting to use the returned value
2. Having code after a return that never runs
3. Returning different types in different situations without documenting it

TRY CHANGING THIS:

1. Write a function square(n) that returns n squared.
2. Make a function that returns both the sum and difference of two numbers.
3. Add early returns to a function that validates a username.

MINI CHALLENGE:

Write a function get_grade(score) that returns:
- "A" if >= 90
- "B" if >= 80
- "C" if >= 70
- "F" otherwise

Call it with different scores.
"""
