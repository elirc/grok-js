"""
Task Service Layer (Python)

This contains the actual business logic, similar to the services in the other two projects.
"""

from sqlalchemy.orm import Session
from ..models.task import Task
from ..schemas.task import TaskCreate, TaskUpdate

def get_all_tasks(db: Session):
    return db.query(Task).order_by(Task.created_at.desc()).all()

def create_task(db: Session, task_data: TaskCreate):
    db_task = Task(**task_data.dict())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def update_task(db: Session, task_id: int, task_data: TaskUpdate):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if not db_task:
        return None
    for key, value in task_data.dict(exclude_unset=True).items():
        setattr(db_task, key, value)
    db.commit()
    db.refresh(db_task)
    return db_task

def delete_task(db: Session, task_id: int):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if not db_task:
        return False
    db.delete(db_task)
    db.commit()
    return True
