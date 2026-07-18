"""
BUG HUNT Python Classes
"""
class Counter:
    count = 0   # class attr, shared!
    def inc(self):
        self.count += 1   # actually creates instance attr? careful

c1 = Counter()
c1.inc()
c2 = Counter()
print(c2.count)  # may surprise

# Fix use self.count = 0 in __init__
print("Class vs instance attribute mixup is very common bug")
