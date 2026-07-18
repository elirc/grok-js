/*
BUG HUNT TS Types
*/
// Using any too much defeats the purpose
let data: any = fetch();
console.log(data.foo.bar); // no help

// Also forgetting ? for optional vs | undefined
interface User { name: string; age?: number; }
let u: User = { name: "x" };
console.log(u.age.toFixed()); // runtime crash possible
console.log("TypeScript bug hunts revolve around too-loose types and incorrect assumptions about optionality");
