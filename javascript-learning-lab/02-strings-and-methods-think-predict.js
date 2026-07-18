/*
THINK-PREDICT STYLE: Strings & Methods
*/

console.log("=== STRINGS THINK & PREDICT ===\n");

/*
PREDICT 1
let greeting = "Hello";
console.log(greeting.toUpperCase());
console.log(greeting);

Guess what prints on each line:
*/

// YOUR GUESS:

let greeting = "Hello";
console.log(greeting.toUpperCase());
console.log(greeting);

/*
WHY: Strings are immutable in JS. toUpperCase() returns a *new* string.
The original greeting never changes.
*/

/*
PREDICT 2
let s = "  JavaScript  ";
console.log(s.trim().toLowerCase());
console.log("[" + s + "]");

Your prediction:
*/

// YOUR GUESS:

let s = "  JavaScript  ";
console.log("|" + s.trim().toLowerCase() + "|");
console.log("[" + s + "]");

/*
PREDICT 3 — template literals vs concatenation
let user = "Sam";
let score = 87;
console.log("User: " + user + " — Score: " + score);
console.log(`User: ${user} — Score: ${score}`);

Are these two lines identical in output?
What is one advantage of the template version?
*/

/*
PREDICT 4
let sentence = "The quick brown fox";
console.log(sentence.slice(4, 9));
console.log(sentence.substring(4, 9));
console.log(sentence.substr(4, 5)); // note: substr is deprecated
*/

/*
PREDICT 5 — includes, startsWith, indexOf
let file = "report-final-v2.pdf";
console.log(file.includes("final"));
console.log(file.endsWith(".pdf"));
console.log(file.indexOf("-"));
*/

/*
REFLECT: Which string method surprised you when you predicted wrong?
*/

console.log("End think-predict strings");