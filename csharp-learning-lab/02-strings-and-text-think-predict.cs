/*
THINK-PREDICT C#: Strings
*/
using System;
class Program {
  static void Main() {
    string s = "  Hi There ";
    Console.WriteLine(s.Trim().ToLower());
    Console.WriteLine(s); // predict immutability

    string name = "alex";
    Console.WriteLine(char.ToUpper(name[0]) + name.Substring(1));
  }
}
