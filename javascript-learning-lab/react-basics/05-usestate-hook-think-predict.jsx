/*
THINK-PREDICT: useState (React)
Different style: predict what re-renders and when state updates are visible.
*/
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  // PREDICT: after setCount(count + 1) twice in same handler, what is count during render?
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
console.log("React state is async. Predict batching behavior.");
