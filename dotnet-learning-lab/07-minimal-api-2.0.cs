/*
JUNIOR GOAL:
Build production-ready Minimal APIs with proper structure, validation, and observability.

REAL WORLD USE CASE:
Lightweight internal APIs, BFFs (Backend for Frontend), and microservices where controller overhead is unnecessary.

CONCEPTS COVERED:
- Endpoint filters
- Validation with Minimal APIs
- OpenAPI / Swagger integration
- ProblemDetails for error responses
- Rate limiting and other built-in middleware
*/

// ============================================
// STEP 1: Structured endpoints with filters
// ============================================

app.MapPost("/orders", async (CreateOrderCommand cmd, IOrderService service) =>
{
    var result = await service.Create(cmd);
    return result.IsSuccess ? Results.Ok(result.Value) : Results.BadRequest(result.Error);
})
.AddEndpointFilter<ValidationFilter<CreateOrderCommand>>();

// ============================================
// STEP 2: Proper error handling
// ============================================

app.UseExceptionHandler();
app.UseStatusCodePages();

/*
DEEPER BREAKDOWN:

Minimal APIs have matured significantly in .NET 7/8.
Endpoint filters are the equivalent of action filters.

Always return proper ProblemDetails for errors.

JUNIOR PERSPECTIVE:

Minimal APIs are great when you keep them small and well-organized. For complex APIs, the controller pattern can still be clearer.

COMMON PITFALLS IN PRODUCTION:

- Putting too much logic directly in the endpoint delegate.
- Not using filters or middleware for cross-cutting concerns.
- Poor OpenAPI documentation.

EXPERIMENTS:

1. Add model validation and return 400 ProblemDetails.
2. Create a reusable filter for logging and timing.
3. Add rate limiting to an endpoint.

JUNIOR CHALLENGE:

Convert a small controller-based API to Minimal API and compare:
- Lines of code
- Testability
- OpenAPI quality
- How easy it is to add authentication + authorization
*/