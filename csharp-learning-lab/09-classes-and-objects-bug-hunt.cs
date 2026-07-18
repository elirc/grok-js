/*
BUG HUNT C# Classes
*/
using System;
class Snack { public string Name; }
class Program {
  static void Main() {
    Snack a = new() { Name = "old" };
    Snack b = a;
    b.Name = "new";
    Console.WriteLine(a.Name); // both changed

    // Another: forgetting to initialize properties or null ref
    Console.WriteLine("Reference assignment surprise same as JS/Python");
  }
}
