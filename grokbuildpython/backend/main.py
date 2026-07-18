"""
MAIN FASTAPI APPLICATION - grokbuildpython

This is the entry point for the Python backend.

Why FastAPI?
- Excellent developer experience
- Automatic validation with Pydantic
- Async support out of the box
- Auto-generated docs at /docs

How the pieces connect:
main.py → routers → services → database (SQLAlchemy)

We use dependency injection via FastAPI's Depends() for the database session.
This is the idiomatic way in FastAPI.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import tasks

app = FastAPI(title="grokbuildpython API")

# Allow frontend (React on different port) to call us
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, lock this down
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the tasks router
app.include_router(tasks.router, prefix="/api/tasks", tags=["tasks"])

@app.get("/health")
async def health():
    return {"status": "ok"}
