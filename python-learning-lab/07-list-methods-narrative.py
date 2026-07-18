"""
NARRATIVE: Managing daily snacks list
"""
snacks = []
snacks.append("apple")
if "chips" in snacks:
    snacks.remove("chips")
snacks.sort()
print("Current log length:", len(snacks))
print("List methods power the evolving snack log story.")
