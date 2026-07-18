/*
JUNIOR GOAL:
Work with fetch in a more robust way including error handling, retries, and proper response processing.

REAL WORLD USE CASE:
- API clients in frontend applications
- Data fetching layers
- Handling different HTTP status codes

CONCEPTS COVERED:
- Response.ok and status codes
- Proper error handling
- Request configuration (headers, credentials)
- Aborting requests
*/

// ============================================
// STEP 1: Robust fetch wrapper
// ============================================

async function apiFetch(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res.json();
}

// ============================================
// STEP 2: Request cancellation
// ============================================

const controller = new AbortController();

fetch('/data', { signal: controller.signal })
  .catch(err => {
    if (err.name === 'AbortError') console.log('Cancelled');
  });

// ============================================
// STEP 3: Retries (basic)
function fetchWithRetry(url, retries = 3) {
  // Implementation with exponential backoff would go here
}

/*
DEEPER BREAKDOWN:

Always check res.ok.
Different status codes may need different handling.

AbortController is important for avoiding race conditions and memory leaks.

JUNIOR PERSPECTIVE:

Raw fetch is powerful but requires discipline around errors and loading states.

COMMON PITFALLS IN PRODUCTION:

1. Not handling non-2xx responses.
2. Swallowing errors silently.
3. Not cleaning up in-flight requests when components unmount.

EXPERIMENTS:

1. Implement basic retry logic with delays.
2. Add loading and error state tracking.

JUNIOR CHALLENGE:

Create a reusable fetcher that supports:
- Automatic JSON parsing
- Error normalization
- Optional abort signal
- Simple retry on network errors
*/