/*
Advanced FastAPI Examples in Python

Example 1: Dependency injection for DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/items")
def read_items(db: Session = Depends(get_db)):

Example 2: Pydantic models for validation
class Item(BaseModel):
    name: str
    price: float

Example 3: Background tasks
@app.post("/items")
def create(item: Item, background: BackgroundTasks):
    background.add_task(send_email, item.name)

Problems:
1. Add pagination to list endpoint.
2. Implement JWT auth dependency.
3. Use SQLAlchemy relationships for nested queries.
*/
