"""
BEGINNER GOAL:
Learn how to handle errors gracefully using try and except.
Good programs expect things to go wrong and know how to recover.

REAL WORLD USE CASE:
- User enters bad input
- File not found
- Network request fails
- Division by zero

CONCEPTS COVERED:
- try / except
- Multiple except blocks
- else and finally
- Raising exceptions
- Custom exceptions
"""

# ============================================
# STEP 1: Basic try-except
# ============================================

try:
    number = int(input("Enter a number: "))
    print(10 / number)
except ValueError:
    print("That's not a valid number!")
except ZeroDivisionError:
    print("You can't divide by zero!")

# ============================================
# STEP 2: else and finally
# ============================================

try:
    result = 10 / 2
except ZeroDivisionError:
    print("Error")
else:
    print("Success:", result)
finally:
    print("This always runs")

# ============================================
# STEP 3: Raising exceptions
# ============================================

def check_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    return age

try:
    check_age(-5)
except ValueError as e:
    print(e)


"""
LINE-BY-LINE BREAKDOWN:

try:
    ...
except ValueError:
    ...
- Try the code. If ValueError happens, run the except block.

else:
    ...
- Runs only if no exception occurred

finally:
    ...
- Always runs, even if there was an exception

raise ValueError(...)
- Manually creates and raises an exception

NOOB TRANSLATION:

try = "attempt this risky thing"
except = "if this specific error happens, do this instead"
finally = "do this no matter what"

COMMON MISTAKES:

1. Catching Exception instead of specific errors
2. Empty except blocks (swallowing errors)
3. Not using finally for cleanup (better to use 'with' for files)

TRY CHANGING THIS:

1. Add handling for KeyboardInterrupt.
2. Create a function that raises a custom error if input is too long.
3. Use else to print "Everything worked!" only on success.

MINI CHALLENGE:

Write a function get_positive_number() that:
- Asks the user for input
- Keeps asking until they enter a valid positive number
- Uses try/except
- Returns the number
"""
