/*
JUNIOR GOAL:
Build resilient error handling strategies beyond basic try/catch.

REAL WORLD USE CASE:
- API error boundaries
- Graceful degradation
- Logging and monitoring integration
- User-friendly error recovery

CONCEPTS COVERED:
- Custom error classes
- Error boundaries in thinking
- Centralized error handling
- Re-throwing vs swallowing
*/

// ============================================
// STEP 1: Custom error types
// ============================================

class ApiError extends Error {
  constructor(message, status, code) {
    super(message);
    this.status = status;
    this.code = code;
    this.name = 'ApiError';
  }
}

// ============================================
// STEP 2: Centralized handler
// ============================================

function handleError(error) {
  if (error instanceof ApiError) {
    if (error.status === 401) redirectToLogin();
    // log to monitoring service
  }
  console.error(error);
}

// ============================================
// STEP 3: Re-throwing with context
// ============================================

try {
  await riskyOperation();
} catch (error) {
  throw new Error(`Failed during checkout: ${error.message}`);
}

/*
DEEPER BREAKDOWN:

Custom errors carry more information.
Useful for different handling strategies.

Centralized handling reduces duplication.

JUNIOR PERSPECTIVE:

Good error handling is what separates toy apps from production systems.

COMMON PITFALLS IN PRODUCTION:

1. Catching and doing nothing.
2. Logging sensitive information.
3. Losing original error when wrapping.

EXPERIMENTS:

1. Create custom error classes for different domains.
2. Implement a retry wrapper that only retries on certain errors.

JUNIOR CHALLENGE:

Build an error handling utility that:
- Classifies errors (network, validation, auth, unknown)
- Logs to console + (fake) monitoring service
- Returns user-friendly messages
*/