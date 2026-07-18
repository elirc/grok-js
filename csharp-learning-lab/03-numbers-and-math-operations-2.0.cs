/*
JUNIOR GOAL:
Understand numeric types at a deeper level including performance, precision, overflow behavior, and when to use specialized types or libraries.

REAL WORLD USE CASE:
Financial calculations, scientific computing, high-performance counters, safe integer arithmetic in concurrent systems, and avoiding subtle bugs in distributed systems (IDs, timestamps).

CONCEPTS COVERED:
- Floating point precision and IEEE 754
- Checked vs unchecked arithmetic
- BigInteger and decimal performance
- Half, Int128 (C# 11+)
- Safe division and overflow handling
- Using System.Numerics for vectors and bit operations
*/

// ============================================
// STEP 1: Precision pitfalls
// ============================================

double d = 0.1 + 0.2;
Console.WriteLine(d); // 0.30000000000000004

decimal money = 0.1m + 0.2m;
Console.WriteLine(money); // 0.3

// ============================================
// STEP 2: Overflow and checked contexts
// ============================================

int max = int.MaxValue;
int overflow = max + 1;           // wraps around (unchecked by default)

checked
{
    // int overflow2 = max + 1;   // throws OverflowException
}

// ============================================
// STEP 3: Modern integer types
// ============================================

Int128 big = Int128.MaxValue;
Half small = (Half)3.14;

// ============================================
// STEP 4: Bit manipulation and Numerics
// ============================================

int flags = 0b_0001_0010;
bool hasFlag = (flags & 0b_0001_0000) != 0;

Vector3 v1 = new(1, 2, 3);
Vector3 v2 = Vector3.Normalize(v1);

/*
DEEPER BREAKDOWN:

decimal is much slower than double because it uses base-10 representation internally.
Use it only when exact decimal representation matters (money, tax).

Checked arithmetic has a cost; use it selectively or enable globally with compiler flags.

Int128 and Half are useful for specific domains (cryptography, ML).

JUNIOR PERSPECTIVE:

Choosing the wrong numeric type is a very common source of bugs and performance problems in production services.

COMMON PITFALLS IN PRODUCTION:

- Using double for monetary values leading to penny differences.
- Integer overflow in counters or ID generation.
- Assuming division of integers will produce fractions.
- Not handling NaN or Infinity in floating point calculations.

EXPERIMENTS:

1. Compare performance of decimal vs double in a tight loop doing 1 million additions.
2. Demonstrate wrapping vs throwing behavior in checked/unchecked contexts.
3. Use BitOperations and Vector to optimize a simple calculation.

JUNIOR CHALLENGE:

Implement a Money struct that:
- Uses decimal internally
- Supports safe arithmetic with different currencies (throw on mismatch)
- Implements IComparable and equality correctly
- Has a static Parse method that is strict

Add unit tests using the testing concepts from the .NET section.
*/