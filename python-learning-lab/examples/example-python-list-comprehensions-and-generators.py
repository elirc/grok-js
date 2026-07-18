"""
Example: List Comprehensions and Generator Expressions in Python

Concise ways to build and process sequences.
"""

numbers = [1, 2, 3, 4, 5, 6]

# Build a list of squares for even numbers
squares = [n * n for n in numbers if n % 2 == 0]
print("Even squares:", squares)

# Generator expression - lazy, memory efficient
total = sum(n * n for n in range(1000000) if n % 2 == 0)
print("Large sum computed without building huge list in memory")

# Dictionary comprehension
name_lengths = {name: len(name) for name in ["alex", "sam", "jordan"]}
print(name_lengths)

"""
The list comprehension reads left to right almost like English: "for each n in numbers, if n is even, compute n squared and collect the results."

The generator expression looks almost identical but uses parentheses instead of brackets. It produces values on demand instead of materializing the entire list at once. For very large ranges or when you only need to consume the values once (as sum does), generators save both memory and time.

Dictionary comprehensions follow the same pattern and are extremely useful for reshaping data from one form to another.

A junior Python engineer should prefer these over explicit for loops when the transformation is simple and the intent is clear. When the logic gets complicated, fall back to a regular for loop with early continues or helper functions for readability.
"""
