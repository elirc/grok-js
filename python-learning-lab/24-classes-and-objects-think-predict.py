"""
THINK-PREDICT: Python Classes
"""
class Snack:
    def __init__(self, name, price):
        self.name = name
        self.price = price

s = Snack("chips", 2.5)
print(s.name)
s.price = 3
print(s.price)

# Predict: what is type(s)
print(type(s))
"""End"""