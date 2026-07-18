"""
BUG HUNT Comprehensions
"""
# Common mistake: side effects inside comprehension
result = [print(x) for x in range(3)]  # returns list of None
print(result)

# Also nested scope surprises
"""Keep comprehensions pure when possible"""
