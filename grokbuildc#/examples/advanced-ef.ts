/*
Advanced EF Core Examples in .NET

Example 1: Query with includes
var orders = context.Orders
  .Include(o => o.Items)
  .ThenInclude(i => i.Product)
  .ToList();

Example 2: Transactions
using var tx = await context.Database.BeginTransactionAsync();
// ... operations
await tx.CommitAsync();

Example 3: AsNoTracking for read-only
var users = context.Users.AsNoTracking().ToList();

Problems:
1. Implement soft delete with query filter.
2. Add global query filter for tenant.
3. Write a migration for new column.
*/
