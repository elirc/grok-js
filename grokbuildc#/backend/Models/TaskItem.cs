// =============================================================================
// TASK MODEL - C# Entity
// =============================================================================
// This represents a Task in the database.
// Entity Framework Core will create a table based on this class.
//
// Note the use of properties with getters/setters — this is standard in C#.

using System;

namespace grokbuildcsharps.Backend.Models;

public class TaskItem
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public bool Completed { get; set; }
    public DateTime? DueDate { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
