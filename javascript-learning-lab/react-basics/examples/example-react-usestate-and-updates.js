/*
Example: useState and Safe State Updates
*/

import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  const increment = () => setCount(c => c + 1); // functional update

  const addItem = (item) => {
    setItems(prev => [...prev, item]); // always use previous value
  };

  return (
    <div>
      <button onClick={increment}>Count: {count}</button>
      <button onClick={() => addItem({ id: Date.now() })}>Add Item</button>
    </div>
  );
}

/*
When the new state depends on the previous state, always use the functional form of the setter (c => c + 1). This guarantees you are working with the most recent value even if React batches multiple updates.

The same principle applies to arrays and objects. Spreading the previous array creates a new array reference, which is required for React to detect that state actually changed.

Never mutate the state value directly (items.push(...)). Doing so mutates the object that React is holding and can lead to components not re-rendering or seeing stale data.

The pattern of "derive next state from previous state" is one of the most important habits for juniors learning React.
*/
