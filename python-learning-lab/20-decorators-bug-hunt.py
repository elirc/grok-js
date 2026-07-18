"""
BUG HUNT Decorators
"""
# Forgetting to use functools.wraps (loses __name__ and docs)
# Stacking order matters
# Not handling *args **kwargs
print("Decorators are powerful but easy to get subtly wrong.")
