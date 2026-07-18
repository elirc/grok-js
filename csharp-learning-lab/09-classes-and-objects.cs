/*
BEGINNER GOAL:
Understand classes as blueprints and objects as instances.

REAL WORLD USE CASE:
Modeling real-world things: users, products, orders, employees.

CONCEPTS COVERED:
- Defining a class
- Creating objects with new
- Fields, properties, methods
- Constructors
*/

// ============================================
// STEP 1: Simple class
// ============================================

public class Person
{
    public string Name { get; set; } = "";
    public int Age { get; set; }

    public void Introduce()
    {
        Console.WriteLine($"Hi, I'm {Name}");
    }
}

// ============================================
// STEP 2: Creating and using objects
// ============================================

Person p = new Person
{
    Name = "Alex",
    Age = 28
};

p.Introduce();

// ============================================
// STEP 3: Constructor
// ============================================

public class Book
{
    public string Title { get; }
    public string Author { get; }

    public Book(string title, string author)
    {
        Title = title;
        Author = author;
    }
}

/*
LINE-BY-LINE BREAKDOWN:

public class Person
- Blueprint for creating Person objects

public string Name { get; set; }
- Property with getter and setter

new Person { ... }
- Creates a new instance (object) in memory

public Book(string title, string author)
- Special method that runs when you create the object

NOOB TRANSLATION:

A class is the cookie cutter.
An object is the cookie you make with it.

COMMON MISTAKES:

1. Forgetting to use 'new'.
2. Making everything public.
3. Not initializing properties.

TRY CHANGING THIS:

1. Add a method to the Person class.
2. Create multiple Person objects.
3. Add a constructor to Person.

MINI CHALLENGE:

Create a class called Car with properties Make, Model, Year.
Add a method DisplayInfo().
Create two different cars.
*/