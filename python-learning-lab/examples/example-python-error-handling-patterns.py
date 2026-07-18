"""
Example: Structured Exception Handling and Custom Exceptions
"""

class ValidationError(Exception):
    pass

def process_amount(amount: float):
    if amount < 0:
        raise ValidationError("Amount cannot be negative")
    ...

try:
    process_amount(-5)
except ValidationError as e:
    log.warning("Bad input", extra={"error": str(e)})
except Exception as e:
    log.exception("Unexpected failure")

"""
Catch specific exceptions first. Use custom exception types for domain errors so callers can handle them differently from generic failures.

Always log with context. Never silently swallow exceptions unless you have a very good reason documented in the code.

A junior should treat exceptions as part of the API design, not just crash reporting.
"""
