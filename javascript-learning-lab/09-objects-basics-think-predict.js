/*
THINK-PREDICT: Objects Basics
*/

let user = { name: "Alex", age: 29 };
console.log(user.name);
user.age = 30;
console.log(user["age"]);

/*
PREDICT:
let a = {x:1};
let b = a;
b.x = 99;
console.log(a.x);
*/

let profile = {};
profile.email = "a@b.com";
console.log("dynamic property");

console.log("Predict object reference + dot vs bracket");