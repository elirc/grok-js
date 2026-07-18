/*
BUG HUNT Template Literals
*/
let user = null;
console.log(`Hello ${user.name}`); // error
// Also: complex expressions that get hard to read
console.log("Remember to guard nulls inside templates or use optional chaining");
