"""
Example: Type Hints and Runtime Validation with Pydantic
"""

from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price: float
    tags: list[str] = []

def process(item: Item) -> dict:
    return {"name": item.name.upper(), "price": item.price * 1.1}

"""
Type hints are checked by static tools (mypy, pyright) but not at runtime by default.

Pydantic models give you both: great editor support and runtime validation + coercion.

A junior should use type hints everywhere and Pydantic (or similar) at every I/O boundary.
"""
