/*
JUNIOR GOAL:
Design clean, testable, and efficient methods with proper parameter handling, overloading, and modern C# features.

REAL WORLD USE CASE:
Public API design for libraries and services, reducing bugs through better signatures, and performance-sensitive code.

CONCEPTS COVERED:
- Params, in, ref, out, and ref readonly
- Default interface methods and static abstract members (C# 11+)
- Local functions and iterators
- Expression-bodied members
- Caller information attributes
*/

// ============================================
// STEP 1: Performance parameters
// ============================================

public void ProcessLargeStruct(in LargeStruct data) { } // no copy

public bool TryGetValue(int key, out string? value) { ... }

// ============================================
// STEP 2: Modern method features
// ============================================

public static T Zero<T>() where T : INumber<T> => T.Zero; // static abstract

public int this[int index] => _data[index]; // indexer as expression body

/*
DEEPER BREAKDOWN:

in parameters avoid copying large value types.
out is the idiomatic way for Try* methods.

Static abstract members in interfaces enable generic math.

JUNIOR PERSPECTIVE:

Method signatures are part of your public contract. Small changes in how parameters are passed can have big performance or usability impact.

COMMON PITFALLS IN PRODUCTION:

- Passing large structs by value unintentionally.
- Overusing ref/out and making code hard to read.
- Creating too many overloads that confuse callers.

EXPERIMENTS:

1. Benchmark a method with and without 'in' on a large struct.
2. Implement a generic math method using static abstract members.
3. Add caller information attributes to a logging helper.

JUNIOR CHALLENGE:

Design the public API for a high-performance cache:
- GetOrAdd with value factory
- TryGet with out parameter
- Support for eviction callbacks
- Minimal allocations on the hot path

Write both the signature and a reference implementation.
*/