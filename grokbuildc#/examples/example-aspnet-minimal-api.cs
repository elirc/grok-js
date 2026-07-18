/*
Example: ASP.NET Minimal API with EF and Validation
*/

app.MapPost("/tasks", async (TaskCreateDto dto, AppDb db) =>
{
    var entity = new TaskItem { Title = dto.Title };
    db.Tasks.Add(entity);
    await db.SaveChangesAsync();
    return Results.Created($"/tasks/{entity.Id}", entity);
})
.WithOpenApi();

/*
Minimal APIs in .NET are concise but still give you full access to the DI container, model binding, and OpenAPI generation.

A junior .NET engineer should start with minimal APIs for new services and only move to controllers when they need the extra structure for very large codebases.
*/
