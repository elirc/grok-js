"""
BEGINNER GOAL:
Learn how to organize your code into modules and packages.

REAL WORLD USE CASE:
Splitting large programs into smaller, reusable files. Importing code from other files or libraries.

CONCEPTS COVERED:
- Creating and importing modules
- The if __name__ == "__main__" pattern
- Packages (folders with __init__.py)
- Relative vs absolute imports
"""

# ============================================
# STEP 1: Importing
# ============================================

import math
from datetime import datetime
import random as rnd

print(math.sqrt(16))
print(datetime.now())

# ============================================
# STEP 2: Your own module
# ============================================

# In helpers.py:
# def greet(name):
#     return f"Hello {name}"

# In main.py:
# from helpers import greet
# print(greet("Alex"))

# ============================================
# STEP 3: if __name__ == "__main__"
# ============================================

def main():
    print("Running as main program")

if __name__ == "__main__":
    main()


"""
LINE-BY-LINE BREAKDOWN:

import math
- Imports the whole math module

from datetime import datetime
- Imports only the datetime class

import random as rnd
- Imports with an alias

if __name__ == "__main__":
- Runs only when the file is executed directly (not imported)

NOOB TRANSLATION:

Modules are just .py files.
You can import functions and variables from other files.

The if __name__ block lets a file act differently when run directly vs imported.

COMMON MISTAKES:

1. Circular imports
2. Forgetting __init__.py in older Python versions (mostly not needed in 3.3+)
3. Using from module import * (pollutes namespace)

TRY CHANGING THIS:

1. Create a helpers.py with a function and import it.
2. Use the if __name__ pattern in a small script.
3. Import something with an alias.

MINI CHALLENGE:

Create two files:
- math_utils.py with add() and multiply()
- main.py that imports and uses them

Run main.py directly.
"""
