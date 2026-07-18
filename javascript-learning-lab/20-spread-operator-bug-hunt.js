/*
BUG HUNT Spread
*/
let nested = {user: {name:"x"}};
let c = {...nested};
c.user.name = "y";
console.log(nested.user.name); // still changed - shallow!
console.log("Spread is shallow. Deep clone needs more work.");
