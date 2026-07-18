"""
Example: SQLAlchemy Relationships and Sessions
"""

from sqlalchemy.orm import relationship, Session

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    tasks = relationship("Task", back_populates="user")

with Session(engine) as session:
    user = session.query(User).options(joinedload(User.tasks)).first()
    print(len(user.tasks))

"""
Relationships let you navigate the object graph. joinedload issues a single query with a JOIN instead of N+1 queries.

The Session is the unit of work. All changes inside the with block are flushed together when you commit (or at context exit in some configurations).

A junior should understand the difference between lazy loading, eager loading, and when to use each.
"""
