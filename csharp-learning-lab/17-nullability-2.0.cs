/*
JUNIOR GOAL:
Master nullable reference types and write code that is resilient to null without excessive defensive checks.

REAL WORLD USE CASE:
Consuming untrusted data (JSON, databases, user input), building robust libraries, and reducing NullReferenceException in production.

CONCEPTS COVERED:
- Enabling and configuring NRT
- Attributes that affect flow analysis ([NotNull], [MaybeNull], etc.)
- The null-forgiving operator (!)
- Nullable value types vs nullable references
- Static analysis and warnings as errors
*/

// ============================================
// STEP 1: Flow-sensitive analysis
// ============================================

string? name = GetOptionalName();
if (!string.IsNullOrEmpty(name))
{
    // name is not null here
    Use(name);
}

// ============================================
// STEP 2: Attributes for better analysis
// ============================================

[return: NotNullIfNotNull(nameof(input))]
public string? Normalize(string? input) { ... }

// ============================================
// STEP 3: When to use !
// ============================================

string name = GetNameFromLegacyCode()!; // only when you have proven it's not null

/*
DEEPER BREAKDOWN:

Nullable reference types are a compile-time feature. They don't change runtime behavior.

The compiler tracks null state through your code.

! should be used very sparingly — it's a way to say "I know better than the compiler".

JUNIOR PERSPECTIVE:

Treat nullable warnings as errors. They catch real bugs before they reach production.

COMMON PITFALLS IN PRODUCTION:

- Using ! as a crutch instead of fixing the root cause.
- Not enabling NRT in new projects.
- Assuming that because it compiles with NRT, null can't happen at runtime (external data can still be null).

EXPERIMENTS:

1. Enable NRT on a legacy project and systematically fix warnings.
2. Write a helper method that the compiler understands using attributes.
3. Compare code with and without NRT enabled.

JUNIOR CHALLENGE:

Take a method that deals with several nullable inputs from an external source and make it fully null-safe using the type system.
Add appropriate attributes so callers get good compiler feedback.
*/