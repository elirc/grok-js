/*
NARRATIVE: Extract logic into functions
*/
function logSnack(snack, price) {
  return `${snack} costs $${price}`;
}
console.log(logSnack("chips", 2.5));
// Story benefit: when calculating totals later, reuse this building block
console.log("Functions let the SnackTrack story organize its growing logic.");