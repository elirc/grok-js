"""
THINK-PREDICT: Python Error Handling
"""
try:
    x = int("abc")
except ValueError as e:
    print("caught", type(e))
except Exception:
    print("other")

# Predict what finally always does
"""End"""