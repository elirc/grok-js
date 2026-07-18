/*
JUNIOR GOAL:
Design and implement a clean, observable middleware pipeline.

REAL WORLD USE CASE:
Cross-cutting concerns like correlation, logging, authentication, rate limiting, and error handling in ASP.NET Core applications.

CONCEPTS COVERED:
- Middleware ordering is critical
- Custom middleware vs endpoint filters
- Short-circuiting the pipeline
- Using IMiddleware interface
- Performance considerations
*/

// ============================================
// STEP 1: Proper ordering
// ============================================

app.UseExceptionHandler();
app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.UseRateLimiter();

// Then map endpoints

// ============================================
// STEP 2: Custom middleware class
// ============================================

public class RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        var sw = Stopwatch.StartNew();
        await next(context);
        logger.LogInformation("{Method} {Path} responded {Status} in {Elapsed}ms",
            context.Request.Method, context.Request.Path, context.Response.StatusCode, sw.ElapsedMilliseconds);
    }
}

/*
DEEPER BREAKDOWN:

Middleware runs in the order it is registered.
Exception handling middleware should be very early.

Endpoint filters are often a better choice than middleware for endpoint-specific logic.

JUNIOR PERSPECTIVE:

The pipeline is one of the most important architectural pieces of an ASP.NET Core app. Get the order and responsibilities right.

COMMON PITFALLS IN PRODUCTION:

- Authentication middleware after the endpoint.
- Doing heavy work in middleware that should be in the endpoint or a filter.
- Not short-circuiting when appropriate.
- Forgetting to call await next(context).

EXPERIMENTS:

1. Create middleware that adds a correlation ID if missing.
2. Compare middleware vs endpoint filter for authorization logic.
3. Profile the impact of middleware on request latency.

JUNIOR CHALLENGE:

Build a complete set of production middleware:
- Correlation ID propagation
- Request / response logging (structured)
- Global error handling returning ProblemDetails
- Rate limiting per user
Demonstrate correct ordering and short-circuit behavior.
*/