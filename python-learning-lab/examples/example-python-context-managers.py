"""
Example: Context Managers for Resource Management
"""

from contextlib import contextmanager
import sqlite3

# Built-in context manager
with open("data.txt", "w") as f:
    f.write("hello\n")

# Custom context manager using decorator
@contextmanager
def db_connection(path):
    conn = sqlite3.connect(path)
    try:
        yield conn
    finally:
        conn.close()

with db_connection(":memory:") as conn:
    conn.execute("CREATE TABLE users (id INTEGER)")
    print("Table created inside context")

print("Connection is guaranteed to be closed even if exceptions occur")

"""
The with statement guarantees that the __exit__ method (or the code after yield in a contextmanager) will run no matter how the block exits, including exceptions.

This is the idiomatic way to handle files, database connections, locks, and any other resource that must be cleaned up. Relying on manual close() calls is error-prone because an early return or exception can skip the cleanup.

The contextmanager decorator lets you write the setup/teardown logic in a single function using yield. It is the quickest way to create your own context managers for application-specific resources.

A junior should develop a reflex: whenever you see "open", "connect", "lock", or "start", ask whether a context manager exists or should be written.
"""
