/*
BUG HUNT C# Strings
*/
using System;
class Program {
  static void Main() {
    string s = "test";
    s.ToUpper(); // result ignored
    Console.WriteLine(s);

    // Also common: null vs empty
    string maybe = null;
    // Console.WriteLine(maybe.Length); crash

    Console.WriteLine("C# strings immutable + watch nulls");
  }
}
