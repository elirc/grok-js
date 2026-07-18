/*
BEGINNER GOAL:
Use LINQ to query and transform collections elegantly.

REAL WORLD USE CASE:
Filtering lists of data, transforming objects, aggregating information.

CONCEPTS COVERED:
- LINQ methods (Where, Select, OrderBy, FirstOrDefault, etc.)
- Query syntax vs method syntax
- Deferred execution
*/

// ============================================
// STEP 1: Method syntax
// ============================================

var adults = people
    .Where(p => p.Age >= 18)
    .Select(p => p.Name)
    .OrderBy(name => name)
    .ToList();

// ============================================
// STEP 2: Query syntax
// ============================================

var query = from p in people
            where p.Age >= 18
            orderby p.Name
            select p.Name;

/*
LINE-BY-LINE BREAKDOWN:

.Where(p => p.Age >= 18)
- Filters the collection
- Lambda expression

.Select(p => p.Name)
- Projects/transforms each item

Deferred execution
- The query doesn't run until you materialize it (ToList, ToArray, foreach, etc.)

NOOB TRANSLATION:

LINQ is like SQL for in-memory collections (and databases with EF).

COMMON MISTAKES:

1. Multiple enumeration of the same query.
2. Forgetting ToList() when you need the results now.
3. Complex queries that are hard to read.

TRY CHANGING THIS:

1. Use GroupBy to group people by city.
2. Use Any() and All().

MINI CHALLENGE:

Given a list of products, get the names of products that cost more than $50, sorted by price descending.
*/