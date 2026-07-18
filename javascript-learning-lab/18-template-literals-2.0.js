/*
JUNIOR GOAL:
Use template literals effectively for complex string construction, including tagged templates and multi-line content.

REAL WORLD USE CASE:
- Building SQL queries safely (with libraries)
- Internationalization strings
- Dynamic log messages and error reports
- HTML generation in non-React contexts

CONCEPTS COVERED:
- Tagged template literals
- Expression interpolation best practices
- Multi-line strings and indentation
- Performance in hot paths
*/

// ============================================
// STEP 1: Tagged templates
// ============================================

function safeHTML(strings, ...values) {
  return strings.reduce((acc, str, i) => {
    return acc + str + (values[i] ? escapeHtml(values[i]) : '');
  }, '');
}

const html = safeHTML`<div>${userInput}</div>`;

// ============================================
// STEP 2: Complex interpolation
// ============================================

function createErrorMessage(error) {
  return `Error: ${error.code} - ${error.message}\nOccurred at: ${new Date().toISOString()}`;
}

// ============================================
// STEP 3: Indentation control
// ============================================

const query = `
  SELECT id, name
  FROM users
  WHERE active = true
`.trim();

/*
DEEPER BREAKDOWN:

Tagged templates give you full control over how the string is built.
Useful for escaping, formatting, or even parsing.

JUNIOR PERSPECTIVE:

Template literals are the default for string construction.
Learn when to extract formatting logic into helpers.

COMMON PITFALLS IN PRODUCTION:

1. Building SQL or HTML without sanitization using templates.
2. Very long template literals that are hard to read.
3. Indentation artifacts in multi-line strings.

EXPERIMENTS:

1. Implement a simple tagged template for currency formatting.
2. Create a template tag that trims and normalizes whitespace.

JUNIOR CHALLENGE:

Write a tagged template sql that safely interpolates values and returns both the query string and parameters array (for prepared statements).
*/