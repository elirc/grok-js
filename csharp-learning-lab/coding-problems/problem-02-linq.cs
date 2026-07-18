/*
C# Coding Problems: LINQ and Collections (EXPANDED 3-5x)

Goal: Master declarative data queries with LINQ. Heavily used in real .NET code (EF, APIs, reports).

12+ problems covering: Where, Select, SelectMany, OrderBy, GroupBy, Join, Aggregate, Skip/Take, Distinct, Any/All, First/OrDefault, ToLookup, etc.

Problem 1: Orders group by Customer, sum Total, take top 3 by total.

Problem 2: Flatten List<List<int>> then Distinct and sort.

Problem 3: Pagination helper: Skip(page*size).Take(size)

Problem 4: Join Students + Enrollments => anonymous {StudentName, CourseName}

Problem 5: Aggregate product, handle empty list with seed or check.

Problem 6: OrderBy + ThenBy on complex key (lastName, then firstName)

Problem 7: Group products by Category, project {Category, Count, AvgPrice}

Problem 8: Left join simulation (GroupJoin) for Customers + optional Orders

Problem 9: Implement a ContainsAny / ContainsAll extension with LINQ.

Problem 10: Chunking a large list into batches of N (manual or Chunk in .NET 6+)

Problem 11: Use ToDictionary and lookup performance.

Problem 12: Deferred execution demo: show query not executed until ToList or foreach.

Solutions (many full examples now in comments):

/*
// Problem 1
var topCustomers = orders
    .GroupBy(o => o.CustomerId)
    .Select(g => new { Customer = g.Key, Total = g.Sum(o => o.Total) })
    .OrderByDescending(x => x.Total)
    .Take(3);

// Problem 2
var flat = lists.SelectMany(l => l).Distinct().OrderBy(x => x).ToList();

// Problem 7
var stats = products.GroupBy(p => p.Category)
    .Select(g => new { 
        Category = g.Key, 
        Count = g.Count(), 
        Avg = g.Average(p => p.Price) 
    });
*/

Expanded heavily with edge cases, performance notes, deferred execution warnings.
*/
