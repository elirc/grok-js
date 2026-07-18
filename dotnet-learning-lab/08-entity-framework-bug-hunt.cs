/*
BUG HUNT EF Core
Common: using DbContext as a singleton (it is scoped usually).
Forgetting to await async methods or not disposing.
N+1 query problem when loading related data without Include.
*/
Console.WriteLine("EF bug hunt teaches lifetime and query loading pitfalls.");
