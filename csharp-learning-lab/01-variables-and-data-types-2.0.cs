/*
JUNIOR GOAL:
Master C#'s type system with a focus on value vs reference semantics, memory implications, performance choices, and safe handling of nullable reference types in production code.

REAL WORLD USE CASE:
Choosing the right numeric type for financial calculations to avoid precision loss; using structs for small data to reduce allocations in hot paths; properly modeling optional data from APIs or databases without NullReferenceException risks.

CONCEPTS COVERED:
- Value types vs reference types and boxing
- Stack vs heap allocation
- decimal vs double/float for precision
- Nullable reference types (NRT) enforcement
- Struct vs class design decisions
- Span<T> and memory-efficient alternatives (intro)
*/

// ============================================
// STEP 1: Value types vs reference types
// ============================================

// Value types (struct) live on the stack (or inline in objects)
int value = 42;
DateTime now = DateTime.UtcNow;

// Reference types live on the heap
string text = "hello";
List<int> numbers = new() { 1, 2, 3 };

// Assignment for reference types copies the reference, not the data
List<int> sameList = numbers;
sameList.Add(4); // mutates the original list!

// ============================================
// STEP 2: Choosing numeric types carefully
// ============================================

// Dangerous for money:
double price = 0.1 + 0.2; // 0.30000000000000004

// Correct for financial calculations:
decimal money = 0.1m + 0.2m; // 0.3 exactly

// For very large numbers or IDs:
long bigId = 9_223_372_036_854_775_807L;

// ============================================
// STEP 3: Nullable reference types in practice
// ============================================

public class UserProfile
{
    public string? Bio { get; set; }           // explicitly nullable
    public required string DisplayName { get; init; } // C# 11+ required

    public int GetBioLength() => Bio?.Length ?? 0;
}

// When consuming external data (JSON, DB):
string? maybeName = GetNameFromApi();
if (!string.IsNullOrEmpty(maybeName))
{
    // Compiler knows it's not null here
    Process(maybeName);
}

// ============================================
// STEP 4: Structs for small, immutable data
// ============================================

public readonly struct Money
{
    public decimal Amount { get; }
    public string Currency { get; }

    public Money(decimal amount, string currency)
    {
        Amount = amount;
        Currency = currency;
    }

    public Money Add(Money other)
    {
        if (Currency != other.Currency) 
            throw new InvalidOperationException("Currency mismatch");
        return new Money(Amount + other.Amount, Currency);
    }
}

// Using it avoids heap allocation for small values in collections
var payments = new List<Money>();
payments.Add(new Money(100.50m, "USD"));

/*
DEEPER BREAKDOWN:

In C#, every type is either a value type or a reference type.
Value types (int, DateTime, custom structs) are copied by value.
Reference types (class, string, arrays) are copied by reference.

This matters for performance and for mutation bugs.
Using `readonly struct` prevents accidental mutation and enables better optimizations.

decimal uses base-10 representation internally, avoiding the binary floating point errors of double.

Nullable reference types (enabled via <Nullable>enable</Nullable> in csproj) make the compiler enforce null safety at compile time rather than runtime.

JUNIOR PERSPECTIVE:

At a junior-to-mid level, you should stop reaching for class by default.
Use structs for small, immutable data carriers (especially in hot loops or collections).
Always enable nullable reference types and treat warnings as errors in new projects.
For money or high-precision values, default to decimal.

COMMON PITFALLS IN PRODUCTION:

- Using double for currency or quantities that require exact decimals.
- Returning mutable reference types from properties without defensive copies.
- Ignoring nullable warnings and getting NullReferenceException in production.
- Boxing value types when storing them in non-generic collections or object[].
- Large structs causing expensive copies when passed by value (consider readonly record struct or ref).

EXPERIMENTS:

1. Create a struct vs class version of a small data holder and benchmark allocation with BenchmarkDotNet or a simple stopwatch in a loop.
2. Turn on nullable reference types in a small project and fix all warnings.
3. Implement a Money struct with proper operator overloading (+, ==) and test currency mismatch handling.

JUNIOR CHALLENGE:

Design a type-safe `Measurement` struct that holds a value and a unit (enum). 
Prevent mixing different units at compile time using generics or a marker interface.
Add conversion methods between compatible units (e.g., Meters <-> Kilometers).
Demonstrate usage in a small collection and show why struct is preferable here over class.
*/