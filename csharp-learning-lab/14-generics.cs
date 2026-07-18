/*
BEGINNER GOAL:
Learn how to write reusable code using generics.

REAL WORLD USE CASE:
Creating flexible collections, services, and utilities that work with many types.

CONCEPTS COVERED:
- Generic methods and classes
- Type constraints
- Why generics are powerful
*/

// ============================================
// STEP 1: Generic method
// ============================================

static T GetFirst<T>(List<T> list)
{
    return list[0];
}

// ============================================
// STEP 2: Generic class
// ============================================

public class Repository<T> where T : class
{
    private List<T> _items = new();

    public void Add(T item) => _items.Add(item);
    public T? GetByIndex(int index) => _items.ElementAtOrDefault(index);
}

// ============================================
// STEP 3: Constraints
// ============================================

public class Calculator<T> where T : struct, IComparable<T>
{
    // Only value types that can be compared
}

/*
LINE-BY-LINE BREAKDOWN:

<T>
- Type parameter — will be replaced when used

where T : class
- Constraint: T must be a reference type

where T : struct
- Must be a value type

NOOB TRANSLATION:

Generics let you write code once that works with many different types, while staying type-safe.

COMMON MISTAKES:

1. Not adding constraints when needed.
2. Making everything generic when it's not necessary.

TRY CHANGING THIS:

1. Make a generic method that swaps two values.
2. Add a constraint to a generic class.

MINI CHALLENGE:

Create a generic Stack<T> class with Push and Pop methods.
*/