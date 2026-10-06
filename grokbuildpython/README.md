# grokbuildpython - Fullstack Task CRUD App (Educational)

**Goal:** Learn modern Python backend (FastAPI) + React frontend.

## Stack
- Backend: FastAPI + SQLAlchemy + Pydantic + PostgreSQL
- Frontend: Vite + React + TypeScript + Tailwind + TanStack Query

FastAPI is extremely popular in startups right now because of its speed, automatic docs, and great Pydantic integration.

The examples/ folder has expanded narrated samples for Pydantic models, SQLAlchemy, async patterns, etc.

See JOURNAL.md for detailed thought process.

## Status (checked 2026-10-06): a read-along skeleton

- `backend/app/database.py` defaults to **SQLite** (`sqlite:///./test.db`). The PostgreSQL URL is commented out, so the `docker-compose.yml` Postgres is optional until you switch it.
- `backend/main.py` uses `from .routers import tasks`, but `routers/` lives in `backend/app/`, so that import needs fixing before `uvicorn` will start.
- `frontend/` contains only `src/api/tasks.ts` and `src/pages/TasksPage.tsx`, with no `package.json` or Vite setup.
