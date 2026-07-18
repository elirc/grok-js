"""
BEGINNER GOAL:
Learn context managers — the clean way to handle setup and cleanup (especially files).

REAL WORLD USE CASE:
Working with files, database connections, locks, and any resource that needs to be closed.

CONCEPTS COVERED:
- The with statement
- Why it's better than try/finally
- Creating your own context manager with __enter__ and __exit__
"""

# ============================================
# STEP 1: Using with for files (best practice)
# ============================================

with open("example.txt", "w") as f:
    f.write("Hello from Python!")
# File is automatically closed here

# ============================================
# STEP 2: Custom context manager
# ============================================

class DatabaseConnection:
    def __enter__(self):
        print("Connecting to database...")
        return self   # What gets assigned to the 'as' variable

    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Closing database connection...")
        # Clean up code here

    def query(self, sql):
        print(f"Running: {sql}")

with DatabaseConnection() as db:
    db.query("SELECT * FROM users")


"""
LINE-BY-LINE BREAKDOWN:

with open(...) as f:
- Opens the file
- Assigns it to f
- Automatically closes it when the block ends (even if error occurs)

def __enter__(self):
- Runs when entering the with block
- Return value goes to the 'as' variable

def __exit__(self, ...):
- Always runs when leaving the block
- Great for cleanup

NOOB TRANSLATION:

Context managers are like "do this setup, run my code, then do this cleanup no matter what."

The with statement guarantees cleanup happens.

COMMON MISTAKES:

1. Forgetting to close files (use with instead of manual close)
2. Not handling exceptions inside __exit__
3. Using with on things that don't support it

TRY CHANGING THIS:

1. Use with to read a file and print its contents.
2. Add exception handling inside __exit__.
3. Create a timer context manager that prints how long the block took.

MINI CHALLENGE:

Create a simple Timer context manager that prints the time taken when exiting the block.
Use it around a small loop.
"""
