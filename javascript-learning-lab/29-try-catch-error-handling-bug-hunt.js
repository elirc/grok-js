/*
BUG HUNT: Error Handling
*/
try {
  doAsync().catch(e => {}); // swallowed
} catch(e) {} // does not catch promise errors

// Also: not rethrowing after logging
console.log("Catch what you can handle. Async errors need their own handling.");
