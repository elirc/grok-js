/*
BEGINNER GOAL:
Build simple web APIs using Minimal APIs in ASP.NET Core.

REAL WORLD USE CASE:
Lightweight APIs, microservices, internal tools.

CONCEPTS COVERED:
- WebApplication builder
- MapGet, MapPost, etc.
- Dependency injection in endpoints
- Basic routing
*/

// ============================================
// STEP 1: Basic minimal API
// ============================================

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/hello", () => "Hello World!");

app.MapGet("/users/{id}", (int id) => $"User {id}");

app.Run();

/*
LINE-BY-LINE BREAKDOWN:

WebApplication.CreateBuilder
- Sets up the host, DI container, configuration

MapGet
- Defines an HTTP GET endpoint

app.Run()
- Starts the web server

NOOB TRANSLATION:

Minimal APIs let you create web endpoints with very little code.

COMMON MISTAKES:

1. Forgetting app.Run().
2. Not using proper HTTP methods.
3. Putting too much logic directly in the endpoint.

TRY CHANGING THIS:

1. Add a POST endpoint that accepts JSON.
2. Return a typed object instead of string.

MINI CHALLENGE:

Create endpoints for:
- GET /products → list of products
- GET /products/{id}
- POST /products (add new)
*/