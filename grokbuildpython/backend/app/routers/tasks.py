"""
TASKS ROUTER - FastAPI Endpoints

This file defines the HTTP API for tasks.

Key FastAPI concepts shown here:
- Path operations (get, post, etc.)
- Dependency injection with Depends
- Request/response models using Pydantic schemas
- Automatic validation and documentation

Compare this file to the Express routes in grokbuildjs and the Minimal API endpoints in grokbuildc#.
The mental model is very similar even though the syntax is different.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..schemas import task as task_schema
from ..services import task_service
from ..database import get_db

router = APIRouter()

@router.get("/")
def get_tasks(db: Session = Depends(get_db)):
    tasks = task_service.get_all_tasks(db)
    return {"data": tasks}

@router.post("/")
def create_task(task: task_schema.TaskCreate, db: Session = Depends(get_db)):
    return {"data": task_service.create_task(db, task)}

@router.put("/{task_id}")
def update_task(task_id: int, task: task_schema.TaskUpdate, db: Session = Depends(get_db)):
    updated = task_service.update_task(db, task_id, task)
    if not updated:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"data": updated}

@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    success = task_service.delete_task(db, task_id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Deleted"}
