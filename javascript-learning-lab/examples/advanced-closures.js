/*
Advanced Closures and Scope Examples in JavaScript (EXPANDED 3-5x)

This file now contains 10+ realistic closure examples + explanations and practice challenges.

Example 1: Simple private counter
function createCounter() {
  let count = 0;
  return {
    increment() { return ++count; },
    decrement() { return --count; },
    get() { return count; }
  };
}
const counter = createCounter();
console.log(counter.increment()); // 1

Example 2: IIFE Module Pattern (pre-ES modules)
const secretModule = (function() {
  let privateSecret = "shh";
  function getSecret() { return privateSecret; }
  function setSecret(val) { privateSecret = val; }
  return { getSecret, setSecret };
})();
console.log(secretModule.getSecret());

Example 3: Factory with config (common pattern)
function createApiClient(baseUrl) {
  return async function(endpoint) {
    const res = await fetch(baseUrl + endpoint);
    return res.json();
  };
}
const api = createApiClient("https://api.example.com");

Example 4: Partial application / currying
function multiply(a) {
  return function(b) { return a * b; };
}
const double = multiply(2);

Example 5: Memoization with closure cache
function memoize(fn) {
  const cache = new Map();
  return function(x) {
    if (cache.has(x)) return cache.get(x);
    const val = fn(x);
    cache.set(x, val);
    return val;
  };
}

Example 6: Event listener with closure state (DOM)
let clicks = 0;
button.addEventListener('click', () => {
  clicks++;
  console.log(`Clicked ${clicks} times`);
});
// clicks is private to the handler scope

Example 7: Private state with validation
function createTemperature(initial) {
  let temp = initial;
  return {
    get() { return temp; },
    set(newTemp) {
      if (newTemp < -273) throw new Error("Below absolute zero");
      temp = newTemp;
    }
  };
}

Example 8: Debounce using closure
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

Example 9: Throttle
function throttle(fn, limit) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last > limit) {
      last = now;
      fn(...args);
    }
  };
}

Example 10: Private instance fields simulation (before #)
function createUser(name) {
  let _name = name;
  return {
    getName: () => _name,
    setName: (n) => { _name = n; }
  };
}

Example 11: Closures + async (common gotcha)
function createLoaders() {
  const loaders = {};
  for (let id = 1; id <= 3; id++) {
    loaders[id] = async () => {
      // id is captured correctly thanks to let block scope
      return await fetch(`/item/${id}`);
    };
  }
  return loaders;
}

LINE-BY-LINE / NOTES on key patterns:
- Every time outer function runs, a NEW lexical environment is created.
- Returned inner functions keep a reference to that environment.
- Variables are looked up at CALL time, not creation time (live reference).

COMMON GOTCHAS COVERED:
- var in loops captures the final value
- Accidentally sharing mutable state between instances
- Memory leaks if you hold large closures forever (e.g. in long-lived event handlers)

TRY CHANGING:
- Convert any example to use class private fields (#count) and compare.
- Add expiration to memoize cache.
- Make debounce support leading/trailing options.

MINI CHALLENGES (many):
1. Implement a function that returns a different adder each time.
2. Create a stack (push/pop/peek) backed only by closures.
3. Build a simple "useState" simulation that returns [getter, setter].
4. Make a closure-based simple router (map path -> handler).

Expanded with 5x the example patterns and challenges.
*/
