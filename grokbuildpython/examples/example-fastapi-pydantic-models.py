"""
Example: Pydantic Models for Request/Response in FastAPI
"""

from pydantic import BaseModel, Field
from typing import Optional

class TaskCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    priority: int = Field(1, ge=1, le=5)

class TaskRead(TaskCreate):
    id: int
    created_at: datetime

@app.post("/tasks", response_model=TaskRead)
def create_task(payload: TaskCreate):
    task = service.create(payload.model_dump())
    return task

"""
Pydantic models validate incoming JSON and provide automatic OpenAPI docs. The response_model strips any fields you don't want to expose to clients.

model_dump() converts the validated model into a plain dict that the service layer can use without depending on Pydantic.

A junior should define request and response models for every endpoint. It acts as both documentation and a guardrail.
"""
