/*
Example: LINQ Pipelines for Declarative Data Processing
*/

var orders = new[] {
    new { Id = 1, Amount = 120m, Status = "shipped", CustomerId = 42 },
    new { Id = 2, Amount = 45m, Status = "pending", CustomerId = 42 },
    new { Id = 3, Amount = 300m, Status = "shipped", CustomerId = 7 }
};

var highValueShipped = orders
    .Where(o => o.Status == "shipped" && o.Amount > 100)
    .OrderByDescending(o => o.Amount)
    .Select(o => new { o.Id, o.Amount })
    .ToList();

Console.WriteLine(string.Join(", ", highValueShipped));

/*
LINQ methods are extension methods that operate on IEnumerable<T>. Each method returns a new sequence (or a single value), enabling a fluent pipeline style.

Where filters, OrderBy sorts, and Select projects into a different shape. Nothing is executed until you materialize with ToList, ToArray, First, Sum, etc. This deferred execution is important to understand.

Because the operations are composable and each step is a pure transformation, the code reads like a description of the result you want rather than instructions for how to loop and build it.

A junior should become fluent in the common LINQ operators (Where, Select, SelectMany, GroupBy, OrderBy, Aggregate) and recognize when a LINQ pipeline is clearer than an imperative loop.
*/
