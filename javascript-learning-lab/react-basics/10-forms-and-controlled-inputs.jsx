/*
BEGINNER GOAL:
Learn how to handle forms in React using controlled components.

REAL WORLD USE CASE:
Login forms, signup forms, contact forms, search bars, checkout forms — almost every app has them.

CONCEPTS COVERED:
- Controlled inputs
- Connecting input value to state
- Handling form submission
- Preventing default form behavior
*/

// ============================================
// STEP 1: Controlled input
// ============================================

import { useState } from "react";

function NameForm() {
  const [name, setName] = useState("");

  return (
    <form>
      <label>
        Name:
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </label>
      <p>Your name is: {name}</p>
    </form>
  );
}

// The input's value is completely controlled by React state.

// ============================================
// STEP 2: Handling form submission
// ============================================

function SignupForm() {
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();   // Stop the page from reloading

    console.log("Submitting email:", email);
    // Here you would usually send data to a server
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

/*
LINE-BY-LINE BREAKDOWN:

value={name}
- The input's value comes from state, not from the user directly

onChange={(e) => setName(e.target.value)}
- Every time the user types, we update state
- This causes the input to re-render with the new value

event.preventDefault()
- In React forms, we almost always prevent the default submission
- We want to handle everything with JavaScript

NOOB TRANSLATION:

A "controlled component" means React is in charge of the input's value.

Instead of the input remembering what was typed, we keep the value in state.
This gives us full control and makes forms much easier to work with.

COMMON MISTAKES:

1. Forgetting to connect value and onChange (uncontrolled input)

2. Forgetting event.preventDefault() on form submit

3. Trying to read input values using document.querySelector inside React

TRY CHANGING THIS:

1. Add a second input for age and keep it in state.

2. On form submit, log both values.

3. Disable the submit button if the email field is empty.

MINI CHALLENGE:

Create a simple login form with email and password.
Both fields should be controlled.
On submit, log the values and clear the form.
*/