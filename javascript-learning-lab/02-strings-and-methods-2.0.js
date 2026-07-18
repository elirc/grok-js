/*
JUNIOR GOAL:
Master string manipulation patterns that appear in real applications: sanitization, formatting, parsing, and performance considerations.

REAL WORLD USE CASE:
- Normalizing user input for emails, usernames, and slugs
- Building dynamic URLs, log messages, and error strings
- Parsing CSV, query strings, and template data
- Internationalization and localization strings

CONCEPTS COVERED:
- Modern string methods and their performance
- Template literals vs concatenation at scale
- Regular expressions basics for strings
- String immutability and memory implications
- Building robust string utilities
*/

// ============================================
// STEP 1: Input normalization pipeline
// ============================================

function normalizeUsername(raw) {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '')
    .slice(0, 32);
}

// ============================================
// STEP 2: Safe template building
// ============================================

function buildApiUrl(base, path, params = {}) {
  const query = new URLSearchParams(params).toString();
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}${query ? `?${query}` : ''}`;
}

// ============================================
// STEP 3: Efficient string building for logs
// ============================================

function formatLogEntry(level, message, metadata = {}) {
  const timestamp = new Date().toISOString();
  // Avoid repeated + concatenation in hot paths
  return `[${timestamp}] ${level.toUpperCase()}: ${message} ${JSON.stringify(metadata)}`;
}

// ============================================
// STEP 4: Parsing with modern methods
// ============================================

function parseQueryString(queryString) {
  // Real apps often use URLSearchParams instead of manual splitting
  return Object.fromEntries(new URLSearchParams(queryString));
}

/*
DEEPER BREAKDOWN:

.replace(/[^a-z0-9_-]/g, '')
- Regex is powerful but can be expensive if overused in hot loops.
- Prefer built-in methods when possible for readability.

Template literals with ${}
- Generally preferred over + for readability.
- Still create new strings (all strings are immutable).

URLSearchParams
- Handles encoding/decoding correctly.
- Much safer than manual string splitting for query strings.

String immutability
- Every operation returns a new string.
- Repeated operations in loops can create memory pressure.

JUNIOR PERSPECTIVE:

In production, string handling often hides in logging, URL construction, and data normalization layers.
Bugs here usually manifest as security issues (XSS via unescaped strings) or data corruption.

COMMON PITFALLS IN PRODUCTION:

1. Not trimming user input before validation or storage.
2. Using regex without understanding backtracking performance.
3. Building HTML by concatenating strings (use proper templating or DOM methods).
4. Assuming locale when doing case conversion.

EXPERIMENTS:

1. Benchmark different ways to build a large string (concat vs array join vs template).
2. Write a slugify function that handles unicode characters safely.
3. Parse a complex query string with arrays and nested objects.

JUNIOR CHALLENGE:

Write a function that takes a raw product title and generates:
- A URL-safe slug
- A truncated version for meta descriptions (max 160 chars, clean word break)
- A version with dangerous characters escaped for HTML attribute use

Use modern string methods only.
*/