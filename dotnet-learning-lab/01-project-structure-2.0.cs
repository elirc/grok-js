/*
JUNIOR GOAL:
Design and structure .NET projects professionally for maintainability, testability, and deployment in real teams.

REAL WORLD USE CASE:
Monorepos, clean architecture, vertical slice architecture, and preparing code for CI/CD and containerization.

CONCEPTS COVERED:
- Project references vs package references
- Solution folder organization
- src / tests layout
- Directory.Build.props for shared settings
- Minimal API vs Controller-based structure decisions
*/

// ============================================
// STEP 1: Recommended folder structure
// ============================================

/*
MyApp/
├── src/
│   ├── MyApp.Domain/
│   ├── MyApp.Application/
│   ├── MyApp.Infrastructure/
│   └── MyApp.Api/
├── tests/
│   ├── MyApp.UnitTests/
│   └── MyApp.IntegrationTests/
└── MyApp.sln
*/

// ============================================
// STEP 2: Shared configuration
// ============================================

// Directory.Build.props
/*
<Project>
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <TreatWarningsAsErrors>true</TreatWarningsAsErrors>
  </PropertyGroup>
</Project>
*/

// ============================================
// STEP 3: When to split projects
// ============================================

// Use separate projects for:
- Domain (pure business rules, no dependencies)
- Application (use cases, DTOs)
- Infrastructure (EF, external services)
- Api / Web (entry point)

/*
DEEPER BREAKDOWN:

Good project structure enforces boundaries and makes dependency direction clear (Api → Application → Domain).

Directory.Build.props and .targets files reduce duplication across many projects.

Vertical slices (feature folders) are often better than strict layered architecture for smaller services.

JUNIOR PERSPECTIVE:

At this level you should be able to justify why a piece of code lives in a particular project and be able to explain the dependency graph.

COMMON PITFALLS IN PRODUCTION:

- Circular project references.
- Putting infrastructure code in the Domain project.
- Over-fragmenting into too many tiny projects early on.
- Inconsistent target frameworks and nullable settings across the solution.

EXPERIMENTS:

1. Create a small solution with Domain, Application, Infrastructure, and Api projects.
2. Move a feature into a vertical slice folder and compare.
3. Add a Directory.Build.props that sets common analyzers.

JUNIOR CHALLENGE:

Restructure an existing small .NET solution using clean architecture principles.
Document the dependency rules and ensure the compiler (or analyzers) enforces that Domain has no dependencies on other layers.
*/