"""
BUG HUNT Generators
"""
# Consuming generator twice
g = (x for x in range(3))
print(list(g))
print(list(g)) # empty second time
print("Generators are single use iterators.")
