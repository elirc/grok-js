/*
NARRATIVE: C# — Building SnackTrack in Console
Story: You are building a small console app to track snacks. Variables hold the current state.
*/

using System;

class Program {
    static void Main() {
        string userName = "Alex";
        string snack = "chips";
        decimal price = 2.49m;
        int count = 1;

        Console.WriteLine($"Welcome {userName}. First entry: {snack} @ {price}");
        count++;
        Console.WriteLine($"Now {count} snacks logged today.");

        // const for things that should not change in the app
        const string APP = "SnackTrack C# Edition";
        Console.WriteLine(APP);

        // Changing values moves the story forward
        snack = "apple";
        Console.WriteLine("Updated current snack to " + snack);
    }
}
