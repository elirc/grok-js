/*
BEGINNER GOAL:
Learn how classes can inherit behavior from other classes.

REAL WORLD USE CASE:
Sharing common logic between similar types (Employee and Manager, Animal and Dog).

CONCEPTS COVERED:
- Base class and derived class
- virtual and override
- base keyword
- is and as operators
*/

// ============================================
// STEP 1: Base class
// ============================================

public class Animal
{
    public virtual void MakeSound()
    {
        Console.WriteLine("Some sound");
    }
}

// ============================================
// STEP 2: Derived class
// ============================================

public class Dog : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("Woof!");
    }
}

// ============================================
// STEP 3: Using inheritance
// ============================================

Animal pet = new Dog();
pet.MakeSound(); // Woof!

/*
LINE-BY-LINE BREAKDOWN:

public class Dog : Animal
- Dog inherits from Animal

public override void MakeSound()
- Replaces the behavior from the base class

virtual
- Allows overriding in derived classes

base keyword can be used to call the parent version.

NOOB TRANSLATION:

Inheritance = "is a" relationship.
A Dog is an Animal, so it gets everything Animal has, plus its own stuff.

COMMON MISTAKES:

1. Overusing inheritance instead of composition.
2. Forgetting override keyword.
3. Making base classes too big.

TRY CHANGING THIS:

1. Add a Cat class that overrides MakeSound.
2. Add a property in the base class.

MINI CHALLENGE:

Create a Vehicle base class and Car + Motorcycle derived classes.
*/