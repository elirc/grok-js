/*
THINK-PREDICT STYLE: C# Variables & Data Types

Predict before running!
*/

using System;

class Program {
    static void Main() {
        string name = "Sam";
        Console.WriteLine(name);
        name = "Alex";
        Console.WriteLine(name);

        // PREDICT: what about var vs explicit?
        var age = 25;
        // age = "hello"; // ?

        int x = 5;
        int y = x;
        y = 99;
        Console.WriteLine(x);  // Predict this

        Console.WriteLine("Think about value vs reference types (int vs string/class)");
    }
}
