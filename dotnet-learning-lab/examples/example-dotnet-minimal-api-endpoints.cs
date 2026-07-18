/*
Example: Minimal API Endpoints with Filters and Validation
*/

app.MapPost("/tasks", async (TaskCreateDto dto, AppDbContext db) =>
{
    var task = new TaskItem(dto.Title, dto.Priority);
    db.Tasks.Add(task);
    await db.SaveChangesAsync();
    return Results.Created($"/tasks/{task.Id}", task);
})
.AddEndpointFilter<ValidationFilter<TaskCreateDto>>()
.WithSummary("Create a new task");

"""
Minimal APIs keep the entry point extremely small while still allowing full use of DI, filters, and OpenAPI metadata.

Endpoint filters are the modern replacement for action filters in minimal style. They let you run code before and after the handler for validation, logging, or authorization.

A junior should start simple with MapGet/MapPost and gradually add filters and typed results as complexity grows.
"""
