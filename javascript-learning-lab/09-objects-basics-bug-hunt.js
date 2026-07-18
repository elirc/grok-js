/*
BUG HUNT: Objects
*/

let person = { name: "Sam" };
console.log(person.nmae); // typo = undefined

// Forgetting that undefined.name throws
// let x; console.log(x.name);

let settings = null;
// settings.theme = "dark"; // crash

console.log("Object bugs: typos, null access, mutation surprises");