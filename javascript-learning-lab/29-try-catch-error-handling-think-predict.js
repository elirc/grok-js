/*
THINK-PREDICT: try/catch
*/
try {
  JSON.parse("not json");
} catch (e) {
  console.log(e.name);
}
console.log("After error");
/*
Predict sync vs async error catching differences.
*/
