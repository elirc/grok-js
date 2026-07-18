/*
BUG HUNT LAB — Debugging-First Teaching Style
Topic: Variables and Values

DIFFERENT APPROACH:
Instead of clean perfect code + explanation,
you get intentionally broken or surprising code first.
Your job: investigate, diagnose, fix.

METHOD:
1. Run the code as-is. Observe the actual (wrong) output or error.
2. Read the "MISSION" and "SYMPTOMS" section.
3. Try to find the bug(s) yourself before reading clues.
4. Read the step-by-step detective work.
5. Study the fixed version + "ROOT CAUSE & PREVENTION".

This style teaches you how to think when things go wrong — the #1 real-world skill.
*/

console.log("=== BUG HUNT: Variables and Values ===\n");

/*
CASE 1: The Silent Config Disaster
----------------------------------
MISSION: Store the API URL in one place so we can change it easily later.
The developer wanted a single constant.

SYMPTOMS:
- The app sometimes calls the wrong API
- Changing the "constant" has no effect in some places
*/

function case1() {
  const API_URL = "https://api.prod.com";   // intended constant

  function fetchUser() {
    // Bug is here somewhere
    let url = "https://api.prod.com" + "/users";
    console.log("Fetching from:", url);
    return url;
  }

  function fetchOrders() {
    console.log("Fetching from:", API_URL + "/orders");
  }

  fetchUser();
  fetchOrders();
}

console.log("--- CASE 1 RUN ---");
case1();

/*
DETECTIVE QUESTIONS (try to answer before scrolling):
- Why did one call use the "constant" and the other did not?
- What will happen if we need to change the URL to staging?
- Find the exact line that violates the "single source of truth" rule.

CLUES:
1. One function hard-coded the string again.
2. const only protects the binding in the scope where it is declared.
3. Duplicated strings are the enemy of future changes.

FIXED VERSION:
*/
function case1Fixed() {
  const API_URL = "https://api.prod.com";

  function fetchUser() {
    const url = API_URL + "/users";   // use the constant!
    console.log("Fetching from:", url);
    return url;
  }

  function fetchOrders() {
    console.log("Fetching from:", API_URL + "/orders");
  }

  fetchUser();
  fetchOrders();
}

console.log("\n--- CASE 1 FIXED RUN ---");
case1Fixed();

/*
ROOT CAUSE:
Duplication. The developer wrote the string twice instead of referring to the named constant.
Prevention rule: If a value is used in 2+ places, or might need to change, give it a const name immediately.

COMMON IN REAL CODE: copy-pasted config strings, magic numbers in calculations.
*/

/*
CASE 2: The "It Worked Yesterday" Mutation
------------------------------------------
MISSION: Make a copy of the user's cart so we can offer "undo".

SYMPTOMS:
- After calling "addDiscount", the original cart's total also changed.
- Customer support is getting angry.
*/

function case2() {
  const originalCart = { items: 3, total: 45.5, user: "sam" };

  // "I just wanted a copy to experiment with"
  const workingCart = originalCart;

  // Apply a discount
  workingCart.total = workingCart.total * 0.9;

  console.log("Original total after discount applied to workingCart:", originalCart.total);
  console.log("workingCart total:", workingCart.total);
}

console.log("\n--- CASE 2 RUN ---");
case2();

/*
DETECTIVE:
What is the relationship between originalCart and workingCart?
Is workingCart a new object or an alias?

FIXED VERSION (multiple safe ways):
*/
function case2Fixed() {
  const originalCart = { items: 3, total: 45.5, user: "sam" };

  // Safe shallow copy options:
  const workingCart = { ...originalCart };           // spread (most common)
  // const workingCart = Object.assign({}, originalCart);
  // const workingCart = JSON.parse(JSON.stringify(originalCart)); // for deep

  workingCart.total = workingCart.total * 0.9;

  console.log("Original total (should be unchanged):", originalCart.total);
  console.log("workingCart total:", workingCart.total);
}

console.log("\n--- CASE 2 FIXED RUN ---");
case2Fixed();

/*
ROOT CAUSE:
Object assignment copies the *reference*, not the data.
This is the single most common source of spooky mutation bugs in JavaScript.

PREVENTION:
- When you need an independent copy, use spread, Object.assign, or a proper deep clone util.
- Consider Object.freeze for objects that really must never change.
*/

/*
CASE 3: The Undeclared Disaster (classic)
-----------------------------------------
MISSION: Track how many times a button was clicked this session.
*/

function case3() {
  // The developer forgot something important on this line
  clickCount = 0;

  function onClick() {
    clickCount = clickCount + 1;
    console.log("Clicks so far:", clickCount);
  }

  onClick();
  onClick();
  console.log("Global clickCount?", typeof clickCount !== "undefined" ? clickCount : "not declared properly");
}

console.log("\n--- CASE 3 RUN ---");
case3();

/*
DIAGNOSIS:
In non-strict mode this actually "works" by creating a global variable.
In modules or strict mode it throws.

FIX:
*/
function case3Fixed() {
  let clickCount = 0;   // declare with let or const

  function onClick() {
    clickCount = clickCount + 1;
    console.log("Clicks so far:", clickCount);
  }

  onClick();
  onClick();
}

console.log("\n--- CASE 3 FIXED RUN ---");
case3Fixed();

/*
ROOT CAUSE + LESSON:
Always declare your variables with let/const. Never rely on implicit globals.
Modern code uses "use strict" or ES modules which make this error loudly.

SUMMARY OF BUG HUNT LESSONS:
- Never duplicate important values
- Objects are references — copy deliberately
- Always declare variables (let/const)
- When something surprising happens, ask "is this the same object or a copy?"
*/

console.log("\n=== Bug Hunt Complete — you are now more dangerous (in a good way) ===");