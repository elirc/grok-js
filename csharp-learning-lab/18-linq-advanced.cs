/*
BEGINNER GOAL:
Go beyond basic LINQ with grouping, joining, and aggregation.

REAL WORLD USE CASE:
Reporting, analytics, data transformation pipelines.

CONCEPTS COVERED:
- GroupBy
- Join
- Aggregate functions
- ToLookup
*/

// ============================================
// STEP 1: Grouping
// ============================================

var groups = orders
    .GroupBy(o => o.CustomerId)
    .Select(g => new { CustomerId = g.Key, Count = g.Count() });

// ============================================
// STEP 2: Aggregation
// ============================================

decimal total = orders.Sum(o => o.Total);

/*
LINE-BY-LINE BREAKDOWN:

GroupBy
- Groups elements by a key

g.Key
- The value that was grouped by

Sum, Average, Min, Max, Count
- Aggregation methods

NOOB TRANSLATION:

LINQ can do almost anything SQL can do on in-memory data.

COMMON MISTAKES:

1. Multiple enumeration without ToList().
2. Complex queries that should be in the database.

TRY CHANGING THIS:

1. Group orders by date and sum the totals.
2. Use Join to combine two lists.

MINI CHALLENGE:

Given a list of sales, calculate average sales per region using GroupBy and Average.
*/