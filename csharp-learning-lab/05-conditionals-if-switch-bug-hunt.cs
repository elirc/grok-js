/*
BUG HUNT C# Conditionals
*/
using System;
class Program {
  static void Main() {
    int x = 5;
    if (x = 10) { // not allowed in C# for bool context - compile error
    }

    // Common: forgetting break (older switch)
    // Also == vs = is caught by compiler mostly

    Console.WriteLine("C# is stricter than JS on many of these");
  }
}
