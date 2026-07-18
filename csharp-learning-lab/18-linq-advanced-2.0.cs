/*
JUNIOR GOAL:
Use advanced LINQ techniques and know when to step outside LINQ for performance or expressiveness.

REAL WORLD USE CASE:
Complex data transformations, reporting engines, and efficient in-memory querying.

CONCEPTS COVERED:
- Custom IQueryable providers (high level)
- LINQ to Objects performance
- Aggregation and windowing functions
- Zipping, joining, and grouping strategies
- ToLookup vs GroupBy
*/

// ============================================
// STEP 1: ToLookup for multiple lookups
// ============================================

var lookup = orders.ToLookup(o => o.CustomerId);
var customerOrders = lookup[customerId];

// ============================================
// STEP 2: Zip and advanced joins
// ============================================

var pairs = list1.Zip(list2, (a, b) => (a, b));

// ============================================
// STEP 3: When to drop to loops
// ============================================

// For very complex logic or when you need early exit + mutation,
// a foreach or for is often clearer and faster than a huge LINQ expression.

/*
DEEPER BREAKDOWN:

ToLookup materializes into a lookup table — great when you will query the groups multiple times.

GroupBy is deferred; ToLookup executes immediately.

JUNIOR PERSPECTIVE:

LINQ is fantastic for simple to medium complexity. When the query becomes hard to read or performs poorly, rewrite it as a loop.

COMMON PITFALLS IN PRODUCTION:

- Complex LINQ that is hard to debug.
- Multiple enumerations.
- Using LINQ where a simple loop with early exit would be much clearer.

EXPERIMENTS:

1. Compare GroupBy + ToList vs ToLookup on data you query multiple ways.
2. Rewrite a complex LINQ query as a foreach and compare readability and speed.
3. Use Zip to combine two sequences elegantly.

JUNIOR CHALLENGE:

Implement a LINQ-style operator called `Window` that produces sliding windows of a given size over a sequence.
Support both IEnumerable and IAsyncEnumerable.
*/