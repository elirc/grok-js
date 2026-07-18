/*
Advanced Middleware in ASP.NET Core (EXPANDED 3-5x)

Example 1: Custom middleware (inline + class style)
app.Use(async (context, next) => {
  var sw = Stopwatch.StartNew();
  await next();
  sw.Stop();
  Console.WriteLine($"Took {sw.ElapsedMilliseconds}ms");
});

public class TimingMiddleware
{
    private readonly RequestDelegate _next;
    public TimingMiddleware(RequestDelegate next) => _next = next;
    public async Task Invoke(HttpContext ctx)
    {
        // logic before + after
        await _next(ctx);
    }
}

Example 2: Conditional UseWhen
app.UseWhen(ctx => ctx.Request.Path.StartsWithSegments("/api"), b => b.UseAuthentication());

Example 3: Branch pipelines with Map
app.Map("/admin", admin => {
    admin.UseAuthorization();
    admin.Run(async ctx => await ctx.Response.WriteAsync("Admin area"));
});

Example 4: Exception handling + ProblemDetails
app.UseExceptionHandler(a => a.Run(async ctx => {
    ctx.Response.StatusCode = 500;
    await ctx.Response.WriteAsJsonAsync(new { error = "something broke" });
}));

Example 5: CORS, Routing, StaticFiles, Endpoints order demonstration

Example 6: Terminal middleware (app.Run) vs non-terminal (next())

EXPANDED PROBLEMS:
1. Timing + correlation ID middleware (set header on req and resp).
2. Exception handler that always returns RFC7807 ProblemDetails JSON.
3. Simple rate limit using in-memory store + 429 response.
4. Maintenance mode middleware that short circuits all but health.
5. Auth header validation branch only for certain paths.
6. Response header injection after the rest of pipeline.
7. Multiple Map branches: /public, /private, /api/v1.
8. Middleware that enriches ILogger with scope data.

Pipeline order is critical. Study comments for why things are registered where they are.
*/
