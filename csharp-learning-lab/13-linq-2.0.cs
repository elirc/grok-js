/*
JUNIOR GOAL:
Use LINQ efficiently and know when to drop down to loops or Span for performance.

REAL WORLD USE CASE:
Data transformation pipelines, reporting, and in-memory querying in services.

CONCEPTS COVERED:
- Deferred vs immediate execution
- Performance characteristics of LINQ
- LINQ to Objects vs EF Core translation
- Custom LINQ operators
- Avoiding multiple enumeration
*/

// ============================================
// STEP 1: Multiple enumeration
// ============================================

var query = items.Where(x => x > 10); // deferred

var count = query.Count();     // executes
var first = query.First();     // executes again!

// Fix:
var materialized = query.ToList();

// ============================================
// STEP 2: Performance sensitive code
// ============================================

// For hot paths, sometimes a simple for loop wins
for (int i = 0; i < data.Length; i++)
{
    // ...
}

// ============================================
// STEP 3: Custom operators
// ============================================

public static IEnumerable<T> WhereNotNull<T>(this IEnumerable<T?> source) 
    where T : class 
    => source.Where(x => x is not null)!;

/*
DEEPER BREAKDOWN:

LINQ is extremely convenient but has allocation and delegate overhead.
In very hot paths, a hand-written loop can be significantly faster.

Always materialize (ToList/ToArray) when you need to iterate multiple times.

JUNIOR PERSPECTIVE:

LINQ is a tool, not a religion. Know when it's the right abstraction and when raw loops or Span are better.

COMMON PITFALLS IN PRODUCTION:

- Multiple enumeration of expensive queries.
- Using LINQ on EF Core without understanding the generated SQL.
- Creating closures in hot loops inside LINQ.

EXPERIMENTS:

1. Benchmark LINQ vs manual loop on a large collection.
2. Find and fix a multiple enumeration bug in existing code.
3. Write a custom LINQ extension method with deferred execution.

JUNIOR CHALLENGE:

Create an efficient "Paginate" extension method that works on IQueryable and IAsyncEnumerable, with proper support for total count when needed.
*/