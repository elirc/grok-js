# Fable Learning Lab

A self-study problem lab: **200 problems with worked solutions**, built to take you from
new coder to a mid-level developer who can build and maintain a CRUD web application.

## The files

| File | Focus |
|------|-------|
| [01-javascript.md](01-javascript.md) | Core language: data, functions, async, fetch, building a CRUD data layer |
| [02-typescript.md](02-typescript.md) | Types, generics, narrowing, typing APIs and a typed CRUD service |
| [03-react.md](03-react.md) | Components, state, forms, effects, hooks, a full CRUD UI |
| [04-csharp.md](04-csharp.md) | C# fundamentals, LINQ, async, and an ASP.NET Core CRUD API |

## Suggested order

JavaScript → TypeScript → React → C#. Each file is ordered easiest-first and the last
~10 problems in each file assemble the earlier skills into real CRUD-app patterns
(API clients, repositories, forms, endpoints).

## How to use it

1. Read the problem. **Write your own attempt before looking at the solution.**
2. Compare your attempt to the worked solution — the differences are the lesson.
3. Re-do any problem from memory a few days later if it felt hard.

Run JavaScript problems in Node or the browser console (that chapter's intro names the
few browser-only or module-syntax exceptions), TypeScript problems in the TypeScript
Playground or a local `tsc` project, React problems in a Vite project
(`npm create vite@latest`), and C# problems in a console app or minimal API project
(`dotnet new console` / `dotnet new web`).

Many problems are cumulative: later ones reuse names defined earlier (e.g. JavaScript 46–47
extend the store from 45; TypeScript 42–50 share the `Project` types from 41). Paste the
earlier solution into the same file before running a later one.

## Companion lessons elsewhere in the grok-js repo

The problems are self-contained, but each chapter lines up with a longer-form lab in the
[grok-js](https://github.com/elirc/grok-js) repo if you want the comment-heavy walkthrough
of a topic first:

| Chapter | Companion lab folder |
|---------|----------------------|
| 01-javascript | `javascript-learning-lab/` (lessons 01–40) |
| 02-typescript | `javascript-learning-lab/typescript-basics/` |
| 03-react | `javascript-learning-lab/react-basics/` |
| 04-csharp | `csharp-learning-lab/` (1–36), `dotnet-learning-lab/` (37–50: DI, minimal API, EF, middleware) |
