# grokbuildjs - Fullstack Task CRUD App (Educational)

**Goal:** Help a noob coder level up to junior SWE by building a real fullstack app with modern startup tech.

## Tech Stack Choices (Why these are popular in startups 2025-2026)

### Backend
- **Node.js + Express + TypeScript**: Fast to iterate, huge ecosystem. TypeScript adds safety that juniors need to learn early.
- **Prisma**: Modern ORM. Excellent DX, great migrations, type-safe queries. Much better for learning than raw SQL or older ORMs.
- **PostgreSQL**: Industry standard relational DB. Most startups use it (or start with it).
- **Zod**: Runtime + compile-time validation. Essential for APIs.

### Frontend
- **Vite + React + TypeScript**: Fastest dev experience. TypeScript is non-negotiable for junior growth.
- **@tanstack/react-query**: Handles caching, loading states, refetching. Replaces a ton of boilerplate useEffect + useState.
- **React Hook Form + Zod**: Best-in-class form handling + validation.
- **Tailwind CSS**: Fast styling, used everywhere in startups.
- **React Router**: Client-side routing.

### DevOps / Other
- Docker + docker-compose for consistent Postgres dev environment.
- No overkill (no NestJS, no Next.js fullstack, no tRPC) — we want to show clear frontend/backend separation.

## Project Structure (files actually in the repo)

```
grokbuildjs/
├── backend/                 # Express + Prisma API
│   ├── package.json
│   ├── prisma/schema.prisma # Prisma schema (PostgreSQL, DATABASE_URL from .env)
│   └── src/
│       ├── index.ts         # Express app setup
│       ├── routes/tasks.ts  # API route handlers + Zod validation
│       └── services/taskService.ts  # Business logic
├── frontend/                # React app (Vite)
│   ├── package.json
│   └── src/
│       ├── main.tsx         # QueryClientProvider + root render
│       ├── api/tasks.ts     # API client functions (TanStack Query friendly)
│       └── pages/TasksPage.tsx
├── coding-problems/problem-01-api.ts
├── examples/                # narrated examples
├── docker-compose.yml       # Postgres 16 for local dev
├── JOURNAL.md               # Thought process of a senior SWE
├── PHASE2.md                # proposed next features (not built)
└── README.md
```

## Status (checked 2026-10-06): a read-along skeleton, not a runnable app

The code files are the teaching core, but the scaffolding needed to run them is missing.
The backend has no `tsconfig.json` or `.env`. The frontend has no `index.html`, Vite
config, Tailwind config, or the `index.css` that `main.tsx` imports. Of the stack listed
above, React Hook Form is not a dependency, and React Router is listed in `package.json` but never imported.
Read the files in the order JOURNAL.md builds them. To run it, scaffold a fresh Vite app
and Express project and move these files in.

This project has **extensive comments** explaining:
- Why we chose certain patterns
- What specific lines do
- How frontend talks to backend
- Tradeoffs juniors should know about

The `examples/` folder contains many additional narrated code examples for API design, Zod validation, Prisma, React Query, Docker, etc.

Start by reading `JOURNAL.md` first, then explore the code.
