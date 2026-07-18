/*
BEGINNER GOAL:
Get an introduction to Entity Framework Core for database access.

REAL WORLD USE CASE:
Object-relational mapping — work with database tables as C# objects.

CONCEPTS COVERED:
- DbContext
- DbSet<T>
- Migrations basics
- LINQ to SQL
*/

// ============================================
// STEP 1: DbContext
// ============================================

public class AppDbContext : DbContext
{
    public DbSet<Product> Products { get; set; } = null!;

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
}

// ============================================
// STEP 2: Querying
// ============================================

var expensiveProducts = await db.Products
    .Where(p => p.Price > 100)
    .ToListAsync();

// ============================================
// STEP 3: Adding data
// ============================================

db.Products.Add(new Product { Name = "Laptop", Price = 999 });
await db.SaveChangesAsync();

/*
LINE-BY-LINE BREAKDOWN:

DbSet<Product>
- Represents the Products table

Where + ToListAsync
- Builds and executes SQL query

SaveChangesAsync
- Commits changes to the database

NOOB TRANSLATION:

EF Core lets you talk to databases using C# objects instead of writing raw SQL.

COMMON MISTAKES:

1. Not awaiting async methods.
2. Querying too much data (N+1 problem).
3. Forgetting to apply migrations.

TRY CHANGING THIS:

1. Add a filter and ordering.
2. Include related data (if you have navigation properties).

MINI CHALLENGE:

Set up a simple DbContext for a Blog and Post, then query the latest 5 posts.
*/