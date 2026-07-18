"""
BEGINNER GOAL:
Learn how to create your own data types using classes and objects.

REAL WORLD USE CASE:
Modeling real things: users, products, orders, bank accounts, game characters.

CONCEPTS COVERED:
- Defining a class
- The __init__ method (constructor)
- Attributes (data)
- Methods (behavior)
- Creating and using objects (instances)
"""

# ============================================
# STEP 1: Defining a simple class
# ============================================

class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        return f"Hi, I'm {self.name} and I'm {self.age} years old."

# ============================================
# STEP 2: Creating objects
# ============================================

p1 = Person("Alex", 28)
p2 = Person("Sam", 31)

print(p1.greet())
print(p2.name)

# ============================================
# STEP 3: Adding more behavior
# ============================================

class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        return self.balance

    def withdraw(self, amount):
        if amount > self.balance:
            return "Insufficient funds"
        self.balance -= amount
        return self.balance


"""
LINE-BY-LINE BREAKDOWN:

class Person:
- Starts the definition of a new class (blueprint)

def __init__(self, name, age):
- Special method that runs when you create a new object
- self refers to the object being created

self.name = name
- Stores the value as an attribute on the object

p1 = Person("Alex", 28)
- Creates a new Person object (instance)

p1.greet()
- Calls a method on the object

NOOB TRANSLATION:

A class is the cookie cutter.
An object is the cookie you bake with it.

__init__ is the setup instructions that run when you make a new cookie.

COMMON MISTAKES:

1. Forgetting self in method definitions
2. Not calling the parent __init__ when inheriting
3. Confusing class attributes with instance attributes

TRY CHANGING THIS:

1. Add a method to Person called is_adult() that returns True if age >= 18.
2. Create a Car class with make, model, and year.
3. Add a method to BankAccount that shows the balance nicely formatted.

MINI CHALLENGE:

Create a class Product with name, price, and quantity.
Add methods:
- total_value() → price * quantity
- sell(quantity) → reduces stock and returns success/failure message
Create two products and test the methods.
"""
