/*
Example: Efficient Querying with Entity Framework Core
*/

var activeUsers = await db.Users
    .Where(u => u.IsActive)
    .Include(u => u.Orders)
    .ThenInclude(o => o.Items)
    .AsNoTracking()
    .ToListAsync();

// Projection to DTO to avoid over-fetching
var summaries = await db.Orders
    .Where(o => o.CreatedAt > DateTime.UtcNow.AddDays(-30))
    .Select(o => new OrderSummary(o.Id, o.Total, o.Customer.Name))
    .ToListAsync();

/*
Include loads related data in the same round-trip using JOINs under the hood. ThenInclude continues the chain for deeper graphs.

AsNoTracking() tells EF you don't plan to modify these entities. This skips change tracking overhead and is a good default for read-only queries.

Projecting directly to a DTO (the Select) means EF only selects the columns you actually need instead of materializing full entity graphs. This is often dramatically faster for large result sets.

A junior .NET developer should always ask: "Do I need the full entity? Can I project? Should I track changes?"
*/
