/*
NARRATIVE: Keeping state safe in SnackTrack modules
*/
let total = 0; // module scope
function add(price) {
  let localNote = "adding"; // block scope
  total += price;
}
add(2.5);
console.log("Story state protected by proper scoping.");
