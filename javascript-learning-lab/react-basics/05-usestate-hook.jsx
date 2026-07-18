/*
BEGINNER GOAL:
Learn useState — the most important React hook for managing data that changes over time.

REAL WORLD USE CASE:
- Counter buttons
- Form inputs
- Toggling menus and modals
- Any time the UI needs to update because something changed

CONCEPTS COVERED:
- What state is
- useState hook
- Destructuring the array returned by useState
- Updating state with the setter function
- Re-renders
*/

// ============================================
// STEP 1: Why we need state
// ============================================

// Regular JavaScript variables inside a component do NOT cause the UI to update.

function CounterBad() {
  let count = 0;

  function increment() {
    count = count + 1;
    console.log(count);   // The number changes...
    // ...but the screen does not update!
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
    </div>
  );
}

// ============================================
// STEP 2: Using useState
// ============================================

import { useState } from "react";

function Counter() {
  // useState returns an array with two things:
  // 1. The current value
  // 2. A function to change the value
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
    // When we call setCount, React re-renders the component
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={increment}>Click me</button>
    </div>
  );
}

// ============================================
// STEP 3: Multiple pieces of state
// ============================================

function LoginForm() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <input 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <button onClick={() => setIsLoggedIn(true)}>
        Log In
      </button>
    </div>
  );
}

/*
LINE-BY-LINE BREAKDOWN:

const [count, setCount] = useState(0);
- useState(0) creates state with initial value 0
- count is the current value
- setCount is the function we call to change it
- We use array destructuring to get both

setCount(count + 1);
- This tells React "I want the new value to be count + 1"
- React will re-run the component function with the new value

useState(0)
- The number inside useState is the initial value
- It only matters the first time the component renders

NOOB TRANSLATION:

State is memory that belongs to a component.

When state changes, React says "Something important changed!" and redraws the component with the new data.

useState is the tool that gives us this memory + the ability to update it.

COMMON MISTAKES:

1. Updating state directly: count = count + 1 (wrong)

2. Forgetting that useState returns an array (not an object)

3. Calling useState inside conditions or loops (never do this)

4. Expecting the variable to update immediately after setCount (it doesn't — it's scheduled)

TRY CHANGING THIS:

1. Make a component with a button that decreases the count.

2. Add another piece of state for a message that changes when the button is clicked.

3. Create a toggle (true/false) using useState.

MINI CHALLENGE:

Build a component called LikeButton.
It should show a number and a "Like" button.
Every time the button is clicked, increase the number by 1.
Use useState.
*/