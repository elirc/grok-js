/*
BEGINNER GOAL:
Understand the middleware pipeline in ASP.NET Core.

REAL WORLD USE CASE:
Logging, authentication, error handling, CORS, rate limiting — all implemented as middleware.

CONCEPTS COVERED:
- What is middleware
- app.Use, app.Map
- Order matters
- Writing custom middleware
*/

// ============================================
// STEP 1: Built-in middleware
// ============================================

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

// ============================================
// STEP 2: Custom middleware
// ============================================

app.Use(async (context, next) =>
{
    Console.WriteLine($"Request: {context.Request.Path}");
    await next();                    // Call the next middleware
    Console.WriteLine("Response sent");
});

// ============================================
// STEP 3: Terminal middleware
// ============================================

app.Run(async context =>
{
    await context.Response.WriteAsync("Hello");
});

/*
LINE-BY-LINE BREAKDOWN:

Use
- Adds middleware that can call the next one

await next()
- Passes control to the next middleware in the pipeline

Run
- Short-circuits the pipeline (terminal)

NOOB TRANSLATION:

Middleware is a chain of components that process every HTTP request.

COMMON MISTAKES:

1. Wrong order of middleware (auth after the endpoint).
2. Forgetting to call next().
3. Doing heavy work in middleware.

TRY CHANGING THIS:

1. Add logging middleware.
2. Create middleware that adds a response header.

MINI CHALLENGE:

Write middleware that measures how long a request takes and logs it.
*/