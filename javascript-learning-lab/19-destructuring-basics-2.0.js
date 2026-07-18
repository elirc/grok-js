/*
JUNIOR GOAL:
Use destructuring effectively to write cleaner code when dealing with complex data from APIs and function parameters.

REAL WORLD USE CASE:
- Extracting fields from API responses
- Function parameter handling
- Working with React props and state
- Configuration and options objects

CONCEPTS COVERED:
- Nested destructuring
- Default values in destructuring
- Renaming during destructuring
- Destructuring in loops and array methods
*/

// ============================================
// STEP 1: Nested destructuring from APIs
// ============================================

const { data: { user: { profile: { name = 'Anonymous' } = {} } = {} } } = response;

// ============================================
// STEP 2: Destructuring in function parameters
// ============================================

function updateSettings({ theme = 'light', notifications = true } = {}) {
  // ...
}

// ============================================
// STEP 3: With array methods
// ============================================

const [[firstKey, firstValue]] = Object.entries(userPreferences);

/*
DEEPER BREAKDOWN:

Nested destructuring
- Powerful but can become hard to read if overused.

Defaults in destructuring
- Great for configuration.

Renaming
- Useful when the source property name is not ideal.

JUNIOR PERSPECTIVE:

Destructuring reduces boilerplate significantly.
Balance conciseness with readability.

COMMON PITFALLS IN PRODUCTION:

1. Overly deep destructuring that breaks when API changes.
2. Forgetting defaults can hide bugs.
3. Destructuring non-iterable or null values.

EXPERIMENTS:

1. Destructure a complex nested object from a fake API response.
2. Write a function that safely destructures with many optional fields.

JUNIOR CHALLENGE:

Create a function that takes a product response object and destructures:
- name, price, and the first image url (with fallback)
- category name from a nested object
Return a clean flat object.
*/