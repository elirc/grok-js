/*
BEGINNER GOAL:
Get an introduction to thinking about state management beyond a single component.

REAL WORLD USE CASE:
When apps grow, you often need to share state between many components.
This file introduces the concepts before you learn more advanced tools.

CONCEPTS COVERED:
- Local component state
- Lifting state up
- Why we sometimes need to move state higher
- Preview of more advanced solutions
*/

// ============================================
// STEP 1: Local state (what we have been doing)
// ============================================

import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// ============================================
// STEP 2: Lifting state up
// ============================================

// When two components need the same data, we move the state to their common parent.

function ParentCounter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Display count={count} />
      <Controls onIncrement={() => setCount(count + 1)} />
    </div>
  );
}

function Display({ count }) {
  return <p>Current count: {count}</p>;
}

function Controls({ onIncrement }) {
  return <button onClick={onIncrement}>+1</button>;
}

// ============================================
// STEP 3: Thinking ahead
// ============================================

// As apps get bigger, lifting state can become painful.
// Later you will learn tools like:
// - Context API
// - Redux, Zustand, Jotai, etc.

// For now, focus on understanding when and why to lift state.

/*
LINE-BY-LINE BREAKDOWN:

const [count, setCount] = useState(0);
- State lives in ParentCounter

<Display count={count} />
- We pass the current value down

<Controls onIncrement={...} />
- We pass a function down so the child can ask the parent to change state

This pattern is called "lifting state up".

NOOB TRANSLATION:

Sometimes a piece of data needs to be known by more than one component.

Instead of trying to share it between siblings directly,
we move the state up to the closest common parent and pass it down through props.

COMMON MISTAKES:

1. Keeping related state duplicated in multiple components

2. Passing too many props down many levels

3. Trying to solve every state problem with useState alone in big apps

TRY CHANGING THIS:

1. Create two components that both need to know the same piece of data.

2. Lift the state to a parent and pass it down.

3. Add a button in one child that affects the display in another child.

MINI CHALLENGE:

Create a parent component that holds a "theme" state ("light" or "dark").
Pass it down to two child components:
- One that shows the current theme
- One that has a button to switch the theme
*/