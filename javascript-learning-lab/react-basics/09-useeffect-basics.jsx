/*
BEGINNER GOAL:
Learn the useEffect hook — how to run code at specific times (when the component mounts, when data changes, etc.).

REAL WORLD USE CASE:
- Fetching data from an API when the page loads
- Setting up timers or subscriptions
- Updating the document title
- Cleaning up event listeners

CONCEPTS COVERED:
- useEffect basics
- Empty dependency array (runs once)
- Dependency arrays
- Cleanup functions
*/

// ============================================
// STEP 1: Basic useEffect
// ============================================

import { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log("This runs after every render");
  });

  return <p>Seconds: {seconds}</p>;
}

// ============================================
// STEP 2: Run only once when component mounts
// ============================================

function FetchData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // This code runs only once after the first render
    console.log("Component mounted - good place to fetch data");

    // Example: fetch("https://api.example.com/data")
    //   .then(res => res.json())
    //   .then(setData);
  }, []);   // Empty array = run only once

  return <div>Data: {data ? "loaded" : "loading..."}</div>;
}

// ============================================
// STEP 3: Run when specific values change
// ============================================

function CounterLogger() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Count changed to:", count);
  }, [count]);   // Only re-run when count changes

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

/*
LINE-BY-LINE BREAKDOWN:

useEffect(() => { ... })
- Runs after the component renders

useEffect(() => { ... }, [])
- The second argument is the dependency array
- Empty array means "run only after the first render"

useEffect(() => { ... }, [count])
- This effect will re-run whenever count changes

NOOB TRANSLATION:

useEffect lets you say:
"After the component shows up, do this extra thing."

Common extra things:
- Load data from the internet
- Start a timer
- Change the page title

The dependency array controls when it runs again.

COMMON MISTAKES:

1. Forgetting the dependency array and causing infinite loops

2. Not including values from inside the effect in the dependency array

3. Trying to use async directly inside useEffect (you need to define an async function inside)

TRY CHANGING THIS:

1. Add a useEffect that runs only once and logs "Component loaded".

2. Make an effect that runs every time a piece of state changes.

3. Add a cleanup function that runs when the component is removed.

MINI CHALLENGE:

Create a component that has a counter.
Use useEffect to update the document.title every time the count changes.
*/