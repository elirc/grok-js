"""
BEGINNER GOAL:
Learn what booleans are (True and False values). Understand how to compare values and create conditions.

REAL WORLD USE CASE:
Booleans are the "yes/no" of programming:
- Is the user logged in?
- Has the user paid?
- Is this product on sale?
- Should we show the "Add to Cart" button?

CONCEPTS COVERED:
- bool type (True / False)
- Comparison operators: ==, !=, >, <, >=, <=
- Logical operators: and, or, not
- Truthy and falsy values in Python
"""

# ============================================
# STEP 1: Boolean values
# ============================================

is_logged_in = True
has_paid = False

print(is_logged_in)   # True
print(type(has_paid)) # <class 'bool'>

# ============================================
# STEP 2: Comparisons create booleans
# ============================================

age = 19
minimum_age = 18

can_vote = age >= minimum_age   # True
print(can_vote)

print(age == 19)    # True (equal)
print(age != 18)    # True (not equal)

# ============================================
# STEP 3: Logical operators
# ============================================

has_email = True
has_password = False

can_create_account = has_email and has_password   # False (both must be True)
print(can_create_account)

is_weekend = False
is_holiday = True

can_rest = is_weekend or is_holiday   # True
print(can_rest)

# ============================================
# STEP 4: The not operator
# ============================================

is_active = True
print(not is_active)   # False

# ============================================
# STEP 5: Truthy and falsy values
# ============================================

# Many things are treated as False in conditions:
print(bool(0))        # False
print(bool(""))       # False
print(bool([]))       # False
print(bool(None))     # False

# Everything else is generally True
print(bool(1))        # True
print(bool("hello"))  # True


"""
LINE-BY-LINE BREAKDOWN:

is_logged_in = True
- Creates a boolean variable

age >= minimum_age
- Comparison operator returns a bool

has_email and has_password
- 'and' requires BOTH sides to be True

is_weekend or is_holiday
- 'or' is True if AT LEAST one side is True

not is_active
- Flips the boolean value

bool("")
- The bool() function shows what Python considers truthy/falsy

NOOB TRANSLATION:

Booleans answer yes/no questions.
Comparisons ask the question.
and, or, not let you combine answers.

Python is very flexible — many things can act like True or False in if statements.

COMMON MISTAKES:

1. Using = instead of == for comparison
2. Forgetting that "and" and "or" have different precedence
3. Assuming empty strings or 0 are always False without understanding context
4. Overcomplicating conditions instead of using clear variable names

TRY CHANGING THIS:

1. Change age to 17 and see how can_vote changes.
2. Create two booleans has_car and has_license. Use and/or to decide if someone can drive.
3. Print bool() on different values and observe the results.

MINI CHALLENGE:

A user wants premium content.
Rules:
- Must be logged in
- Must be at least 18
- OR must have a special access code (boolean)

Create the variables and use logical operators to decide if access should be granted.
Print "Access granted" or "Access denied".
"""
