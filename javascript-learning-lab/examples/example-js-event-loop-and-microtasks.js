/*
Example: Event Loop, Macrotasks, and Microtasks
*/

console.log("1 - sync");

setTimeout(() => console.log("4 - macrotask"), 0);

Promise.resolve().then(() => console.log("3 - microtask"));

console.log("2 - sync");

/*
Output order will be: 1, 2, 3, 4

JavaScript has a single thread but uses an event loop to handle asynchronous work. Synchronous code runs to completion first. After the current script finishes, the engine checks the microtask queue (Promises, queueMicrotask) before looking at macrotasks (setTimeout, setInterval, I/O callbacks, etc.).

Microtasks have higher priority. This is why the Promise callback runs before the setTimeout even though the timeout was scheduled first. Understanding this ordering is critical when you are trying to predict when state updates will be visible to the user or when certain side effects will fire.

A common junior mistake is assuming that code after an await will run "immediately after" the awaited promise settles in a way that affects other queued work. In reality the code after await is scheduled as a microtask.
*/
