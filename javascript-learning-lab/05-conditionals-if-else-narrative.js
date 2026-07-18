/*
NARRATIVE: Conditionals in SnackTrack
*/

let timeOfDay = "evening";
let hunger = 8;

if (timeOfDay === "evening" && hunger > 6) {
  console.log("Alex is allowed a small treat.");
} else if (hunger < 3) {
  console.log("Maybe just water.");
} else {
  console.log("Stick to plan.");
}

console.log("Conditionals = the decision engine of the story app.");