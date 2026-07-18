"""
NARRATIVE Python: Quick derived lists
"""
prices = [2.5, 1.0, 4.0]
doubled = [p*2 for p in prices]
expensive = [p for p in prices if p > 2]
print("Comprehensions make derived reports in the story app easy and short.")
