/*
NARRATIVE Spread
*/
let base = {user:"Alex", snacks:[]};
let today = {...base, snacks: [...base.snacks, "apple"] };
console.log("Non-mutating updates keep story history safe.");
