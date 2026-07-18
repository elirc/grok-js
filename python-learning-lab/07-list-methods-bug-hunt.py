"""
BUG HUNT Python Lists
"""
items = ["milk"]
# wrong: thinking remove returns the item
removed = items.remove("milk")
print(removed)  # None

# Also common: modifying list while iterating
nums = [1,2,3]
for n in nums:
    if n > 1: nums.remove(n)
print(nums)  # unexpected result
