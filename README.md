# grokjs Project Review & Guide

## What This Project Is (Review - June 2026)

**grokjs** is a large, multi-language collection of **beginner-to-junior educational coding materials**. It is *not* a single app or library — it is a set of self-study "learning labs" across four primary languages/ecosystems:

### Core Labs
- **javascript-learning-lab/** — The flagship and largest. 40 numbered lessons (01–30 with `-2.0` companions and, for most topics, think-predict / bug-hunt / narrative variants; 31–40 are single-file advanced topics such as closures, the event loop, and generators), a React basics sub-lab (`react-basics/`, 22 lessons), a TypeScript basics sub-lab (`typescript-basics/`), coding-problems, examples, and a runnable `practice/` test-driven drill system.
- **python-learning-lab/** — 30 sequential lessons with the same comment-heavy style, plus problems and examples. No `-2.0` files; 16 topics have a think-predict variant.
- **csharp-learning-lab/** — 19 topics, each with a basic + `-2.0` file, covering language fundamentals.
- **dotnet-learning-lab/** — 12 .NET platform topics (DI, EF, middleware, etc), each with a basic + `-2.0` file. Companion to the C# lab.
- **Fable Learning Lab/** — a different format: 200 problems with worked solutions (50 each for JavaScript, TypeScript, React, C#), each chapter ending in a CRUD-app build. Start at its `README.md`.

### Additional Areas
- **grokbuildjs / grokbuildpython / grokbuildc#** — "Build a real modern full-stack app from scratch" guided projects (backend + frontend + docker-compose), each with a README, a PHASE2 plan, and a JOURNAL. These show how to apply the fundamentals in realistic small startup-style projects.
- Supporting practice systems, mini HTML, package configs for JS testing.

## Original Teaching Approach (the "standard" style)
Every core file follows a highly consistent pattern:
- Top header block: BEGINNER GOAL / REAL WORLD USE CASE / CONCEPTS COVERED
- Numbered STEP sections with runnable code
- Extremely dense inline comments explaining nearly every line
- Bottom teaching sections: LINE-BY-LINE BREAKDOWN, NOOB TRANSLATION (analogy), COMMON MISTAKES, TRY CHANGING THIS, MINI CHALLENGE
- Designed for "read → type → experiment → repeat"
- Many topics have both a "basics" file and a "-2.0" file for deeper/junior-level treatment

## Alternative Teaching Approaches (2026 Expansion)

Alongside the classic lessons, many topics have three extra files using different pedagogies, same topic and examples:
- **think-predict** — predict the output before running, for active recall
- **bug-hunt** — find and fix planted bugs before peeking at the answers
- **narrative** — the topic told as a small story/mini-project, for motivation and context

Coverage is partial, not every topic has all three. Counts of top-level lesson variants (think-predict / bug-hunt / narrative): JavaScript 24 / 22 / 22, Python 16 / 10 / 9, C# 10 / 9 / 9, .NET 9 / 7 / 7.

The **examples/** folders across all labs and grokbuild projects hold about 1,600 short example files: concrete code followed by plain-English narration of *why* it is written that way.

See the individual lab READMEs for the files per topic.

## Recommended Way to Use the Material

One rotation per topic:
1. Read the standard lesson (exposition)
2. Attempt the think-predict version cold
3. Try the bug hunt (find/fix before peeking at answers)
4. Read the narrative version while imagining building your own version of the mini-project
5. Then tackle the corresponding coding-problem or practice drill

Skip any step whose variant file doesn't exist for that topic.

## Running Code

Node for JS (`node 01-variables-and-values.js`), `python` for .py, and `dotnet run` (or paste into a console app) for C#/.NET. The JS lab's `practice/` drills have their own runners (plain Node for core JS, `tsc` for TypeScript, Vitest for React) — see `javascript-learning-lab/README.md`.

## Philosophy

- Small files, one idea at a time
- Real-ish scenarios (shopping, users, dashboards, pets, recipes, budgets)
- Comments are your patient teacher
- Experiment, break things, fix them
