"""
BEGINNER GOAL:
Learn how to add type hints to your Python code to make it clearer and catch errors earlier.

REAL WORLD USE CASE:
Large codebases, team projects, better IDE support, and catching bugs before running the code.

CONCEPTS COVERED:
- Basic type hints (str, int, list, etc.)
- Using typing module
- Optional and Union
- Type hints on functions and variables
- Benefits (not enforced at runtime)
"""

from typing import List, Optional

# ============================================
# STEP 1: Function type hints
# ============================================

def greet(name: str) -> str:
    return f"Hello, {name}"

def add(a: int, b: int) -> int:
    return a + b

# ============================================
# STEP 2: Variable type hints
# ============================================

age: int = 28
name: str = "Alex"
scores: List[int] = [85, 92, 78]

# ============================================
# STEP 3: Optional values
# ============================================

def find_user(user_id: int) -> Optional[str]:
    if user_id == 1:
        return "Alex"
    return None


"""
LINE-BY-LINE BREAKDOWN:

name: str
- This variable should be a string (hint only)

def greet(name: str) -> str:
- Expects a string, returns a string

List[int]
- A list that contains only integers

Optional[str]
- Can be a string or None

NOOB TRANSLATION:

Type hints are like labels that tell you (and your editor) what kind of thing something should be.

Python itself doesn't stop you if you ignore the hints, but good editors will warn you.

COMMON MISTAKES:

1. Thinking type hints enforce types at runtime (they don't)
2. Using outdated typing syntax (from __future__ import annotations helps)
3. Adding type hints everywhere without understanding

TRY CHANGING THIS:

1. Add type hints to one of your earlier functions.
2. Use Optional and List in a small example.
3. Run mypy (if installed) on a file with type hints.

MINI CHALLENGE:

Add proper type hints to the Person class from earlier.
Include return types on methods.
Create a function that takes a list of Person and returns a list of names (List[str]).
"""
