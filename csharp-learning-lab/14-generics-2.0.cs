/*
JUNIOR GOAL:
Design powerful, reusable generic APIs while keeping them understandable and avoiding complexity explosions.

REAL WORLD USE CASE:
Building libraries, collection types, dependency injection, and serialization frameworks.

CONCEPTS COVERED:
- Generic constraints (new(), struct, class, unmanaged, etc.)
- Static abstract members in interfaces (C# 11)
- Variance (in/out)
- Generic math (INumber<T>)
- Avoiding generic explosion
*/

// ============================================
// STEP 1: Useful constraints
// ============================================

public class Cache<T> where T : class, new()
{
    // ...
}

// ============================================
// STEP 2: Generic math
// ============================================

public static T Sum<T>(IEnumerable<T> values) where T : INumber<T>
{
    T sum = T.Zero;
    foreach (var v in values) sum += v;
    return sum;
}

// ============================================
// STEP 3: Variance
// ============================================

IEnumerable<Animal> animals = new List<Dog>(); // covariance

/*
DEEPER BREAKDOWN:

Constraints make generic code both safer and more powerful (you can call specific members).

Static abstract members enable things like generic math without boxing.

JUNIOR PERSPECTIVE:

Generics are one of C#'s strongest features. Used well they create elegant reusable code. Used poorly they create unreadable monsters.

COMMON PITFALLS IN PRODUCTION:

- Too many generic parameters.
- Missing constraints leading to ugly casts inside methods.
- Overusing generics when a non-generic or interface-based design would be clearer.

EXPERIMENTS:

1. Implement a generic repository with proper constraints.
2. Use INumber<T> to write a reusable average function.
3. Experiment with covariance and contravariance on interfaces.

JUNIOR CHALLENGE:

Design a generic Result<T, TError> type with:
- Success and Failure factory methods
- Map and Bind operations (functional style)
- Proper support for pattern matching
- Constraints that make sense for error types
*/