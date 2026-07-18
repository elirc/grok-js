/*
BEGINNER GOAL:
Learn how to handle user events (clicks, typing, etc.) inside React components.

REAL WORLD USE CASE:
- Buttons that do things when clicked
- Input fields that react as the user types
- Forms that submit
- Hover effects, keyboard shortcuts, etc.

CONCEPTS COVERED:
- onClick, onChange, onSubmit, etc.
- Passing event handlers as props
- The event object in React
- Arrow functions in event handlers
*/

// ============================================
// STEP 1: Basic click handler
// ============================================

function ClickExample() {
  function handleClick() {
    alert("Button was clicked!");
  }

  return <button onClick={handleClick}>Click Me</button>;
}

// ============================================
// STEP 2: Using arrow functions directly
// ============================================

function InlineHandler() {
  return (
    <button onClick={() => alert("Clicked!")}>
      Click Me
    </button>
  );
}

// ============================================
// STEP 3: Handling input changes
// ============================================

import { useState } from "react";

function TextInput() {
  const [text, setText] = useState("");

  function handleChange(event) {
    // event.target is the input element
    // event.target.value is what the user typed
    setText(event.target.value);
  }

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
      <p>You typed: {text}</p>
    </div>
  );
}

// ============================================
// STEP 4: Passing data in event handlers
// ============================================

function ItemList() {
  function handleDelete(id) {
    console.log("Deleting item with id:", id);
  }

  return (
    <div>
      <button onClick={() => handleDelete(1)}>Delete Item 1</button>
      <button onClick={() => handleDelete(2)}>Delete Item 2</button>
    </div>
  );
}

/*
LINE-BY-LINE BREAKDOWN:

onClick={handleClick}
- We pass the function itself (not handleClick())
- React will call it when the click happens

onClick={() => alert("Clicked!")}
- We create a new function on the spot
- This is very common when we need to pass arguments

event.target.value
- In React, the event object is synthetic (wrapped by React)
- But it works very similarly to the native browser event

setText(event.target.value)
- We take what the user typed and put it into state
- This causes the component to re-render with the new value

NOOB TRANSLATION:

In React, instead of using addEventListener like in vanilla JS,
we use special props that start with "on":
- onClick
- onChange
- onSubmit
- onMouseEnter, etc.

We give these props functions that should run when the event happens.

COMMON MISTAKES:

1. Writing onClick={handleClick()} instead of onClick={handleClick}
   - The first one calls the function immediately

2. Forgetting to use the event parameter when you need information from the input

3. Not using state when the UI needs to react to the event

TRY CHANGING THIS:

1. Create a button that logs "Hello" to the console when clicked.

2. Make an input that shows the length of the text as the user types.

3. Create two buttons that call the same function but pass different values.

MINI CHALLENGE:

Create a component with a button labeled "Add One".
Have a number displayed.
When clicked, increase the number using both useState and an onClick handler.
*/