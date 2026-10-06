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
Start after you have some comfort with the C# language (from `csharp-learning-lab`).

The 12 topics, in file order (each has a basic file and a `-2.0` file):
01 project structure, 02 dependency injection, 03 configuration, 04 logging,
05 file I/O, 06 HttpClient, 07 minimal APIs, 08 Entity Framework Core,
09 middleware, 10 testing, 11 serialization, 12 background services.

## Notes
- All code is educational. Some snippets are self-contained; others assume a standard .NET 8+ project.
- Prefer .NET 8+ for new learning.
- Use `dotnet new console` or `dotnet new webapi` to experiment.

This folder builds on the C# language knowledge to teach the broader .NET ecosystem used in real applications.

---

## Expanded Examples and Coding Problems

`examples/` holds 162 narrated example files (about 1,600 across all grokjs labs). Topics include DI lifetimes, EF Core efficient querying, minimal APIs, HttpClient resilience, background services, and more platform patterns. All written to help junior engineers understand not just the syntax but the reasoning.

---

## New Teaching Approaches (Added 2026)

Some .NET topics also include:

- `-think-predict.cs`
- `-bug-hunt.cs`
- `-narrative.cs`

All three exist for 02 DI, 04 logging, 05 file I/O, 07 minimal APIs, 08 EF Core, 09 middleware, and 12 background services. 01 project structure and 10 testing have a think-predict file only. 03, 06, and 11 have none.

