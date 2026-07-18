"""
BEGINNER GOAL:
Learn how classes can inherit behavior from other classes (inheritance) and how different classes can be used interchangeably (polymorphism).

REAL WORLD USE CASE:
Sharing common code between similar types (Employee/Manager, Animal/Dog, Payment methods).

CONCEPTS COVERED:
- Creating subclasses with (Parent)
- Overriding methods
- Using super()
- Polymorphism (same method, different behavior)
"""

# ============================================
# STEP 1: Base class
# ============================================

class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "Some sound"

# ============================================
# STEP 2: Inheritance
# ============================================

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

# ============================================
# STEP 3: Polymorphism
# ============================================

animals = [Dog("Rex"), Cat("Whiskers")]

for animal in animals:
    print(f"{animal.name} says {animal.speak()}")


"""
LINE-BY-LINE BREAKDOWN:

class Dog(Animal):
- Dog inherits everything from Animal

def speak(self):
- Overrides the method from the parent

for animal in animals:
- Treats Dog and Cat the same way because they both have speak()

NOOB TRANSLATION:

Inheritance = "Dog is a type of Animal"
You get all the Animal stuff for free, plus you can customize.

Polymorphism = "I don't care what kind of animal it is, as long as it can speak()"

COMMON MISTAKES:

1. Overusing inheritance instead of composition
2. Forgetting to call super().__init__() when needed
3. Deep inheritance chains that are hard to understand

TRY CHANGING THIS:

1. Add a Bird class that inherits from Animal.
2. Add a method to Animal that all subclasses inherit.
3. Use isinstance() to check the type.

MINI CHALLENGE:

Create a base class Vehicle with a method move().
Create Car and Bike that override move().
Put them in a list and call move() on each.
"""
