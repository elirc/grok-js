# grokbuildc# - Fullstack Task CRUD App (Educational)

**Goal:** Level up from noob to junior SWE using ASP.NET Core + React.

## Stack Choices (Popular in .NET startups)
- Backend: ASP.NET Core Web API (Minimal APIs) + Entity Framework Core + PostgreSQL
- Frontend: Vite + React + TypeScript + Tailwind + TanStack Query
- Why this combo: Very common in companies that already use Microsoft stack or want strong typing end-to-end.

See JOURNAL.md for the full thought process of a senior engineer building this.

The examples/ folder contains narrated walkthroughs of Minimal APIs, EF usage, etc.

## Status (checked 2026-10-06): a read-along skeleton

- `backend/` holds only `Program.cs` (endpoints plus `AppDbContext`) and `Models/TaskItem.cs`. There is no `.csproj`, so `dotnet run` has nothing to build. `Program.cs` also has `using grokbuildcsharps.Backend.Data;`, but no file declares that namespace.
- `frontend/` contains only `src/api/tasks.ts` and `src/pages/TasksPage.tsx`, with no `package.json`. Tailwind and TanStack Query are the intended stack, not installed dependencies.
- To run it: `dotnet new web`, add the EF Core + Npgsql packages, and move these files in.
