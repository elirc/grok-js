"""
BEGINNER GOAL:
Get familiar with some of the most useful modules in Python's standard library.

REAL WORLD USE CASE:
You don't need to install anything for many common tasks: dates, random, JSON, CSV, HTTP, etc.

CONCEPTS COVERED:
- datetime
- collections (Counter, defaultdict)
- itertools
- pathlib
- json, csv, urllib
"""

from datetime import datetime, timedelta
from collections import Counter
from pathlib import Path
import json

# ============================================
# STEP 1: datetime
# ============================================

now = datetime.now()
print(now.strftime("%Y-%m-%d %H:%M"))

tomorrow = now + timedelta(days=1)
print(tomorrow.date())

# ============================================
# STEP 2: collections.Counter
# ============================================

words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
count = Counter(words)
print(count)                    # Counter({'apple': 3, 'banana': 2, 'cherry': 1})
print(count.most_common(2))

# ============================================
# STEP 3: pathlib (modern file handling)
# ============================================

path = Path("data") / "notes.txt"
print(path)
print(path.exists())

# ============================================
# STEP 4: json (already seen, but important)
# ============================================

data = {"name": "Alex", "skills": ["Python", "JavaScript"]}
print(json.dumps(data, indent=2))


"""
LINE-BY-LINE BREAKDOWN:

datetime.now()
- Gets current date and time

Counter(words)
- Counts how many times each item appears

Path("data") / "notes.txt"
- Modern, cross-platform way to build paths

json.dumps(..., indent=2)
- Pretty-prints JSON

NOOB TRANSLATION:

Python comes with a huge toolbox called the standard library.
These modules solve very common problems so you don't have to reinvent them.

COMMON MISTAKES:

1. Writing your own date parsing instead of using datetime
2. Using old os.path instead of pathlib
3. Reimplementing Counter or defaultdict

TRY CHANGING THIS:

1. Use timedelta to calculate a date 30 days ago.
2. Count the frequency of letters in a sentence using Counter.
3. Use pathlib to list all .py files in the current directory.

MINI CHALLENGE:

Use the standard library to:
- Get today's date
- Add 7 days
- Format it as "Month Day, Year"
- Save it to a JSON file
- Read it back and print it
"""
