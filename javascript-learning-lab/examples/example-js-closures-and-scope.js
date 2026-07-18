/*
Example: Closures and Lexical Scope
*/

function createCounter(start = 0) {
  let count = start;
  return {
    increment() { return ++count; },
    decrement() { return --count; },
    get() { return count; }
  };
}

const counter = createCounter(10);
console.log(counter.increment()); // 11
console.log(counter.get());       // 11

/*
Even after createCounter finishes executing, the inner methods still have access to the count variable that was declared in their enclosing scope. This is a closure. The count variable is not on the global object and not inside the returned object; it lives in a hidden scope that only the three methods can reach.

This pattern is the foundation of many JavaScript features: React hooks rely on closures, module systems use them to hide private state, and factory functions like this one are common for creating stateful objects without using classes.

A junior should notice that every call to createCounter produces a fresh count variable. The two counters created in different calls do not share state. Understanding this "each invocation gets its own scope" idea prevents a huge class of bugs.
*/
