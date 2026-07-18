"""
Pydantic Schemas for Task

These define the shape of data coming in and going out of the API.

Pydantic is similar to Zod in the JavaScript world:
- Validates data
- Provides great error messages
- Can generate TypeScript types (with tools)

We have separate schemas for Create and Update because they have different requirements.
"""

from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    completed: bool = False
    due_date: Optional[datetime] = None

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None
    due_date: Optional[datetime] = None

class Task(TaskBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True  # Allows creating from SQLAlchemy models
