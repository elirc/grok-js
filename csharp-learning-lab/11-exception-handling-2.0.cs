/*
JUNIOR GOAL:
Implement robust, observable, and recoverable error handling strategies in C# applications.

REAL WORLD USE CASE:
Building resilient services, proper error propagation in libraries, and structured error responses in APIs.

CONCEPTS COVERED:
- Custom exception hierarchies
- Exception filters
- When to throw vs return Result types
- Global exception handling in ASP.NET
- Logging and correlation with exceptions
*/

// ============================================
// STEP 1: Custom exceptions
// ============================================

public class OrderNotFoundException : Exception
{
    public string OrderId { get; }

    public OrderNotFoundException(string orderId) 
        : base($"Order {orderId} was not found")
    {
        OrderId = orderId;
    }
}

// ============================================
// STEP 2: Exception filters
// ============================================

catch (Exception ex) when (ex is not OperationCanceledException)
{
    _logger.LogError(ex, "Unexpected error");
}

// ============================================
// STEP 3: Result pattern alternative
// ============================================

public readonly record struct Result<T>(T? Value, string? Error)
{
    public bool IsSuccess => Error is null;
    public static Result<T> Success(T value) => new(value, null);
    public static Result<T> Failure(string error) => new(default, error);
}

/*
DEEPER BREAKDOWN:

Throw exceptions for exceptional situations, not for control flow.

Custom exceptions carry domain information.

Result types are preferred in many modern codebases for expected "errors".

JUNIOR PERSPECTIVE:

Good error handling is a major differentiator between toy code and production code.

COMMON PITFALLS IN PRODUCTION:

- Swallowing exceptions.
- Throwing Exception instead of specific types.
- Using exceptions for normal business logic (e.g. "user not found").
- Not including enough context in the exception.

EXPERIMENTS:

1. Create a custom exception hierarchy for a domain.
2. Compare exception-based vs Result-based error handling on performance and readability.
3. Implement a global exception handler that returns consistent ProblemDetails.

JUNIOR CHALLENGE:

Design an error handling strategy for a payment processing service that:
- Uses both exceptions and Result types appropriately
- Includes correlation IDs
- Has a consistent API error response shape
- Logs with full context but never logs sensitive data
*/