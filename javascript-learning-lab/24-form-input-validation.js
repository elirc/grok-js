/*
BEGINNER GOAL:
Learn how to read values from form inputs and do simple validation before allowing the user to continue.

REAL WORLD USE CASE:
- Login and signup forms
- Contact forms
- Checkout forms
- Any time you need to make sure the user gave you good data

CONCEPTS COVERED:
- Selecting input elements
- Reading .value from inputs
- Checking if fields are empty
- Simple length and format checks
- Showing error messages to the user
- Preventing form submission when invalid
*/

// NOTE: This file is meant to be used with a real HTML form.
// Example HTML structure is described in comments.

function setupFormValidation() {
  // Assume we have this HTML:
  // <form id="signup-form">
  //   <input id="email" type="text">
  //   <input id="password" type="password">
  //   <button type="submit">Sign Up</button>
  //   <p id="error-message"></p>
  // </form>

  let form = document.querySelector("#signup-form");
  let emailInput = document.querySelector("#email");
  let passwordInput = document.querySelector("#password");
  let errorDisplay = document.querySelector("#error-message");

  if (!form) return;

  form.addEventListener("submit", function(event) {
    // Prevent the browser from submitting the form automatically
    event.preventDefault();

    // Clear previous errors
    if (errorDisplay) errorDisplay.textContent = "";

    // Get the current values from the inputs
    let email = emailInput.value.trim();
    let password = passwordInput.value;

    // ========================================
    // VALIDATION RULES
    // ========================================

    // Rule 1: Email cannot be empty
    if (email === "") {
      if (errorDisplay) {
        errorDisplay.textContent = "Email is required.";
      }
      return; // Stop here
    }

    // Rule 2: Email must contain @
    if (email.includes("@") === false) {
      if (errorDisplay) {
        errorDisplay.textContent = "Please enter a valid email address.";
      }
      return;
    }

    // Rule 3: Password must be at least 6 characters
    if (password.length < 6) {
      if (errorDisplay) {
        errorDisplay.textContent = "Password must be at least 6 characters long.";
      }
      return;
    }

    // If we got here, everything passed
    console.log("Form is valid!");
    console.log("Email:", email);
    console.log("Password length:", password.length);

    // In a real app you would send the data to a server here
    // form.submit(); // only if you want to actually submit after validation
  });
}

// Call the setup function
// In a real page you would call this after the DOM is ready
setupFormValidation();

/*
LINE-BY-LINE BREAKDOWN:

form.addEventListener("submit", function(event) { ... })
- We listen for the "submit" event on the form
- When the user clicks submit or presses enter, this runs

event.preventDefault();
- Stops the browser's default behavior (sending the form)
- We want to validate first before allowing submission

let email = emailInput.value.trim();
- .value gets whatever the user typed
- .trim() removes extra spaces from beginning and end

if (email === "") { ... }
- We check if the value is an empty string after trimming
- This is a very common validation

if (email.includes("@") === false)
- Simple check for the @ symbol
- Real email validation is more complex, but this is a good start for beginners

if (password.length < 6)
- We check the length property of the string
- We decide on a minimum length ourselves

if (errorDisplay) errorDisplay.textContent = "...";
- We safely check if the element exists before trying to change it
- Then we show the error to the user

return;
- We stop the function early if validation fails
- This prevents the "success" code from running

NOOB TRANSLATION:

Form validation means:
"Don't let the user continue until they give us good information."

We:
1. Wait for them to try to submit
2. Look at what they typed (using .value)
3. Ask questions (is it empty? is it long enough? does it have @?)
4. If something is wrong, show a message and stop
5. Only if everything is good, allow the action to continue

COMMON MISTAKES:

1. Forgetting event.preventDefault() and letting the form submit anyway

2. Not trimming input values (users often add accidental spaces)

3. Showing multiple errors at once instead of one clear message

4. Trying to validate before the user has a chance to type anything

5. Not re-checking the form on every submit

TRY CHANGING THIS:

1. Add a check that the email ends with ".com" (very simple).

2. Make the password require at least one number.

3. Add a third field (username) and validate that it is not empty.

MINI CHALLENGE:

Build validation for a "Contact Us" form with:
- name (cannot be empty)
- email (must have @)
- message (must be at least 10 characters)

Show appropriate error messages for each rule.
*/