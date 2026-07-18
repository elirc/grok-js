"""
THINK-PREDICT: List Comprehensions
"""
nums = [1,2,3,4]
squares = [n*n for n in nums if n % 2 == 0]
print(squares)

pairs = [(x,y) for x in range(2) for y in range(2)]
print(pairs)
"""Predict the output of several comprehensions"""