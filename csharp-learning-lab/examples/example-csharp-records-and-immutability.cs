/*
Example: Records for Immutable Data in C#
*/

public record Person(string FirstName, string LastName, int Age);

public record Employee(string FirstName, string LastName, int Age, string Department) 
    : Person(FirstName, LastName, Age);

var original = new Person("Alex", "Rivera", 29);
var updated = original with { Age = 30 };

Console.WriteLine(original);
Console.WriteLine(updated);

/*
Records are reference types that provide value-based equality, a nice ToString(), and non-destructive mutation via the "with" expression.

The "with" keyword creates a new record instance that is a copy of the original except for the properties you list. This is the idiomatic way to update immutable data in C#.

Because records use value equality, two different record instances with the same data are considered equal. This is extremely useful when working with collections, dictionaries, and testing.

A junior C# engineer should reach for record instead of class when modeling DTOs, configuration, or any data that should be treated as a value rather than an entity with identity and behavior.
*/
