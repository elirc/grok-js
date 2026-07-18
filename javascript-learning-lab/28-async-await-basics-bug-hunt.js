/*
BUG HUNT Async
*/
// Forgetting await
async function bad() {
  const p = fetch("/data"); // promise not value
  console.log(p);
}
// Missing try/catch around await (unhandled rejection)
console.log("Top async bugs: missing await, unhandled promise rejection, sequential instead of parallel");
