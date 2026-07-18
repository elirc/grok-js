/*
BUG HUNT LINQ
*/
// Multiple enumeration of IEnumerable (side effects or db queries run multiple times)
// Forgetting ToList() when you need to iterate twice
// Using First() instead of FirstOrDefault()
Console.WriteLine("LINQ bugs are often about execution timing and materialization.");
