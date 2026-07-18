"""
Advanced Strings, Formatting, Unicode, Parsing, Building in Python (EXPANDED 3-5x)

10+ practical examples + edge cases + mini exercises.

Example 1: Rich f-strings
name = "Alice"
age = 30
price = 19.99
print(f"{name=}, {age=}")                # debug style (3.8+)
print(f"{price:>10.2f}")                 # right align width 10
print(f"{age:03d}")                      # zero pad

Example 2: Method chaining for cleaning
text = "   Hello, WORLD!!   "
clean = text.strip().lower().replace("world", "python").replace("!", "")
print(clean)

Example 3: Split / join / partition
csv = "a,b,c,d"
parts = csv.split(",")
print(" | ".join(parts))
head, _, tail = "user@domain.com".partition("@")

Example 4: Encoding / decoding roundtrips
s = "café résumé"
utf = s.encode("utf-8")
print(utf)
print(utf.decode("utf-8"))

# common errors
try:
    "café".encode("ascii")
except UnicodeEncodeError as e:
    print("Encoding error:", e)

Example 5: Advanced slicing + step
s = "PythonProgrammingLanguage"
print(s[0:6])     # Python
print(s[6:17])    # Programming
print(s[::3])     # PhoaiLg
print(s[-8:])     # Language
print(s[::-1])    # reversed whole

Example 6: .format() and named placeholders
print("{user} scored {score:.1%}".format(user="Bob", score=0.875))

Example 7: str methods for validation
def is_valid_username(u):
    return u.isalnum() and 3 <= len(u) <= 20

Example 8: Building large strings efficiently (join vs +)
parts = []
for i in range(100):
    parts.append(str(i))
big = "".join(parts)

Example 9: Template strings / safe substitution (basic)
from string import Template
t = Template("Hello $name, you have ${count} messages")
print(t.substitute(name="Sam", count=3))

Example 10: Regular expressions intro for strings (without importing re details)
# See later labs but quick:
import re
print(re.findall(r"\d+", "Order 42 and 100"))

EXPANDED PRACTICE (many):
1. Write a function that capitalizes every other word.
2. Parse "key1=val1;key2=val2" into dict.
3. Implement a basic CSV line escaper.
4. Count character frequency case-insensitively, ignore spaces.
5. Create a function that converts snake_case to camelCase and back.
6. Mask credit card numbers keeping last 4.
7. Implement a simple word wrap at N chars without breaking words.
8. Detect if string contains only unique chars.

Now 4-5x richer.
"""
