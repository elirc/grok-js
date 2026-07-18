"""
BUG HUNT: Python Strings
"""

# Common: confusing str methods that return new values
s = "hi"
s.upper()
print(s)  # still "hi"

# Fix: s = s.upper()

# f-string vs concat errors
age = 30
msg = "Age: " + age   # TypeError
# msg = f"Age: {age}"

print("Remember: strings immutable + types in concat")