/*
NARRATIVE C#: Cleaning input
*/
using System;
class Program {
  static void Main() {
    string raw = "   CHIPS ";
    string nice = raw.Trim().ToLower();
    Console.WriteLine($"Cleaned: {nice}");
    // Story uses string methods constantly for display + validation
  }
}
