/*
BEGINNER GOAL:
Learn how to write unit tests for .NET code using xUnit.

REAL WORLD USE CASE:
Ensuring code correctness, enabling refactoring, catching bugs early.

CONCEPTS COVERED:
- xUnit basics ([Fact], [Theory])
- Assert
- Mocking with Moq (basic)
- Test project structure
*/

// ============================================
// STEP 1: Basic test
// ============================================

public class CalculatorTests
{
    [Fact]
    public void Add_TwoNumbers_ReturnsSum()
    {
        var calc = new Calculator();
        int result = calc.Add(2, 3);
        Assert.Equal(5, result);
    }
}

// ============================================
// STEP 2: Theory for multiple cases
// ============================================

[Theory]
[InlineData(2, 3, 5)]
[InlineData(0, 0, 0)]
public void Add_VariousInputs(int a, int b, int expected)
{
    // ...
}

/*
LINE-BY-LINE BREAKDOWN:

[Fact]
- Single test case

[Theory] + [InlineData]
- Runs the test multiple times with different data

Assert.Equal
- Checks that two values are equal

NOOB TRANSLATION:

Tests are code that checks if your other code works correctly.

COMMON MISTAKES:

1. Not testing edge cases.
2. Tests that depend on each other.
3. Testing implementation details instead of behavior.

TRY CHANGING THIS:

1. Add more test cases.
2. Test a case that should throw an exception.

MINI CHALLENGE:

Write tests for a method that calculates discounts with different inputs.
*/