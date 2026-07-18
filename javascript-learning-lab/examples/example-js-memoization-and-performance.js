/*
Example: Memoization with useMemo and Custom Memoization
*/

import { useMemo } from "react";

function ExpensiveList({ items, filter }) {
  const filtered = useMemo(() => {
    console.log("Filtering...");
    return items.filter(i => i.includes(filter));
  }, [items, filter]);

  return <ul>{filtered.map(i => <li key={i}>{i}</li>)}</ul>;
}

/*
useMemo caches the result of the computation between renders as long as the dependencies have not changed. This prevents the filter from running on every keystroke if items hasn't changed.

The same idea applies outside React with libraries like lodash.memoize or a simple Map cache for pure functions.

A junior should identify expensive pure calculations that depend on props or state and wrap them. But never use memoization to fix incorrect logic; only use it for performance.
*/
