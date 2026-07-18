/*
THINK-PREDICT: Loops
*/
for (let i = 0; i < 3; i++) {
  console.log(i);
}

let i = 0;
while (i < 3) {
  console.log(i);
  i++;
}

/*
PREDICT: for...of vs for...in on arrays and objects.
*/
let arr = ["a","b"];
for (let val of arr) console.log(val);
