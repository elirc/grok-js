"""
NARRATIVE Python: Snack as object
"""
class LoggedSnack:
    def __init__(self, name, price):
        self.name = name
        self.price = price
    def summary(self):
        return f"{self.name}: ${self.price}"

entry = LoggedSnack("apple", 0.8)
print(entry.summary())
print("Objects let the story represent real things cleanly.")
