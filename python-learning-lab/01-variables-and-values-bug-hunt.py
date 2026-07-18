"""
BUG HUNT: Python Variables
"""

# Case: mutable default gotcha (famous)
def add_item(item, items=[]):
    items.append(item)
    return items

print(add_item("a"))
print(add_item("b"))  # surprise! shared list

# Fix: use None + inside function
def add_item_fixed(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

print("Bug hunt: mutable defaults are shared across calls")
