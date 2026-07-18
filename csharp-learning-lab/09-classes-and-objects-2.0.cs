/*
JUNIOR GOAL:
Design classes and object models that are correct, efficient, and follow modern C# idioms.

REAL WORLD USE CASE:
Domain modeling, DTOs, value objects, and building reusable libraries.

CONCEPTS COVERED:
- Primary constructors (C# 12)
- Init-only properties and required members
- Records vs classes vs structs
- Object initializers and collection expressions
- Equality and GetHashCode best practices
*/

// ============================================
// STEP 1: Modern class declaration
// ============================================

public class User(string id, string email)
{
    public string Id { get; } = id;
    public string Email { get; } = email;
    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
}

// ============================================
// STEP 2: Value objects with records
// ============================================

public record Address(string Street, string City, string PostalCode);

// ============================================
// STEP 3: Proper equality
// ============================================

public sealed class Money : IEquatable<Money>
{
    // implement Equals and GetHashCode correctly or use record
}

/*
DEEPER BREAKDOWN:

Primary constructors reduce boilerplate for simple classes.

Init-only + required give you immutable-by-default with required construction.

Records give you value equality for free.

JUNIOR PERSPECTIVE:

Stop writing boilerplate constructors and manual Equals methods. Use the language features.

COMMON PITFALLS IN PRODUCTION:

- Mutable classes used as dictionary keys.
- Incorrect GetHashCode implementations.
- Forgetting to make properties init-only when the object should be immutable after construction.

EXPERIMENTS:

1. Compare memory and performance of class vs record struct for a small data holder.
2. Create a value object with proper validation in the constructor.
3. Use collection expression to initialize a complex object graph.

JUNIOR CHALLENGE:

Design an immutable Order class using primary constructor + init properties + records for line items.
Ensure it is safe to use as a key in dictionaries and supports equality by value.
*/