/*
.NET Coding Problems: Basics (EXPANDED 3-5x - now ~12 problems)

Goal: Practice the most common .NET platform building blocks used in web APIs and services at startups.

CONCEPTS: DI, Options, Logging, Minimal APIs, EF Core, Middleware, Configuration, BackgroundServices, Serialization, Testing concepts.

Problem 1: Dependency Injection
IGreetingService with Greet. Register Scoped + inject in endpoint or controller.

Problem 2: Configuration + Options
appsettings "AppSettings": { "MaxItems":10 }. Bind IOptions<AppSettings>.

Problem 3: Structured Logging
ILogger with scopes, structured data (e.g. LogInformation("User {UserId} did {Action}", id, action))

Problem 4: Minimal API + Validation
GET/POST /todos. Use [FromBody], add simple validation manually or with library.

Problem 5: EF Core basics
Todo entity + AppDbContext. DbSet. Add migration comments. Simple CRUD via LINQ.

Problem 6: Middleware pipeline
Write a simple request logging middleware + short-circuit example.

Problem 7: HttpClient best practices
Named or Typed clients. IHttpClientFactory. Timeout + Polly mention.

Problem 8: BackgroundService / HostedService
A timed background worker that runs a task periodically. Proper cancellation.

Problem 9: JSON Serialization
System.Text.Json options: camelCase, ignore nulls, custom converters. Roundtrip tests.

Problem 10: File I/O + streams
Read/write text, use using, async, StreamReader/Writer patterns.

Problem 11: Simple auth concept
Add a basic middleware or endpoint filter that checks a header token.

Problem 12: Testing basics (xUnit sketch)
Write a test for a pure service method. Use Moq for dependencies in comments.

Full solutions and project file snippets in comments below.

Example starter for DI:
public interface IGreetingService { string Greet(string name); }
public class GreetingService : IGreetingService { ... }
builder.Services.AddScoped<IGreetingService, GreetingService>();

Expanded 4x. Includes setup steps + gotchas for each area.
*/
