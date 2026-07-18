/*
JUNIOR GOAL:
Build production-grade forms with proper validation, performance, and user experience.

REAL WORLD USE CASE:
- Checkout and signup flows
- Complex admin forms
- Multi-step wizards

CONCEPTS COVERED:
- Fully controlled forms
- Form libraries thinking (without using them)
- Validation timing (onChange, onBlur, onSubmit)
- Performance with many inputs
*/

// ============================================
// STEP 1: Form state management
// ============================================

const [form, setForm] = useState({ email: '', password: '' });

function updateField(field, value) {
  setForm(prev => ({ ...prev, [field]: value }));
}

// ============================================
// STEP 2: Validation on submit + blur
// ============================================

const [errors, setErrors] = useState({});

function validate() {
  // run validation
}

// ============================================
// STEP 3: Performance
// ============================================

// For very large forms, consider uncontrolled inputs + refs or form libraries.

/*
DEEPER BREAKDOWN:

Controlled forms give you full power but can cause re-renders.
Balance is important.

Validation strategy has big UX impact.

JUNIOR PERSPECTIVE:

Forms are one of the most common sources of complexity in web apps.

COMMON PITFALLS IN PRODUCTION:

1. Re-rendering the entire form on every keystroke unnecessarily.
2. Showing validation errors too aggressively.
3. Not resetting form state properly after submit.

EXPERIMENTS:

1. Implement debounced validation.
2. Add support for arrays of fields (dynamic form sections).

JUNIOR CHALLENGE:

Build a form with at least 5 fields, client validation, and the ability to add/remove dynamic sections (e.g. multiple addresses).
*/