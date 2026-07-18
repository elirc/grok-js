# SWE Thought Process Journal - grokbuildpython

## Why FastAPI?
- Extremely fast (one of the fastest Python web frameworks).
- Built-in async support.
- Automatic OpenAPI/Swagger documentation.
- Uses Pydantic for validation and data modeling (very similar to Zod in the JS world).
- Very popular in AI/ML startups and modern Python teams.

## Why SQLAlchemy instead of just raw SQL or Django ORM?
- More explicit control than Django.
- Works great with async (SQLAlchemy 2.0+ has good async support).
- Widely used in the industry.

## Key Python-specific things for juniors
- Type hints are very important in modern Python (especially with FastAPI + Pydantic).
- Async/await is used heavily for I/O.
- Dependency injection is done differently (using Depends()).

## Comparison to other stacks
- Similar mental model to the JS and C# versions (API layer, service layer, data layer).
- Python has a different "feel" — more explicit in some ways, more magic in others (decorators, Depends).

Read the code comments for line-by-line explanations of why things are structured this way.
