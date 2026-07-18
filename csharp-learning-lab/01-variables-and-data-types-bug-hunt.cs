/*
BUG HUNT: C# Variables
*/

using System;

class Program {
    static void Main() {
        // Case: value type vs ref type surprise
        int a = 10;
        int b = a;
        b = 99;
        Console.WriteLine(a); // 10

        // Now with a class (reference)
        // Person p1 = new() { Name = "Sam" };
        // Person p2 = p1;
        // p2.Name = "Alex";
        // Console.WriteLine(p1.Name); // ?

        Console.WriteLine("Bug hunt lesson: structs value copied, classes reference shared.");
    }
}
