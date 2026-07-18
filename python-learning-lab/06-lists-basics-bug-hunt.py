"""
BUG HUNT: Python Lists
"""

lst = [1,2]
# Common: lst = lst + [3] vs lst.append
result = lst.append(3)
print(result)  # None ! append returns None

# Also index error when off by one
print(lst[3])
