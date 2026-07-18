/*
JUNIOR GOAL:
Implement robust form handling with validation, accessibility, and user experience in mind.

REAL WORLD USE CASE:
- Signup and checkout forms
- Admin dashboards with complex inputs
- Real-time validation and debounced checks

CONCEPTS COVERED:
- Controlled vs uncontrolled inputs
- Validation strategies
- Debouncing and async validation
- Accessibility (aria)
*/

// ============================================
// STEP 1: Real validation pipeline
// ============================================

function validateEmail(email) {
  if (!email) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email';
  return null;
}

// ============================================
// STEP 2: Debounced validation
// ============================================

let timeout;
input.addEventListener('input', () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    const error = validateEmail(input.value);
    showError(error);
  }, 300);
});

// ============================================
// STEP 3: Submission handling
// ============================================

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const errors = validateAll(form);
  if (errors.length) {
    // show errors
    return;
  }
  // submit
});

/*
DEEPER BREAKDOWN:

Client-side validation is for UX.
Always validate on the server.

Debouncing prevents excessive work on every keystroke.

JUNIOR PERSPECTIVE:

Forms are deceptively complex.
Focus on clear error messages and not blocking the user unnecessarily.

COMMON PITFALLS IN PRODUCTION:

1. Only doing client validation.
2. Blocking submission on async validation without proper loading states.
3. Poor accessibility for error states.

EXPERIMENTS:

1. Add async validation that checks if a username is taken.
2. Implement a form that shows errors only after submit or blur.

JUNIOR CHALLENGE:

Create a form library (simple) that supports:
- Field level validation functions
- Form level validation
- Submission with loading and error states
*/