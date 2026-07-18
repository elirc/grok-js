/*
NARRATIVE C#: Snack rules
*/
using System;
class Program {
  static void Main() {
    int hour = 20;
    int hunger = 7;
    if (hour > 18 && hunger > 5) {
      Console.WriteLine("Small healthy snack allowed.");
    } else {
      Console.WriteLine("Stick to water.");
    }
    // The story now makes decisions based on time and state.
  }
}
