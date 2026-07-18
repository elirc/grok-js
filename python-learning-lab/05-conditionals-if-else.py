"""
BEGINNER GOAL:
Learn how to make decisions in code using if, elif, and else.
This lets your program do different things depending on conditions.

REAL WORLD USE CASE:
- Show "Log in" or "Log out" button
- Display "In stock" or "Out of stock"
- Apply different shipping costs
- Show different messages based on user role

CONCEPTS COVERED:
- if / elif / else
- Writing conditions
- Nested conditionals
- Using comparison and logical operators
"""

# ============================================
# STEP 1: Basic if statement
# ============================================

age = 17

if age >= 18:
    print("You can vote.")
else:
    print("Sorry, too young to vote.")
# Output: Sorry, too young to vote.

# ============================================
# STEP 2: elif chain
# ============================================

score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

print(f"Grade: {grade}")  # B

# ============================================
# STEP 3: Logical operators in conditions
# ============================================

has_email = True
has_password = True

if has_email and has_password:
    print("Account can be created.")

is_weekend = False
is_holiday = True

if is_weekend or is_holiday:
    print("You can relax!")

# ============================================
# STEP 4: Nested if
# ============================================

is_admin = True
is_active = True

if is_admin:
    print("Admin panel available.")
    if is_active:
        print("You can edit content.")


"""
LINE-BY-LINE BREAKDOWN:

if age >= 18:
- Starts a conditional block
- The code inside runs only if the condition is True

elif score >= 80:
- Checked only if previous if/elif was False

else:
- Runs if none of the above conditions were True

has_email and has_password
- Combines two boolean conditions

if is_admin:
    if is_active:
- Nested conditional — the inner one only runs if the outer is True

NOOB TRANSLATION:

if/elif/else is like following a flowchart:
" If this is true, do this.
  Otherwise, if this other thing is true, do that.
  Otherwise, do the default thing."

COMMON MISTAKES:

1. Using = instead of == in conditions
2. Forgetting the colon : after if/elif/else
3. Indentation errors (Python cares about spaces)
4. Writing conditions that overlap incorrectly

TRY CHANGING THIS:

1. Change score to different values and see which grade is assigned.
2. Create a temperature variable and print messages for hot/warm/cold using if/elif/else.
3. Add a variable has_promo and modify the discount logic.

MINI CHALLENGE:

Write code that decides the message for a user:
- Under 13 → "Sorry, you must be at least 13"
- 13-17 → "Welcome, teen user!"
- 18+ and logged in → "Welcome back!"
- Otherwise → "Please log in"

Use at least one elif.
"""
