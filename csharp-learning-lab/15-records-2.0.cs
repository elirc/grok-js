/*
JUNIOR GOAL:
Use records effectively for data modeling while understanding their trade-offs and advanced features.

REAL WORLD USE CASE:
DTOs, configuration, event payloads, and immutable domain value objects.

CONCEPTS COVERED:
- record class vs record struct
- with expressions and nondestructive mutation
- Positional vs nominal records
- Equality and GetHashCode generation
- Records with inheritance
*/

// ============================================
// STEP 1: Record struct for performance
// ============================================

public readonly record struct Point(double X, double Y);

// ============================================
// STEP 2: Advanced with expression
// ============================================

var updated = person with 
{ 
    Address = person.Address with { City = "Berlin" } 
};

// ============================================
// STEP 3: Records with behavior
// ============================================

public abstract record Payment(decimal Amount)
{
    public abstract bool IsValid();
}

/*
DEEPER BREAKDOWN:

record struct is excellent when you want value semantics with minimal allocation.

Records generate Equals, GetHashCode, and ToString for you based on members.

with expressions create shallow copies.

JUNIOR PERSPECTIVE:

Records are the default choice for data-only types in modern C#.

COMMON PITFALLS IN PRODUCTION:

- Using mutable properties in records that are meant to be immutable.
- Deep cloning problems with nested mutable objects.
- Records with too many properties becoming hard to use.

EXPERIMENTS:

1. Compare allocation of record class vs record struct in a loop.
2. Create a record hierarchy with different payment types.
3. Use with expression to update a deeply nested immutable structure.

JUNIOR CHALLENGE:

Model an immutable Order using records:
- Order contains a list of LineItems (also records)
- Support adding a line item returning a new Order
- Correct equality based on content
- Nice ToString output
*/