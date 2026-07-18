/*
JUNIOR GOAL:
Go beyond basic string manipulation and understand performance characteristics, immutability implications, encoding, and modern C# string features used in real applications.

REAL WORLD USE CASE:
Building high-throughput log formatters, safely handling user input to prevent injection, efficient CSV/JSON generation, internationalization, and memory-conscious string processing in services.

CONCEPTS COVERED:
- String immutability and interning
- StringBuilder vs string concatenation in loops
- Span<char> and Memory<char> for zero-allocation parsing
- String interpolation with FormattableString
- Encoding (UTF8 vs UTF16) and globalization
- Modern C# 11+ raw string literals and UTF-8 literals
*/

// ============================================
// STEP 1: Immutability and interning
// ============================================

string s1 = "hello";
string s2 = "hello";
Console.WriteLine(ReferenceEquals(s1, s2)); // often true due to interning

string s3 = new string('h', 1) + "ello"; // new allocation
Console.WriteLine(ReferenceEquals(s1, s3)); // false

// ============================================
// STEP 2: Efficient building
// ============================================

var sb = new StringBuilder();
for (int i = 0; i < 1000; i++)
{
    sb.Append("item").Append(i).AppendLine();
}
string result = sb.ToString();

// ============================================
// STEP 3: Zero-allocation with Span
// ============================================

ReadOnlySpan<char> input = "key=value;another=123".AsSpan();
int eq = input.IndexOf('=');
ReadOnlySpan<char> key = input[..eq];
ReadOnlySpan<char> value = input[(eq + 1)..];

// No new string allocations until you call ToString()

// ============================================
// STEP 4: Raw string literals (C# 11+)
var json = """
    {
      "name": "Alex",
      "age": 28
    }
    """;

/*
DEEPER BREAKDOWN:

Strings are immutable, so every mutation creates a new object. This is why repeated + in loops is O(n²) in allocations.

String interning allows the runtime to reuse identical literals.

Span<T> / ReadOnlySpan<T> let you work with slices of strings or arrays without copying.

FormattableString gives you access to the format string and arguments before they are turned into a string (useful for logging or SQL parameterization).

JUNIOR PERSPECTIVE:

At junior level you should default to StringBuilder for anything more than a couple concatenations.
Prefer ReadOnlySpan<char> when parsing or slicing text without needing to own the data.
Be aware of encoding when crossing boundaries (files, network, interop).

COMMON PITFALLS IN PRODUCTION:

- Accidental string allocations in hot paths (especially logging or serialization).
- Using string.Split on large inputs without Span-based alternatives.
- Forgetting that string interpolation still allocates unless using FormattableString or interpolated string handlers.
- Mixing UTF8 and UTF16 without care (e.g., in ASP.NET or gRPC).

EXPERIMENTS:

1. Benchmark string concatenation vs StringBuilder for 10k iterations using BenchmarkDotNet.
2. Rewrite a simple CSV parser using ReadOnlySpan<char> instead of Split.
3. Use FormattableString to safely build a SQL query with parameters (without actually executing).

JUNIOR CHALLENGE:

Create a high-performance LogFormatter that:
- Takes a message template and arguments
- Uses interpolated string handler or FormattableString
- Avoids allocations for the final formatted line when possible
- Supports a configurable max length with truncation

Measure allocations before and after.
*/