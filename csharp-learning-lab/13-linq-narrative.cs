/*
NARRATIVE C# LINQ: Powerful queries on snack data
*/
var week = new[] {2.5m, 1m, 4m};
var avg = week.Average();
var under3 = week.Where(p => p < 3).ToList();
Console.WriteLine($"Average spend {avg}. Under budget days: {under3.Count}");
Console.WriteLine("LINQ turns raw numbers into insight for the story.");
