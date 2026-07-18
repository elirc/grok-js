/*
JUNIOR GOAL:
Write robust boolean logic, understand short-circuiting, nullable bools, and how to model complex business rules without unreadable if statements.

REAL WORLD USE CASE:
Feature flags, permission systems, workflow state machines, validation pipelines, and conditional business rules in services.

CONCEPTS COVERED:
- Short-circuit evaluation
- Nullable bool (bool?)
- Bitwise operators on flags (Flags enum)
- Pattern matching on bools
- De Morgan's laws in practice
*/

// ============================================
// STEP 1: Short circuiting behavior
// ============================================

bool HasPermission() => ExpensiveCheck();
bool IsActive() => true;

if (IsActive() && HasPermission()) // HasPermission may not be called
{
    // ...
}

// ============================================
// STEP 2: Flags enum (very common in .NET)
// ============================================

[Flags]
public enum Permissions
{
    None = 0,
    Read = 1,
    Write = 2,
    Delete = 4,
    All = Read | Write | Delete
}

var userPerms = Permissions.Read | Permissions.Write;
bool canWrite = userPerms.HasFlag(Permissions.Write);

// ============================================
// STEP 3: Nullable bool gotchas
// ============================================

bool? result = SomeOptionalCheck();
if (result == true) { }   // only true
if (result ?? false) { }  // treat null as false

/*
DEEPER BREAKDOWN:

&& and || short-circuit. This is both a performance and correctness feature (avoiding side effects or exceptions).

Flags enums with [Flags] + HasFlag are the idiomatic way to represent multiple boolean options in .NET.

Nullable bool has three states: true, false, null. Treat null explicitly.

JUNIOR PERSPECTIVE:

Complex nested boolean logic is a major source of bugs. Prefer small, well-named methods or a proper state machine over giant if conditions.

COMMON PITFALLS IN PRODUCTION:

- Relying on side effects inside conditions (because of short-circuit).
- Using int instead of [Flags] enum for permissions.
- Treating null bool as false without considering the third state.
- Overusing bitwise operators without the Flags attribute.

EXPERIMENTS:

1. Create a [Flags] enum for user roles and write extension methods for checking combinations.
2. Implement a small rule engine using a list of Func<bool> predicates.
3. Explore what happens with nullable bool in LINQ Any/ All.

JUNIOR CHALLENGE:

Create a PermissionChecker class that:
- Takes a set of [Flags] permissions
- Supports checking any/all/none of a required set
- Has a fluent API like .Require(Permissions.Read).Or(Permissions.Admin)
- Handles nullable permission sources gracefully
*/