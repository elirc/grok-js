/*
BUG HUNT: Booleans
*/

let loggedIn = "true"; // string instead of boolean
if (loggedIn) {
  console.log("Welcome"); // always true because non-empty string
}

let count = 0;
if (count = 5) { // assignment!
  console.log("Count is five");
}

console.log("Classic boolean bugs: wrong type + using = instead of ===");