/*
BUG HUNT: Strings and Methods
*/

console.log("=== STRING BUG HUNT ===\n");

/*
CASE 1: The password check that always fails
*/
function badPasswordCheck(input) {
  const correct = "secret123";
  if (input = correct) {   // BUG
    return "Access granted";
  }
  return "Denied";
}

console.log("Bad check 'wrongpass':", badPasswordCheck("wrongpass"));
console.log("Bad check 'secret123':", badPasswordCheck("secret123"));

/* FIX: use === not =  */

/*
CASE 2: The trimming that didn't
*/
let userInput = "   hello@example.com   ";
let cleaned = userInput.trim;   // forgot ()
console.log("Cleaned email looks like:", "[" + cleaned + "]");

// Correct: userInput.trim()

/*
CASE 3: Case sensitivity surprise
*/
let tag = "JavaScript";
console.log(tag.toLowerCase() === "javascript"); // true or false? predict

console.log("\nBug hunt strings done - always use === and remember to CALL the method ()");