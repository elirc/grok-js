/*
THINK-PREDICT C#: Classes & Objects
*/
using System;

class Snack {
  public string Name { get; set; }
  public decimal Price { get; set; }
}

class Program {
  static void Main() {
    var s = new Snack { Name = "chips", Price = 2.5m };
    Console.WriteLine(s.Name);
    s.Price = 3;
    Console.WriteLine(s.Price);

    // Predict reference behavior with another variable pointing to same object
  }
}
