/*
NARRATIVE C#: Modeling the snack
*/
using System;
class LoggedSnack {
  public string Name {get;set;}
  public decimal Price {get;set;}
  public string Summary() => $"{Name} costs {Price}";
}
class Program {
  static void Main() {
    var entry = new LoggedSnack { Name="chips", Price=2.5m };
    Console.WriteLine(entry.Summary());
  }
}
