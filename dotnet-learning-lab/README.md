# .NET Basics

Companion to the C# Basics folder. This collection focuses on .NET platform concepts, libraries, and patterns rather than pure language syntax.

## Goals
- Same educational style as the rest of the grokjs learning labs
- Each file focuses on one .NET area with realistic examples
- Detailed comments explaining concepts, lines, and gotchas

## How to Use
- These are meant to be read alongside C# language files.
- Many examples assume a basic console or class library project.
- For ASP.NET examples, read the comments even if you don't run a full web app immediately.

## Recommended Order
Start after you have some comfort with C# language (from csharp-basics).

Topics include:
- Project structure and SDK
- Dependency Injection
- Configuration
- Logging
- File I/O and streams
- HTTP and APIs (HttpClient, minimal APIs)
- Entity Framework Core basics
- Async patterns in .NET
- Testing
- Serialization
- Middleware and hosting
- Performance and diagnostics

## Notes
- All code is educational. Some snippets are self-contained; others assume a standard .NET 8+ project.
- Prefer .NET 8+ for new learning.
- Use `dotnet new console` or `dotnet new webapi` to experiment.

This folder builds on the C# language knowledge to teach the broader .NET ecosystem used in real applications.

---

## Expanded Examples and Coding Problems

The examples/ folder is part of the literal ~20x expansion (1,500+ total narrated examples project-wide). Topics include DI lifetimes, EF Core efficient querying, minimal APIs, HttpClient resilience, background services, and more platform patterns. All written to help junior engineers understand not just the syntax but the reasoning.

---

## New Teaching Approaches (Added 2026)

Core .NET topics now also include:

- `-think-predict.cs`
- `-bug-hunt.cs`
- `-narrative.cs`

Same philosophy, different learning style for DI, EF, logging, minimal APIs, testing, etc.

