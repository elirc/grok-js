"""
NARRATIVE: Handling bad user input in SnackLog
"""
try:
    price = float(input("Price? "))
except ValueError:
    price = 0
    print("Defaulted to 0. Story continues safely.")
print("Error handling keeps the user story from crashing on bad data.")
