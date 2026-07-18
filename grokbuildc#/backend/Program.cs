// =============================================================================
// PROGRAM.CS - ASP.NET Core Entry Point (grokbuildc#)
// =============================================================================
// In modern .NET (6+), this file contains both the application builder and the app itself.
// This is called the "Minimal Hosting Model".
//
// Why this approach?
// - Much less boilerplate than the old Startup.cs pattern.
// - Still very powerful.
//
// How things connect:
// Program.cs → registers services (including EF Core) → defines API endpoints
// =============================================================================

using Microsoft.EntityFrameworkCore;
using grokbuildcsharps.Backend.Data;   // Our DbContext
using grokbuildcsharps.Backend.Models;

var builder = WebApplication.CreateBuilder(args);

// -----------------------------------------------------------------------------
// SERVICE REGISTRATION (Dependency Injection)
// -----------------------------------------------------------------------------
// ASP.NET Core has built-in DI. We tell it what services we need.

// Add EF Core with PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add CORS so React frontend can call us
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// -----------------------------------------------------------------------------
// MIDDLEWARE PIPELINE
// -----------------------------------------------------------------------------
app.UseCors();

// -----------------------------------------------------------------------------
// API ENDPOINTS (Minimal API style)
// -----------------------------------------------------------------------------

// GET all tasks
app.MapGet("/api/tasks", async (AppDbContext db) =>
{
    // AsNoTracking() is a performance optimization for read-only queries
    var tasks = await db.Tasks.AsNoTracking().OrderByDescending(t => t.CreatedAt).ToListAsync();
    return Results.Ok(new { data = tasks });
});

// GET single task
app.MapGet("/api/tasks/{id}", async (int id, AppDbContext db) =>
{
    var task = await db.Tasks.FindAsync(id);
    return task is not null ? Results.Ok(new { data = task }) : Results.NotFound();
});

// POST create task
app.MapPost("/api/tasks", async (TaskItem task, AppDbContext db) =>
{
    db.Tasks.Add(task);
    await db.SaveChangesAsync();
    return Results.Created($"/api/tasks/{task.Id}", new { data = task });
});

// PUT update task
app.MapPut("/api/tasks/{id}", async (int id, TaskItem updatedTask, AppDbContext db) =>
{
    var task = await db.Tasks.FindAsync(id);
    if (task is null) return Results.NotFound();

    task.Title = updatedTask.Title;
    task.Description = updatedTask.Description;
    task.Completed = updatedTask.Completed;
    task.DueDate = updatedTask.DueDate;

    await db.SaveChangesAsync();
    return Results.Ok(new { data = task });
});

// DELETE task
app.MapDelete("/api/tasks/{id}", async (int id, AppDbContext db) =>
{
    var task = await db.Tasks.FindAsync(id);
    if (task is null) return Results.NotFound();

    db.Tasks.Remove(task);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();

// -----------------------------------------------------------------------------
// DATA MODELS (defined here for simplicity in this educational project)
// In a real project these would live in separate files under Models/
// -----------------------------------------------------------------------------

public class TaskItem
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public bool Completed { get; set; }
    public DateTime? DueDate { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<TaskItem> Tasks => Set<TaskItem>();
}
