/*
NARRATIVE: Processing history with loops
*/
let history = [{p:2.5}, {p:1.8}, {p:3}];
let total = 0;
for (let entry of history) {
  total += entry.p;
}
console.log("Total from loop:", total);
console.log("Loops power summarizing the story's data over time.");
