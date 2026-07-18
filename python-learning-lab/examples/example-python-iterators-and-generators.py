"""
Example: Custom Iterators and Generator Functions
"""

class Countdown:
    def __init__(self, start):
        self.current = start
    def __iter__(self):
        return self
    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

def countdown_gen(start):
    while start > 0:
        yield start
        start -= 1

"""
Any object with __iter__ returning an iterator (with __next__) can be used in for loops.

Generators are simpler: any function with yield is a generator factory. Each call to next() resumes execution until the next yield.

Generators are perfect for streaming data or producing infinite sequences without consuming memory.
"""
