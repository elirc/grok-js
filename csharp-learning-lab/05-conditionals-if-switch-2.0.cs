/*
JUNIOR GOAL:
Write clean, maintainable decision logic using modern C# pattern matching and avoid deeply nested if-else chains.

REAL WORLD USE CASE:
Order status machines, payment routing, user onboarding flows, API response handling, and business rule engines.

CONCEPTS COVERED:
- Switch expressions with patterns
- Property patterns and relational patterns
- List patterns (C# 11+)
- When to use polymorphism vs switch
- Exhaustiveness checking
*/

// ============================================
// STEP 1: Switch expression with patterns
// ============================================

string GetDiscountCategory(Order order) => order switch
{
    { Total: > 1000, Items.Count: >= 5 } => "Premium",
    { Total: > 500 } => "Standard",
    { Status: OrderStatus.Cancelled } => "None",
    _ => "Basic"
};

// ============================================
// STEP 2: Type and positional patterns
// ============================================

decimal CalculateShipping(object shipment) => shipment switch
{
    (string method, decimal weight) when method == "express" => weight * 5,
    (string method, decimal weight) => weight * 2,
    _ => 10m
};

// ============================================
// STEP 3: List patterns
// ============================================

bool IsValidSequence(int[] numbers) => numbers is [> 0, .., 42];

/*
DEEPER BREAKDOWN:

Switch expressions are expressions, so they can be used in assignments and returns.

Patterns allow matching on shape, not just value.

When you have more than 3-4 cases that share behavior, consider polymorphism or a strategy pattern instead of a giant switch.

JUNIOR PERSPECTIVE:

Pattern matching dramatically reduces boilerplate while keeping logic readable. Overusing it on complex objects can hide domain concepts that deserve their own types.

COMMON PITFALLS IN PRODUCTION:

- Giant switches that should be replaced by polymorphism or a dictionary of strategies.
- Forgetting the discard _ case (can lead to runtime surprises if new cases are added).
- Mixing too many different pattern kinds in one expression.

EXPERIMENTS:

1. Refactor a nested if-else chain into a clean switch expression with property patterns.
2. Use list patterns to validate simple sequences.
3. Compare performance of switch vs dictionary lookup for many cases.

JUNIOR CHALLENGE:

Model a payment processing flow with:
- Different payment methods (Card, BankTransfer, Crypto)
- Each with its own validation and fee calculation
Use a switch expression + records for the different payment types.
Make sure the compiler helps you when you add a new payment method.
*/