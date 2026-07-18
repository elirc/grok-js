"""
BEGINNER GOAL:
Learn how to read from and write to files in Python.

REAL WORLD USE CASE:
Saving user data, reading configuration, logging, processing CSV or text files.

CONCEPTS COVERED:
- open() function
- Reading and writing modes ('r', 'w', 'a')
- with statement (best practice)
- Reading lines
- JSON handling basics
"""

import json

# ============================================
# STEP 1: Writing to a file
# ============================================

with open("notes.txt", "w") as f:
    f.write("First line\n")
    f.write("Second line\n")

# ============================================
# STEP 2: Reading a file
# ============================================

with open("notes.txt", "r") as f:
    content = f.read()
    print(content)

# Read line by line
with open("notes.txt", "r") as f:
    for line in f:
        print(line.strip())

# ============================================
# STEP 3: Working with JSON
# ============================================

data = {"name": "Alex", "age": 28}

with open("data.json", "w") as f:
    json.dump(data, f, indent=2)

with open("data.json", "r") as f:
    loaded = json.load(f)
    print(loaded)


"""
LINE-BY-LINE BREAKDOWN:

with open("notes.txt", "w") as f:
- Opens file in write mode
- Automatically closes the file when done

f.write("...")
- Writes text to the file

for line in f:
- Iterates over lines in the file

json.dump(data, f)
- Writes Python object as JSON

json.load(f)
- Reads JSON and turns it into Python object

NOOB TRANSLATION:

open() is how you talk to files.
Always use 'with' so Python closes the file for you.

JSON is a common format for saving structured data.

COMMON MISTAKES:

1. Forgetting to close files (use with)
2. Opening in wrong mode ('w' overwrites, 'a' appends)
3. Not handling encoding for non-English text

TRY CHANGING THIS:

1. Append a new line to the notes file instead of overwriting.
2. Read a JSON file and print one value from it.
3. Write a list of dictionaries to a JSON file.

MINI CHALLENGE:

Create a simple todo saver:
- Write a list of todos to a JSON file
- Read them back
- Add a new todo and save again
"""
