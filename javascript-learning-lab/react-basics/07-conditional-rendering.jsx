/*
BEGINNER GOAL:
Learn how to show or hide parts of the UI based on conditions (if statements in JSX).

REAL WORLD USE CASE:
- Show "Log in" or "Log out" button depending on login status
- Display loading spinner or actual content
- Show error messages only when there are errors
- Different messages for different user roles

CONCEPTS COVERED:
- if statements before the return
- Ternary operator inside JSX
- && short-circuit rendering
- Rendering nothing with null
*/

// ============================================
// STEP 1: Conditional rendering with if
// ============================================

function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  } else {
    return <h1>Please log in.</h1>;
  }
}

// ============================================
// STEP 2: Ternary operator (most common)
// ============================================

function StatusMessage({ isLoading }) {
  return (
    <div>
      {isLoading ? <p>Loading...</p> : <p>Content loaded!</p>}
    </div>
  );
}

// ============================================
// STEP 3: Using && for "show if true"
// ============================================

function Notification({ hasMessages }) {
  return (
    <div>
      <h2>Inbox</h2>
      {hasMessages && <p>You have new messages!</p>}
    </div>
  );
}

// If hasMessages is false, nothing is rendered for that part.

// ============================================
// STEP 4: Returning null to render nothing
// ============================================

function AdminPanel({ isAdmin }) {
  if (!isAdmin) {
    return null;   // Render nothing
  }

  return <div>Admin controls here</div>;
}

/*
LINE-BY-LINE BREAKDOWN:

if (isLoggedIn) { return ... } else { return ... }
- We can use normal JavaScript if statements before returning JSX

{isLoading ? <p>Loading...</p> : <p>Done</p>}
- The ternary operator is very common inside JSX
- condition ? showThis : showThat

{hasMessages && <p>New messages</p>}
- If hasMessages is true, the element on the right is rendered
- If false, React renders nothing (falsey values are skipped)

return null;
- Returning null from a component means "render nothing"

NOOB TRANSLATION:

Conditional rendering means:
"Only show this piece of UI if this condition is true."

We use regular JavaScript tools (if, ternary, &&) to decide what JSX to return.

COMMON MISTAKES:

1. Using if statements directly inside the JSX return (you can't)

2. Forgetting that 0 and empty string are falsy and can cause weird behavior with &&

3. Overusing ternaries and making the JSX hard to read

TRY CHANGING THIS:

1. Create a component that shows different text based on a boolean prop.

2. Use the && operator to conditionally show a "New!" badge.

3. Return null from a component when a certain prop is false.

MINI CHALLENGE:

Build a component called UserStatus that receives a prop called status ("online", "away", "offline").
Show different colored indicators or messages based on the status using a ternary or if logic.
*/