/*
BUG HUNT Looping
*/
const arr = [1,2,3];
arr.forEach((v, i) => { if (v === 2) arr.splice(i,1); }); // mutation during iteration bad
console.log(arr);
console.log("forEach + mutation = skipped elements or wrong indexes");