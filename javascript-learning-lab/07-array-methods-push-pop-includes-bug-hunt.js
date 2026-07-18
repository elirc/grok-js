/*
BUG HUNT: Basic array mutation methods
*/

let todos = ["buy milk"];
todos.push = "walk dog"; // forgot ()
console.log(todos); // wrong type

// includes case sensitivity
console.log(["Apple"].includes("apple"));
