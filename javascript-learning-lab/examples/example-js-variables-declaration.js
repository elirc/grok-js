/*
Example: Variable Declaration Patterns in JavaScript

This file demonstrates different ways to declare variables and when to choose each one.
*/

const API_BASE_URL = "https://api.example.com/v1";
let userSession = { id: null, token: null };
var legacyCounter = 0;   // avoid in modern code

// Updating a session as the app runs
userSession.id = "user_123";
userSession.token = "abc123xyz";

console.log("Current API:", API_BASE_URL);
console.log("Session ID:", userSession.id);

/*
In this example we start by using const to define API_BASE_URL. A junior engineer should notice that const signals "this value is not going to be reassigned anywhere in this module". This is a form of self-documenting code that tells future readers (including your future self) that the base URL is a fixed configuration value.

Next we declare userSession with let. The let keyword means we intend to reassign or mutate this binding later. In the lines that follow we treat the object as mutable state and attach an id and token to it. Using let here communicates that the session object is expected to change as the user logs in or the token is refreshed.

Notice the use of var for legacyCounter. This is included only as a contrast. In modern JavaScript var creates function-scoped bindings that are hoisted in confusing ways and can lead to accidental global variables. A junior reading this should internalize the rule: prefer const by default, use let when you truly need reassignment, and almost never reach for var.

This pattern of const for configuration and let for session or accumulator state is extremely common in real applications. It reduces bugs because the compiler (and your linter) will complain if you accidentally try to reassign a const.
*/
