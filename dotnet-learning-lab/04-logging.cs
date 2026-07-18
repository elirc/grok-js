/*
BEGINNER GOAL:
Add proper logging to .NET applications.

REAL WORLD USE CASE:
Debugging production issues, monitoring application health, auditing.

CONCEPTS COVERED:
- ILogger<T>
- Log levels
- Structured logging
- Configuration of logging providers
*/

// ============================================
// STEP 1: Using ILogger
// ============================================

public class OrderService
{
    private readonly ILogger<OrderService> _logger;

    public OrderService(ILogger<OrderService> logger)
    {
        _logger = logger;
    }

    public void ProcessOrder(int orderId)
    {
        _logger.LogInformation("Processing order {OrderId}", orderId);
        // ...
        _logger.LogWarning("Low stock for order {OrderId}", orderId);
    }
}

/*
LINE-BY-LINE BREAKDOWN:

ILogger<OrderService>
- Generic version gives you the category name

LogInformation
- Structured logging with {Property}

NOOB TRANSLATION:

Logging is how your application talks to you about what it's doing.

COMMON MISTAKES:

1. Using Console.WriteLine instead of ILogger.
2. Logging sensitive data.
3. Not using structured logging (just string concatenation).

TRY CHANGING THIS:

1. Log at different levels.
2. Add logging to exception handling.

MINI CHALLENGE:

Inject ILogger into a class and log the start and end of a method with parameters.
*/