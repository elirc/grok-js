# SWE Thought Process Journal - grokbuildc#

## Why ASP.NET Core + EF Core?
- If a company is already in the Microsoft ecosystem (Azure, Windows, Office 365), .NET is a natural choice.
- EF Core is the standard ORM in the .NET world, similar to how Prisma is for JS.
- Minimal APIs are the modern, low-ceremony way to build APIs (like Express but with strong typing).

## Key Differences from JavaScript Version
- Strong typing is enforced by the compiler much more than in JS.
- Dependency Injection is built into the framework (no need to wire it manually like in Express).
- Entity Framework handles migrations differently (code-first with migrations).
- C# uses classes and records instead of plain objects/interfaces.

## Important Concepts for Juniors
- Controllers vs Minimal APIs: We used Minimal APIs here for simplicity and to reduce boilerplate.
- DbContext: This is the main object that talks to the database. It should usually be Scoped.
- Async/Await is everywhere in modern .NET because I/O operations are async by default.

## Tradeoffs
- More ceremony than Node.js/Express when starting a project.
- Excellent tooling (especially with Visual Studio or Rider).
- Very strong performance and long-term maintainability.

Read the comments in the code for line-by-line explanations.
