/*
THINK-PREDICT C# Conditionals
*/
using System;
class Program {
  static void Main() {
    int score = 82;
    if (score >= 90) Console.WriteLine("A");
    else if (score >= 80) Console.WriteLine("B");
    else Console.WriteLine("C");

    // Predict switch fallthrough (C# 8+ has better patterns)
    string role = "admin";
    switch (role) {
      case "admin":
        Console.WriteLine("admin");
        break;
      default:
        Console.WriteLine("user");
        break;
    }
  }
}
