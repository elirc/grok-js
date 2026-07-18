"""
THINK-PREDICT Decorators
"""
def timer(func):
    def wrapper(*a, **k):
        print("start")
        res = func(*a, **k)
        print("end")
        return res
    return wrapper

@timer
def work():
    return 42

print(work())
"""Predict wrapper behavior and when code runs"""
