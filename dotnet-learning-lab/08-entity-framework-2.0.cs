/*
JUNIOR GOAL:
Use Entity Framework Core effectively while avoiding common performance and correctness pitfalls.

REAL WORLD USE CASE:
Building data access layers that are efficient, testable, and maintainable.

CONCEPTS COVERED:
- Change tracking and AsNoTracking
- N+1 query problem and Include / ThenInclude
- Transactions and SaveChanges behavior
- Migrations and deployment
- Specification pattern or CQRS with EF
*/

// ============================================
// STEP 1: Performance basics
// ============================================

var users = await db.Users
    .AsNoTracking()
    .Include(u => u.Orders)
        .ThenInclude(o => o.Items)
    .Where(u => u.IsActive)
    .ToListAsync();

// ============================================
// STEP 2: Avoiding N+1
// ============================================

// Bad: foreach user -> user.Orders (lazy loading or multiple queries)
// Good: use Include + ThenInclude or explicit loading

/*
DEEPER BREAKDOWN:

AsNoTracking is critical for read-only queries (much faster, less memory).

Always be explicit about what you load with Include.

SaveChangesAsync should usually be called once per business operation (Unit of Work).

JUNIOR PERSPECTIVE:

EF Core makes it easy to write slow code. You must understand what SQL is being generated.

COMMON PITFALLS IN PRODUCTION:

- Lazy loading enabled by accident (huge N+1 problems).
- Tracking entities you don't intend to update.
- Not using AsNoTracking for reports.
- Long-running transactions.

EXPERIMENTS:

1. Use .ToQueryString() to see the generated SQL.
2. Compare performance of tracked vs AsNoTracking on a large query.
3. Implement a simple specification pattern for reusable queries.

JUNIOR CHALLENGE:

Optimize a data access layer that currently has N+1 queries.
Use AsNoTracking, proper Includes, and projection (Select into DTOs) where possible.
Add benchmarks or logging to prove the improvement.
*/