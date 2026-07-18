"""
THINK-PREDICT Comprehensions + Generators
"""
squares = (n*n for n in range(5))  # generator expr
print(list(squares))
# Predict memory and laziness differences
"""End"""