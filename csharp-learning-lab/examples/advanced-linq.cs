/*
Advanced LINQ Examples in C# (EXPANDED 3-5x)

Example 1: GroupBy + aggregation
var groups = list.GroupBy(x => x.Category)
  .Select(g => new { Category = g.Key, Count = g.Count(), Total = g.Sum(x => x.Amount) });

Example 2: Join (method + query syntax)
var query = from p in products
            join c in categories on p.CatId equals c.Id
            select new { p.Name, Category = c.Name };

var methodJoin = products.Join(categories, p => p.CatId, c => c.Id, (p,c) => new {p.Name, c.Name});

Example 3: Deferred execution demo
var query = list.Where(x => x > 10); // lazy
var result = query.ToList(); // executed now
// add .ToList() early when side effects or repeated enumeration

Example 4: SelectMany for flattening
var allTags = posts.SelectMany(p => p.Tags);

Example 5: OrderBy + ThenBy + ThenByDescending
var sorted = people.OrderBy(p => p.Last).ThenBy(p => p.First);

Example 6: Any / All / Contains
bool hasActive = users.Any(u => u.IsActive);
bool allAdults = users.All(u => u.Age >= 18);

Example 7: FirstOrDefault vs SingleOrDefault
var user = users.FirstOrDefault(u => u.Id == id); // or throw with First

Example 8: ToLookup for multi-value index
var lookup = orders.ToLookup(o => o.CustomerId);

Example 9: Custom extension method example
public static IEnumerable<T> WhereNot<T>(this IEnumerable<T> src, Func<T,bool> pred)
    => src.Where(x => !pred(x));

Example 10: Zip, Range, Repeat helpers
var pairs = names.Zip(ages, (n,a) => $"{n}:{a}");

Problems (expanded):
1. Top 5 expensive products per category using GroupBy + OrderBy + Take.
2. Custom LINQ extension: e.g. Batch or Chunk.
3. Use SelectMany + Distinct for all unique tags across posts.
4. Left outer join using GroupJoin + DefaultIfEmpty.
5. Implement a running total with Aggregate or Select with state.
6. Filter then project into DTOs.
7. Demonstrate when query executes multiple times without ToList.
8. Pagination + total count using the same filtered query (careful execution).

LINQ is used everywhere in real C# code. Master it.
*/
