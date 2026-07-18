"""
BEGINNER GOAL:
Understand iterators and generators — powerful tools for working with sequences lazily.

REAL WORLD USE CASE:
Processing large files or data streams without loading everything into memory at once.

CONCEPTS COVERED:
- The iterator protocol (__iter__, __next__)
- Generators with yield
- Generator expressions
- When to use generators
"""

# ============================================
# STEP 1: Generator function
# ============================================

def count_up_to(max):
    count = 1
    while count <= max:
        yield count
        count += 1

for num in count_up_to(5):
    print(num)

# ============================================
# STEP 2: Generator expression (lazy)
# ============================================

squares = (x ** 2 for x in range(1000000))   # Doesn't create the list yet

print(next(squares))   # 0
print(next(squares))   # 1

# ============================================
# STEP 3: Why generators are useful
# ============================================

def read_large_file(file_path):
    with open(file_path) as f:
        for line in f:
            yield line.strip()

# Process one line at a time instead of loading the whole file


"""
LINE-BY-LINE BREAKDOWN:

yield count
- Pauses the function and returns a value
- Next time you call next(), it resumes from here

(x ** 2 for x in ...)
- Generator expression (like list comprehension but lazy)

next(squares)
- Manually gets the next value from the generator

NOOB TRANSLATION:

A generator is like a factory that produces items one at a time when you ask for them.
Very memory efficient for big data.

COMMON MISTAKES:

1. Forgetting that generators can only be consumed once
2. Using a generator when you need to access items multiple times
3. Confusing generators with regular functions

TRY CHANGING THIS:

1. Write a generator that yields even numbers up to a limit.
2. Use a generator expression to filter a large range.
3. Consume a generator with list() and see the difference.

MINI CHALLENGE:

Create an infinite generator that yields Fibonacci numbers.
Print the first 10 using a loop and next().
"""
