"""
BEGINNER GOAL:
Learn what variables are, why we use them, and how to create and change values in Python.
This is the absolute first building block of every program.

REAL WORLD USE CASE:
Every single Python program or script stores information using variables.
- A login script stores the username in a variable
- A shopping cart script stores the number of items in a variable
- A weather script stores the current temperature in a variable
- Your bank balance, your profile name, the number of unread messages — all variables

CONCEPTS COVERED:
- What a variable is
- Creating variables with assignment
- Assigning values (strings, numbers, booleans)
- Reading / using the value of a variable
- Reassigning values (changing them later)
- Why we use variables instead of hardcoding values everywhere
- Dynamic typing in Python
"""

# ============================================
# STEP 1: Creating your first variables
# ============================================

# In Python, you don't need to declare the type.
# You just assign a value using the = sign.
# Python figures out the type automatically (dynamic typing).

user_name = "Alex"   # This creates a variable called user_name and puts the string "Alex" inside it.

# Now when we use user_name, Python will give us back the value "Alex".
print(user_name)
# Output: Alex

# We can create a variable and give it a value in one line.
# This is the most common way.
user_age = 22
# user_age is now a variable that holds the integer 22

is_logged_in = True
# is_logged_in is a variable that holds the boolean value True

# ============================================
# STEP 2: Using variables in real code
# ============================================

# Variables let us write code that is easy to read and change.
# Instead of writing "Alex" in 10 different places, we store it once.

# Here we are using the variables inside an f-string (formatted string).
welcome_message = f"Hello, {user_name}! You are {user_age} years old."
print(welcome_message)
# Output: Hello, Alex! You are 22 years old.

# If the user changes their age, we only have to update one place.
user_age = 23
# We changed the value inside the user_age variable from 22 to 23
print("Updated age:", user_age)
# Output: Updated age: 23

# ============================================
# STEP 3: Constants (by convention)
# ============================================

# Python does not have true constants like some languages.
# By convention, we use UPPER_SNAKE_CASE for values that should never change.
# This is just a naming hint to other developers (and yourself).

BIRTH_YEAR = 2002
# birth_year will "always" be 2002 in this program.
# You *can* change it, but you shouldn't.

APP_NAME = "Python Learning Lab"
print(APP_NAME)
# Output: Python Learning Lab

# ============================================
# STEP 4: Why variables matter
# ============================================

# Without variables we would have to repeat values everywhere.
# That makes code hard to update and easy to make mistakes.

# Bad way (repeating the same value):
print("Welcome back, Alex")
print("Alex has 5 items in cart")
print("Profile for Alex")

# Good way (using variables):
current_user = "Alex"
cart_count = 5

print(f"Welcome back, {current_user}")
print(f"{current_user} has {cart_count} items in cart")
print(f"Profile for {current_user}")

# If we want to change the user, we only edit current_user once.
# The rest of the code automatically uses the new name.

# ============================================
# STEP 5: Different types of values we can store
# ============================================

favorite_color = "blue"        # str (string / text)
number_of_friends = 12         # int (integer)
account_balance = 123.45       # float (decimal number)
has_premium_account = False    # bool (True or False)
nothing_here_yet = None        # NoneType (represents "nothing" or "no value")

print("Color:", favorite_color)
print("Friends:", number_of_friends)
print("Balance:", account_balance)
print("Has Premium:", has_premium_account)
print("Nothing here:", nothing_here_yet)


"""
LINE-BY-LINE BREAKDOWN:

user_name = "Alex"
- The = operator assigns the value on the right to the name on the left.
- This creates (or updates) the variable.

print(user_name)
- Calls the built-in print function.
- It outputs the current value stored in the variable user_name.

welcome_message = f"Hello, {user_name}! ..."
- This is an f-string (formatted string literal).
- {user_name} is replaced with the actual value at runtime.

user_age = 23
- Reassigns a new value to an existing variable.
- The old value 22 is replaced.

BIRTH_YEAR = 2002
- UPPER_SNAKE_CASE is the convention for "constants" in Python.
- Python won't stop you from changing it, but other developers will know not to.

favorite_color = "blue"
- Python is dynamically typed. We don't say "str favorite_color".
- The type is determined by the value on the right side.

NOOB TRANSLATION:

Imagine variables as labeled boxes.
- You can write a name on the box (user_name)
- You can put something inside the box ("Alex")
- Later you can take that thing out and look at it
- You can even replace what's inside the box with something else
- Python doesn't care what type of thing is in the box until you run the code

Variables let your program remember information so it can use it later.

COMMON MISTAKES:

1. Using a variable before giving it a value (NameError)
2. Misspelling the variable name (Python is case-sensitive: user_name vs User_Name)
3. Thinking variables in Python work exactly like in other languages (Python is dynamically typed)
4. Using = when you meant to compare (use == for comparison)

TRY CHANGING THIS:

1. Change the value assigned to user_name from "Alex" to your own name. Then re-run and see how the welcome message updates.

2. Add 5 to user_age using user_age = user_age + 5 and see what the new value becomes.

3. Create a new variable called favorite_food and give it a string value. Then use print to print a sentence that includes it.

MINI CHALLENGE:

Create three variables:
- One called pet_name that stores a pet's name
- One called pet_age that stores how old the pet is
- One called is_adopted that stores True or False

Then print one sentence that uses all three variables.
Example output: "My pet Luna is 3 years old. Adopted: True"
"""
