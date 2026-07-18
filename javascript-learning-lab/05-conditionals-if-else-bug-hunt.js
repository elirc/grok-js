/*
BUG HUNT: Conditionals
*/

let role = "admin";
if (role = "user") { // assignment again
  console.log("Regular user stuff");
} else {
  console.log("Admin stuff");
}

// Another: order of conditions matters
let n = 15;
if (n > 10) {
  console.log("big");
} else if (n > 5) {
  console.log("medium");
}

console.log("Bug hunt conditionals: = vs === and ordering");