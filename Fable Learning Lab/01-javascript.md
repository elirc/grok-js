# JavaScript — 50 Problems for the CRUD Web Developer

Ordered easiest-first. Sections: Fundamentals (1–8), Arrays & Objects (9–18),
Functions in Depth (19–24), Async & HTTP (25–32), Errors & Robustness (33–38),
Practical Utilities (39–44), Building a CRUD Data Layer (45–50).

Run these in Node (`node file.js`) or the browser console.

---

## Fundamentals

### 1. Variables: `let` vs `const`

**Problem:** Declare a variable for a user's name that never changes, and a counter that
you increment twice. Explain why you chose each keyword, and show what happens if you
try to reassign the `const`.

**Solution:**
```js
const userName = "Ada";   // const: the binding never gets reassigned
let count = 0;            // let: we intend to reassign it
count++;
count++;
console.log(userName, count); // "Ada" 2

// userName = "Grace"; // TypeError: Assignment to constant variable.
```
Default to `const`; use `let` only when you actually reassign. Note that `const` protects
the *binding*, not the contents — a `const` array can still be pushed to.

### 2. Template literals

**Problem:** Given `const item = { name: "Keyboard", price: 49.99 }`, build the string
`Keyboard costs $49.99 (with tax: $53.99)` using a template literal. Tax is 8%.

**Solution:**
```js
const item = { name: "Keyboard", price: 49.99 };
const withTax = (item.price * 1.08).toFixed(2); // toFixed returns a string, rounded to 2 places
const label = `${item.name} costs $${item.price} (with tax: $${withTax})`;
console.log(label);
```
Template literals (backticks) let you interpolate any expression with `${...}` — far more
readable than `"..." + variable + "..."` concatenation.

### 3. Functions three ways

**Problem:** Write the same `double(n)` function as (a) a function declaration,
(b) a function expression, (c) an arrow function. Then write an arrow function
`greet(name)` that returns `"Hello, <name>!"` using the implicit-return form.

**Solution:**
```js
// (a) declaration — hoisted, callable before its definition line
function double(n) { return n * 2; }

// (b) expression — assigned to a variable, not hoisted
const double2 = function (n) { return n * 2; };

// (c) arrow — the modern default for callbacks and short helpers
const double3 = (n) => n * 2;

// implicit return: no braces means "return this expression"
const greet = (name) => `Hello, ${name}!`;
console.log(greet("Sam")); // Hello, Sam!
```
In app code you'll mostly write arrow functions. One gotcha: `(x) => { value: x }` returns
`undefined` (the braces are a block). Wrap object returns in parens: `(x) => ({ value: x })`.

### 4. Default parameters

**Problem:** Write `createUser(name, role)` that returns `{ name, role, active: true }`
where `role` defaults to `"viewer"` if not passed.

**Solution:**
```js
function createUser(name, role = "viewer") {
  return { name, role, active: true }; // shorthand: { name } means { name: name }
}

console.log(createUser("Ada"));            // { name: 'Ada', role: 'viewer', active: true }
console.log(createUser("Ada", "admin"));   // { name: 'Ada', role: 'admin', active: true }
```
Defaults kick in when the argument is `undefined` — including when the caller explicitly
passes `undefined`, but *not* when they pass `null`.

### 5. Conditionals and the ternary

**Problem:** Write `shippingCost(subtotal)`: free over $50, $5.99 for $20–$50, $9.99 below
$20. Then write a one-line ternary `badge(user)` returning `"Admin"` or `"Member"` based on
`user.isAdmin`.

**Solution:**
```js
function shippingCost(subtotal) {
  if (subtotal >= 50) return 0;        // early returns keep this flat —
  if (subtotal >= 20) return 5.99;     // no else-chains needed
  return 9.99;
}

const badge = (user) => (user.isAdmin ? "Admin" : "Member");

console.log(shippingCost(75), shippingCost(30), shippingCost(10)); // 0 5.99 9.99
console.log(badge({ isAdmin: true })); // "Admin"
```
Use ternaries for choosing between two *values*; use `if`/early returns for branching *logic*.

### 6. Loops: `for`, `for...of`, and when not to loop

**Problem:** Given `const scores = [85, 92, 78, 95, 60]`, (a) print each score with a
`for...of` loop, (b) compute the total with a classic `for` loop, (c) note which array
method replaces (b).

**Solution:**
```js
const scores = [85, 92, 78, 95, 60];

// (a) for...of — the go-to loop when you need each element
for (const score of scores) {
  console.log(score);
}

// (b) classic for — useful when you need the index
let total = 0;
for (let i = 0; i < scores.length; i++) {
  total += scores[i];
}
console.log(total); // 410

// (c) in real code you'd write:
const total2 = scores.reduce((sum, s) => sum + s, 0);
```
Modern JS code uses array methods (`map`, `filter`, `reduce`) for transforms and
`for...of` when you need early `break`/`continue` or side effects.

### 7. Truthy, falsy, `||` vs `??`

**Problem:** JavaScript has exactly six falsy values — list them. Then explain the bug in
`const pageSize = settings.pageSize || 10;` when the user sets `pageSize: 0`, and fix it.

**Solution:**
```js
// The six falsy values:
// false, 0, "" (empty string), null, undefined, NaN
// Everything else is truthy — including "0", [], and {}.

const settings = { pageSize: 0 };

const buggy = settings.pageSize || 10;  // 10 — wrong! 0 is falsy, so || discards it
const fixed = settings.pageSize ?? 10;  // 0  — ?? only falls back on null/undefined

console.log(buggy, fixed);
```
`??` (nullish coalescing) means "use the fallback only if the value is missing," which is
almost always what you want for defaults. Reserve `||` for genuine boolean logic.

### 8. Scope and block scoping

**Problem:** Predict the output, then explain why `let`/`const` are block-scoped:

```js
let message = "outer";
if (true) {
  let message = "inner";
  console.log(message);
}
console.log(message);
```

**Solution:**
```js
// Prints:
// inner
// outer
```
Each `{ }` block creates a new scope for `let`/`const`. The inner `message` *shadows* the
outer one inside the `if` block and disappears when the block ends. This is why `let` in a
`for` loop gives each iteration its own variable — critical when creating callbacks in
loops. (The old `var` keyword is function-scoped and hoisted; avoid it in new code.)

---

## Arrays & Objects

### 9. `map`: transform every element

**Problem:** Given `const users = [{ id: 1, name: "ada" }, { id: 2, name: "grace" }]`,
produce (a) an array of just the names, capitalized, and (b) an array of strings like
`"#1 Ada"`.

**Solution:**
```js
const users = [{ id: 1, name: "ada" }, { id: 2, name: "grace" }];

const cap = (s) => s[0].toUpperCase() + s.slice(1);

const names = users.map((u) => cap(u.name));
console.log(names); // ['Ada', 'Grace']

const labels = users.map((u) => `#${u.id} ${cap(u.name)}`);
console.log(labels); // ['#1 Ada', '#2 Grace']
```
`map` returns a **new array of the same length** with each element transformed. It never
modifies the original — this "return new, don't mutate" habit is essential for React later.

### 10. `filter`: keep some elements

**Problem:** Given a product list, return (a) products under $25, and (b) in-stock
products under $25.

```js
const products = [
  { name: "Mouse", price: 19.99, inStock: true },
  { name: "Monitor", price: 199.0, inStock: true },
  { name: "Cable", price: 9.99, inStock: false },
  { name: "Mousepad", price: 12.5, inStock: true },
];
```

**Solution:**
```js
const cheap = products.filter((p) => p.price < 25);
console.log(cheap.map((p) => p.name)); // ['Mouse', 'Cable', 'Mousepad']

const cheapAndAvailable = products.filter((p) => p.price < 25 && p.inStock);
console.log(cheapAndAvailable.map((p) => p.name)); // ['Mouse', 'Mousepad']
```
The callback returns `true` to keep an element. Combine conditions with `&&`/`||` inside
one filter rather than chaining many filters — one pass, one intent.

### 11. `reduce`: boil an array down to one value

**Problem:** Given `const cart = [{ name: "A", price: 10, qty: 2 }, { name: "B", price: 5, qty: 3 }]`,
compute the cart total with `reduce`.

**Solution:**
```js
const cart = [
  { name: "A", price: 10, qty: 2 },
  { name: "B", price: 5, qty: 3 },
];

const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
console.log(total); // 35
```
`reduce(callback, initialValue)` carries an accumulator (`sum`) through the array; whatever
the callback returns becomes the accumulator for the next element. Always pass the initial
value (`0` here) — omitting it causes surprising bugs on empty arrays.

### 12. `find`, `some`, `every`

**Problem:** With the `products` array from problem 10: (a) find the product named
`"Cable"`, (b) check whether *any* product is out of stock, (c) check whether *all*
products cost under $500.

**Solution:**
```js
const cable = products.find((p) => p.name === "Cable");
console.log(cable); // { name: 'Cable', price: 9.99, inStock: false }
// find returns the FIRST match, or undefined if none — always handle undefined!

const anyOut = products.some((p) => !p.inStock);
console.log(anyOut); // true

const allAffordable = products.every((p) => p.price < 500);
console.log(allAffordable); // true
```
`find` → one element (or `undefined`), `some` → "at least one matches?", `every` → "do all
match?". These read like English and replace hand-written loops with flags.

### 13. Sorting without breaking things

**Problem:** Sort `[10, 1, 5, 25]` numerically (default sort gives `[1, 10, 25, 5]` — why?),
then sort a user array by name alphabetically **without mutating the original**.

**Solution:**
```js
const nums = [10, 1, 5, 25];
// Default sort compares as STRINGS: "10" < "5". Pass a comparator:
const sorted = [...nums].sort((a, b) => a - b); // negative result = a comes first
console.log(sorted); // [1, 5, 10, 25]

const users = [{ name: "Grace" }, { name: "Ada" }, { name: "Linus" }];
const byName = [...users].sort((a, b) => a.name.localeCompare(b.name));
console.log(byName.map((u) => u.name)); // ['Ada', 'Grace', 'Linus']
console.log(users[0].name); // 'Grace' — original untouched
```
`sort` mutates in place, so copy first with `[...arr]` (or use `arr.toSorted()` in modern
runtimes). Use `localeCompare` for strings and `a - b` for numbers.

### 14. Destructuring objects and arrays

**Problem:** Given `const response = { data: { id: 7, title: "Post" }, status: 200 }`,
pull out `status` and `title` (renamed to `postTitle`) in one statement. Then swap two
variables using array destructuring.

**Solution:**
```js
const response = { data: { id: 7, title: "Post" }, status: 200 };

const { status, data: { title: postTitle } } = response;
console.log(status, postTitle); // 200 'Post'

let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2 1
```
Destructuring is everywhere in modern code: function parameters (`function show({ id, title })`),
React hooks (`const [count, setCount] = useState(0)`), and import statements.

### 15. Spread and rest

**Problem:** (a) Merge `{ theme: "dark" }` into default settings `{ theme: "light", pageSize: 10 }`
so the user value wins. (b) Write `sum(...nums)` accepting any number of arguments.

**Solution:**
```js
// (a) spread: later properties overwrite earlier ones
const defaults = { theme: "light", pageSize: 10 };
const userPrefs = { theme: "dark" };
const settings = { ...defaults, ...userPrefs };
console.log(settings); // { theme: 'dark', pageSize: 10 }

// (b) rest: gather arguments into a real array
function sum(...nums) {
  return nums.reduce((t, n) => t + n, 0);
}
console.log(sum(1, 2, 3, 4)); // 10
```
Same `...` syntax, opposite directions: **spread** unpacks into a new object/array/call;
**rest** collects leftovers into an array. `{ ...obj }` also makes a shallow copy — the
standard way to "change" data without mutating it.

### 16. `Object.keys` / `values` / `entries`

**Problem:** Given `const stock = { mouse: 12, monitor: 0, cable: 34 }`, (a) list the
product names, (b) total the stock count, (c) list names of out-of-stock products.

**Solution:**
```js
const stock = { mouse: 12, monitor: 0, cable: 34 };

const names = Object.keys(stock);
console.log(names); // ['mouse', 'monitor', 'cable']

const totalUnits = Object.values(stock).reduce((t, n) => t + n, 0);
console.log(totalUnits); // 46

const outOfStock = Object.entries(stock)
  .filter(([, count]) => count === 0)   // entries gives [key, value] pairs
  .map(([name]) => name);
console.log(outOfStock); // ['monitor']
```
These three methods convert an object into arrays so you can use `map`/`filter`/`reduce`
on it. `entries` + destructuring in the callback is the idiomatic pattern.

### 17. Grouping data

**Problem:** Group `const tickets = [{ id: 1, status: "open" }, { id: 2, status: "closed" },
{ id: 3, status: "open" }]` into `{ open: [...], closed: [...] }`.

**Solution:**
```js
const tickets = [
  { id: 1, status: "open" },
  { id: 2, status: "closed" },
  { id: 3, status: "open" },
];

const grouped = tickets.reduce((acc, ticket) => {
  (acc[ticket.status] ??= []).push(ticket); // create the bucket if missing, then push
  return acc;
}, {});

console.log(grouped);
// { open: [{id:1,...},{id:3,...}], closed: [{id:2,...}] }

// Modern runtimes also have: Object.groupBy(tickets, t => t.status)
```
Grouping is a daily CRUD-app task (orders by customer, tasks by status). The
`??=` operator assigns only when the left side is `null`/`undefined`.

### 18. Immutable updates (the React warm-up)

**Problem:** Without mutating the originals: (a) add a todo to a list, (b) remove the todo
with `id === 2`, (c) toggle `done` on the todo with `id === 1`.

```js
const todos = [
  { id: 1, text: "Learn JS", done: false },
  { id: 2, text: "Learn React", done: false },
];
```

**Solution:**
```js
// (a) add — spread into a new array
const added = [...todos, { id: 3, text: "Build app", done: false }];

// (b) remove — filter creates a new array without the item
const removed = todos.filter((t) => t.id !== 2);

// (c) update — map, replacing just the matching item with a modified copy
const toggled = todos.map((t) =>
  t.id === 1 ? { ...t, done: !t.done } : t
);

console.log(todos[0].done);   // false — original never changed
console.log(toggled[0].done); // true
```
Memorize these three shapes: **add = spread**, **remove = filter**, **update = map + spread**.
React state updates use exactly these patterns, so make them automatic now.

---

## Functions in Depth

### 19. Closures

**Problem:** Write `makeCounter()` returning an object with `increment()` and `current()`
methods, where the count is private (not accessible from outside).

**Solution:**
```js
function makeCounter() {
  let count = 0; // lives on in the closure after makeCounter returns
  return {
    increment() { count++; return count; },
    current()   { return count; },
  };
}

const counter = makeCounter();
counter.increment();
counter.increment();
console.log(counter.current()); // 2
console.log(counter.count);     // undefined — truly private

const other = makeCounter();
console.log(other.current());   // 0 — each call gets its own count
```
A closure is a function that remembers the variables from where it was created. It's how
JS does private state, and it's the mechanism behind hooks, event handlers, and modules.

### 20. Higher-order functions

**Problem:** Write `withLogging(fn)` that returns a new function which logs the arguments
and result every time `fn` is called.

**Solution:**
```js
function withLogging(fn) {
  return (...args) => {
    const result = fn(...args);
    console.log(`${fn.name}(${args.join(", ")}) -> ${result}`);
    return result;
  };
}

const add = (a, b) => a + b;
const loggedAdd = withLogging(add);
loggedAdd(2, 3); // logs "add(2, 3) -> 5", returns 5
```
A higher-order function takes and/or returns functions. Wrapping behavior around an
existing function (logging, timing, caching, auth checks) is a pattern you'll meet in
middleware, decorators, and React higher-order components.

### 21. Callbacks

**Problem:** Write `processOrder(order, onSuccess, onError)` that calls `onError` with a
message if `order.items` is empty, otherwise calls `onSuccess` with a total.

**Solution:**
```js
function processOrder(order, onSuccess, onError) {
  if (!order.items || order.items.length === 0) {
    onError("Order has no items");
    return;
  }
  const total = order.items.reduce((t, i) => t + i.price, 0);
  onSuccess(total);
}

processOrder(
  { items: [{ price: 10 }, { price: 15 }] },
  (total) => console.log(`Charged $${total}`),   // "Charged $25"
  (msg) => console.error(`Failed: ${msg}`)
);
processOrder({ items: [] },
  (t) => console.log(t),
  (msg) => console.error(`Failed: ${msg}`)       // "Failed: Order has no items"
);
```
A callback is just a function passed as data, invoked later. Promises and `async/await`
(coming up) largely replace callback-style async code, but callbacks remain the core of
array methods and event handling.

### 22. Debounce

**Problem:** Write `debounce(fn, delay)` so that a search-box handler only fires after the
user stops typing for `delay` ms.

**Solution:**
```js
function debounce(fn, delay) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);                          // cancel the pending call
    timerId = setTimeout(() => fn(...args), delay); // schedule a new one
  };
}

const search = (term) => console.log(`Searching for "${term}"...`);
const debouncedSearch = debounce(search, 300);

debouncedSearch("j");
debouncedSearch("ja");
debouncedSearch("java"); // only this one runs, 300ms after the last keystroke
```
This combines closures (problem 19) and higher-order functions (problem 20) into the
single most-asked-about frontend utility. Without it, a search box fires an API call on
every keystroke.

### 23. `this` and losing it

**Problem:** Explain why this logs `undefined`, and show two fixes:

```js
const timer = {
  seconds: 0,
  start() {
    setTimeout(function () { console.log(this.seconds); }, 100);
  },
};
timer.start();
```

**Solution:**
```js
// The inner `function () {}` gets its own `this` (undefined in strict mode / the
// global object otherwise) — it is NOT the timer object.

// Fix 1 (modern default): arrow functions don't have their own `this`;
// they inherit it from the enclosing scope.
const timer1 = {
  seconds: 42,
  start() {
    setTimeout(() => console.log(this.seconds), 100); // 42
  },
};

// Fix 2: bind the method's `this` explicitly.
const timer2 = {
  seconds: 42,
  start() {
    setTimeout(function () { console.log(this.seconds); }.bind(this), 100);
  },
};
```
Rule of thumb: `this` is determined by *how a function is called*, not where it's written —
except arrow functions, which capture `this` lexically. Use arrows for callbacks inside
methods and this class of bug disappears.

### 24. Factory functions

**Problem:** Write `createTask(title, priority = "normal")` returning a task object with a
generated id, `createdAt` timestamp, and a `summary()` method.

**Solution:**
```js
let nextId = 1;

function createTask(title, priority = "normal") {
  return {
    id: nextId++,
    title,
    priority,
    done: false,
    createdAt: new Date().toISOString(),
    summary() {
      return `[${this.priority}] ${this.title} ${this.done ? "(done)" : ""}`.trim();
    },
  };
}

const task = createTask("Write docs", "high");
console.log(task.summary()); // "[high] Write docs"
```
Factory functions are the simplest way to stamp out consistent objects — no `class` or
`new` required. Combined with closures they can hide private state (problem 19). Many JS
codebases prefer factories over classes for plain data + behavior.

---

## Async & HTTP

### 25. Promises from scratch

**Problem:** Write `wait(ms)` that returns a Promise resolving after `ms` milliseconds,
then use it to log "1"… wait 500ms… log "2".

**Solution:**
```js
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

console.log("1");
wait(500).then(() => console.log("2"));
console.log("(this prints before 2 — async code doesn't block)");
```
A Promise is a placeholder for a value that isn't ready yet. `resolve` is the function you
call when the value is ready; anything registered with `.then` runs at that point. `wait`
is also a genuinely useful utility (retries, polling, demos).

### 26. Promise chaining and rejection

**Problem:** Write `fetchUser(id)` that resolves `{ id, name: "User" + id }` after 200ms,
but rejects with an Error if `id <= 0`. Consume it with `.then/.catch`.

**Solution:**
```js
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) reject(new Error(`Invalid id: ${id}`));
      else resolve({ id, name: "User" + id });
    }, 200);
  });
}

fetchUser(3)
  .then((user) => {
    console.log(user.name);        // "User3"
    return fetchUser(user.id + 1); // returning a promise chains it
  })
  .then((next) => console.log(next.name))                  // "User4"
  .catch((err) => console.error("Failed:", err.message));  // catches EITHER failure
```
Each `.then` returns a new promise, so chains stay flat instead of nesting. One `.catch`
at the end handles a rejection anywhere upstream — like a try/catch for the whole chain.

### 27. `async`/`await`

**Problem:** Rewrite the problem-26 consumer with `async/await` and `try/catch`.

**Solution:**
```js
async function showUsers() {
  try {
    const user = await fetchUser(3);
    console.log(user.name);            // "User3"
    const next = await fetchUser(user.id + 1);
    console.log(next.name);            // "User4"
  } catch (err) {
    console.error("Failed:", err.message);
  }
}

showUsers();
```
`await` pauses *this function* (not the whole program) until the promise settles, and a
rejected promise becomes a thrown error you catch normally. `async/await` is just syntax
over promises — same behavior as problem 26, but reads like synchronous code. This is how
you'll write nearly all async code.

### 28. `Promise.all`: parallel requests

**Problem:** Using `fetchUser` from problem 26, load users 1, 2, and 3 **at the same
time** (not one after another) and log all three names when done. What happens if one fails?

**Solution:**
```js
async function loadTeam() {
  // Sequential (slow): each await waits ~200ms -> ~600ms total.
  // Parallel: start all three, await the combined promise -> ~200ms total.
  const users = await Promise.all([fetchUser(1), fetchUser(2), fetchUser(3)]);
  console.log(users.map((u) => u.name)); // ['User1', 'User2', 'User3']
}
loadTeam();

// If ANY promise rejects, Promise.all rejects immediately with that error.
// When you want every result regardless of failures:
async function loadTeamSafe() {
  const results = await Promise.allSettled([fetchUser(1), fetchUser(-1)]);
  // [{status:'fulfilled', value:{...}}, {status:'rejected', reason:Error}]
  const ok = results.filter((r) => r.status === "fulfilled").map((r) => r.value);
  console.log(ok.length); // 1
}
loadTeamSafe();
```
Spotting independent awaits and running them in parallel is one of the easiest real
performance wins in a CRUD app (e.g., load the user, their orders, and site settings
simultaneously on page load).

### 29. `fetch`: GET a resource

**Problem:** Fetch todo #1 from `https://jsonplaceholder.typicode.com/todos/1`, log its
title, and correctly handle both network errors and HTTP error statuses (like 404).

**Solution:**
```js
async function getTodo(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);

  // fetch only REJECTS on network failure. A 404 or 500 still "succeeds" —
  // you must check res.ok yourself. Forgetting this is the #1 fetch bug.
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  return res.json(); // parses the JSON body (also async)
}

getTodo(1)
  .then((todo) => console.log(todo.title))
  .catch((err) => console.error("Could not load todo:", err.message));
```
This four-line shape — `fetch`, check `res.ok`, `res.json()`, catch — is the foundation of
every API call you'll ever write in the browser.

### 30. `fetch`: POST with a JSON body

**Problem:** Create a new post via `POST https://jsonplaceholder.typicode.com/posts` with
body `{ title, body, userId }`, sending proper headers, and return the created resource.

**Solution:**
```js
async function createPost(title, body) {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },  // tells the server it's JSON
    body: JSON.stringify({ title, body, userId: 1 }), // body must be a string
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

createPost("Hello", "My first post")
  .then((created) => console.log("Created with id:", created.id)) // 101
  .catch((err) => console.error(err.message));
```
Three things beginners forget: the `method`, the `Content-Type` header, and
`JSON.stringify` (fetch won't serialize objects for you). PUT and PATCH follow the exact
same shape with a different method.

### 31. PUT vs PATCH vs DELETE

**Problem:** Write `updatePost(id, changes)` (PATCH — partial update) and `deletePost(id)`
against `https://jsonplaceholder.typicode.com/posts/:id`, handling errors.

**Solution:**
```js
const BASE = "https://jsonplaceholder.typicode.com";

async function updatePost(id, changes) {
  const res = await fetch(`${BASE}/posts/${id}`, {
    method: "PATCH", // PATCH = change only these fields; PUT = replace the whole resource
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changes),
  });
  if (!res.ok) throw new Error(`Update failed: HTTP ${res.status}`);
  return res.json();
}

async function deletePost(id) {
  const res = await fetch(`${BASE}/posts/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Delete failed: HTTP ${res.status}`);
  // DELETE often returns 204 No Content — don't try to parse an empty body as JSON
}

updatePost(1, { title: "Edited" }).then((p) => console.log(p.title));
deletePost(1).then(() => console.log("Deleted"));
```
With GET (29), POST (30), PATCH, and DELETE you now have the full HTTP vocabulary of a
CRUD app: Create=POST, Read=GET, Update=PUT/PATCH, Delete=DELETE.

### 32. Retry with delay

**Problem:** Write `fetchWithRetry(url, retries = 3)` that retries a failed fetch up to
`retries` times, waiting 500ms between attempts.

**Solution:**
```js
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchWithRetry(url, retries = 3) {
  let lastError;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      lastError = err;
      console.warn(`Attempt ${attempt} failed: ${err.message}`);
      if (attempt < retries) await wait(500);
    }
  }
  throw lastError; // all attempts exhausted — surface the final error
}

fetchWithRetry("https://jsonplaceholder.typicode.com/todos/1")
  .then((todo) => console.log(todo.title))
  .catch((err) => console.error("Gave up:", err.message));
```
Real networks flake. A loop + try/catch + `await wait()` is the standard resilience
pattern; production versions add exponential backoff (`500 * 2 ** attempt`).

---

## Errors & Robustness

### 33. try/catch/finally

**Problem:** Write `parsePrice(input)` that converts a string like `"$19.99"` to a number,
throws a descriptive error for bad input, and demonstrate `finally` running either way.

**Solution:**
```js
function parsePrice(input) {
  const cleaned = String(input).replace(/[$,\s]/g, "");
  const value = Number(cleaned);
  if (Number.isNaN(value)) {
    throw new Error(`Cannot parse price from "${input}"`);
  }
  return value;
}

function tryParse(input) {
  try {
    console.log("Parsed:", parsePrice(input));
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    console.log("(finally always runs — cleanup goes here)");
  }
}

tryParse("$19.99"); // Parsed: 19.99
tryParse("abc");    // Error: Cannot parse price from "abc"
```
Throw `Error` objects (never bare strings) so you get stack traces. `finally` is for
cleanup that must happen on success *or* failure — closing spinners, releasing locks.

### 34. Custom error classes

**Problem:** Create `ValidationError` and `NotFoundError` classes, throw them from a
`getUser(id)` function, and handle them differently with `instanceof`.

**Solution:**
```js
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class NotFoundError extends Error {
  constructor(resource, id) {
    super(`${resource} ${id} not found`);
    this.name = "NotFoundError";
  }
}

const users = { 1: { id: 1, name: "Ada" } };

function getUser(id) {
  if (typeof id !== "number") throw new ValidationError("id must be a number");
  const user = users[id];
  if (!user) throw new NotFoundError("User", id);
  return user;
}

try {
  getUser(99);
} catch (err) {
  if (err instanceof NotFoundError) console.warn("Show a 404 page");
  else if (err instanceof ValidationError) console.warn("Show a form error");
  else throw err; // unknown errors should NOT be swallowed — rethrow them
}
```
Distinct error types let calling code react appropriately (404 page vs form message vs
crash report). The `else throw err` line matters: never silently eat errors you don't
recognize.

### 35. Input validation with helpful messages

**Problem:** Write `validateSignup(form)` for `{ email, password, age }` returning
`{ valid: boolean, errors: string[] }` — collect *all* errors, not just the first.

**Solution:**
```js
function validateSignup(form) {
  const errors = [];

  if (!form.email || !form.email.includes("@")) {
    errors.push("Email must be a valid address");
  }
  if (!form.password || form.password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }
  if (form.age !== undefined && (typeof form.age !== "number" || form.age < 13)) {
    errors.push("Age must be a number of at least 13");
  }

  return { valid: errors.length === 0, errors };
}

console.log(validateSignup({ email: "a@b.com", password: "secret123" }));
// { valid: true, errors: [] }
console.log(validateSignup({ email: "nope", password: "hi" }));
// { valid: false, errors: ['Email must be...', 'Password must be...'] }
```
Returning a result object (instead of throwing on the first problem) lets a form show
every issue at once — much better UX. This exact shape plugs straight into React forms.

### 36. Safe JSON parsing

**Problem:** `JSON.parse` throws on malformed input. Write `safeParse(json, fallback)`
that never throws, and show why you'd use it for `localStorage` reads.

**Solution:**
```js
function safeParse(json, fallback = null) {
  try {
    return JSON.parse(json);
  } catch {
    return fallback; // malformed, empty, or undefined input -> fallback
  }
}

console.log(safeParse('{"a":1}'));            // { a: 1 }
console.log(safeParse("not json", {}));       // {}
console.log(safeParse(localStorage?.getItem?.("settings"), {})); // {} if missing/corrupt

// Bonus: JSON round-trip loses things — know your serialization limits
const obj = { date: new Date(), fn: () => 1, missing: undefined };
console.log(JSON.parse(JSON.stringify(obj)));
// { date: "2026-...Z" } — Date became a string; functions/undefined were dropped
```
Anything that crosses a boundary (localStorage, APIs, query strings) is untrusted text.
Wrap the parse, provide a fallback, and your app survives corrupt data instead of
white-screening.

### 37. Optional chaining

**Problem:** Given an API response where `user.profile.address.city` may be missing at any
level, log the city or `"Unknown"` without any `if` statements or crashes. Also call a
method that may not exist.

**Solution:**
```js
const response1 = { user: { profile: { address: { city: "Boston" } } } };
const response2 = { user: { profile: null } };

console.log(response1.user?.profile?.address?.city ?? "Unknown"); // "Boston"
console.log(response2.user?.profile?.address?.city ?? "Unknown"); // "Unknown"

// Without ?. the second line would throw:
// TypeError: Cannot read properties of null (reading 'address')

// Optional method call — runs only if the method exists:
const logger = {};
logger.debug?.("this line is a safe no-op");
```
`?.` short-circuits to `undefined` the moment it hits `null`/`undefined`; pair it with
`??` for a default. Use it at *boundaries* where data is genuinely optional — if a field
should always exist, let the crash reveal the real bug instead of hiding it.

### 38. Guard clauses

**Problem:** Refactor this arrow-of-doom into guard clauses:

```js
function applyDiscount(order, user) {
  if (order) {
    if (user) {
      if (user.isMember) {
        if (order.total > 100) {
          return order.total * 0.9;
        } else { return order.total; }
      } else { return order.total; }
    } else { throw new Error("No user"); }
  } else { throw new Error("No order"); }
}
```

**Solution:**
```js
function applyDiscount(order, user) {
  if (!order) throw new Error("No order");
  if (!user) throw new Error("No user");
  if (!user.isMember) return order.total;
  if (order.total <= 100) return order.total;

  return order.total * 0.9; // the "happy path" ends up unindented and obvious
}
```
Handle the exceptional cases first and return early; the main logic then reads top-to-
bottom with no nesting. This is the single highest-value readability refactor in everyday
code review.

---

## Practical Utilities

### 39. Working with dates

**Problem:** (a) Format today as `YYYY-MM-DD`. (b) Compute the number of days between two
dates. (c) Produce a human "3 days ago" string for a recent timestamp.

**Solution:**
```js
// (a) ISO date portion — reliable and sortable
const today = new Date().toISOString().slice(0, 10); // "2026-07-02"

// (b) date math works in milliseconds
function daysBetween(a, b) {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  return Math.round(Math.abs(b - a) / MS_PER_DAY); // Date subtraction gives ms
}
console.log(daysBetween(new Date("2026-07-02"), new Date("2026-06-25"))); // 7

// (c) relative time
function timeAgo(date) {
  const days = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}
console.log(timeAgo(new Date(Date.now() - 3 * 86400000))); // "3 days ago"
```
Dates are stored as ms-since-1970, so subtraction and comparison just work. For anything
fancier (time zones, localized formats) use `Intl.DateTimeFormat` or a library — but these
three cover most CRUD-app needs (created dates, "last updated" labels).

### 40. Unique items and de-duplication by key

**Problem:** (a) De-duplicate `[1, 2, 2, 3, 1]`. (b) De-duplicate an array of user objects
by `email`, keeping the first occurrence.

**Solution:**
```js
// (a) Set stores unique primitives; spread it back into an array
const unique = [...new Set([1, 2, 2, 3, 1])];
console.log(unique); // [1, 2, 3]

// (b) Sets compare objects by reference, so dedupe objects via a keyed Map
function uniqueBy(items, keyFn) {
  const seen = new Map();
  for (const item of items) {
    const key = keyFn(item);
    if (!seen.has(key)) seen.set(key, item); // first one wins
  }
  return [...seen.values()];
}

const rows = [
  { email: "a@x.com", name: "Ada" },
  { email: "b@x.com", name: "Bea" },
  { email: "a@x.com", name: "Ada (duplicate import)" },
];
console.log(uniqueBy(rows, (r) => r.email).length); // 2
```
De-duplication comes up constantly with imported or merged data. Know both tools: `Set`
for primitives, a keyed `Map` for objects.

### 41. Pagination math

**Problem:** Write `paginate(items, page, pageSize)` returning
`{ data, page, totalPages, hasNext, hasPrev }`. Pages are 1-based.

**Solution:**
```js
function paginate(items, page = 1, pageSize = 10) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages); // clamp into range

  const start = (safePage - 1) * pageSize;
  const data = items.slice(start, start + pageSize); // slice never throws on overflow

  return {
    data,
    page: safePage,
    totalPages,
    hasNext: safePage < totalPages,
    hasPrev: safePage > 1,
  };
}

const items = Array.from({ length: 23 }, (_, i) => i + 1); // [1..23]
console.log(paginate(items, 3, 10));
// { data: [21, 22, 23], page: 3, totalPages: 3, hasNext: false, hasPrev: true }
```
Every list view eventually needs paging. The two ideas: `slice(start, start + size)` for
the window, and clamping the page number so bad input (page 999, page -1) degrades
gracefully instead of showing an empty screen.

### 42. Building query strings

**Problem:** Write `buildUrl(base, params)` that turns
`buildUrl("/api/products", { search: "usb cable", page: 2, inStock: true })` into a
correctly encoded URL, skipping `undefined`/`null` params.

**Solution:**
```js
function buildUrl(base, params = {}) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      query.append(key, value); // URLSearchParams handles encoding for you
    }
  }
  const qs = query.toString();
  return qs ? `${base}?${qs}` : base;
}

console.log(buildUrl("/api/products", { search: "usb cable", page: 2, inStock: true }));
// /api/products?search=usb+cable&page=2&inStock=true
console.log(buildUrl("/api/products", { search: undefined })); // /api/products
```
Never hand-concatenate query strings — spaces, `&`, and `=` in user input will corrupt the
URL. `URLSearchParams` also *parses*: `new URLSearchParams(location.search).get("page")`.

### 43. Shallow vs deep copies

**Problem:** Show the bug when a shallow copy shares nested data, then fix it with a deep
clone.

**Solution:**
```js
const original = { name: "Ada", address: { city: "Boston" } };

const shallow = { ...original };
shallow.address.city = "NYC";        // mutates the SHARED nested object
console.log(original.address.city);  // "NYC" — bug! spread only copies one level

const original2 = { name: "Ada", address: { city: "Boston" } };
const deep = structuredClone(original2); // real deep clone (modern runtimes)
deep.address.city = "NYC";
console.log(original2.address.city); // "Boston" — safe

// Older codebases: JSON.parse(JSON.stringify(obj)) — works for plain data,
// but drops functions/undefined and stringifies Dates (see problem 36).
```
Spread copies the top level only; nested objects are shared references. Most state bugs
where "changing one thing changed another" trace back to this. Reach for
`structuredClone` when you truly need independence.

### 44. A localStorage wrapper

**Problem:** Write a `storage` module with `get(key, fallback)`, `set(key, value)`, and
`remove(key)` that transparently handles JSON and corrupt data.

**Solution:**
```js
const storage = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      return fallback; // corrupt JSON or storage blocked -> fallback, never a crash
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value)); // storage only holds strings
  },
  remove(key) {
    localStorage.removeItem(key);
  },
};

storage.set("cart", [{ id: 1, qty: 2 }]);
console.log(storage.get("cart", []));      // [{ id: 1, qty: 2 }]
console.log(storage.get("missing", []));   // []
```
localStorage stores only strings, so every real app wraps it exactly like this:
stringify on the way in, guarded parse on the way out, fallback for missing keys. Used
for carts, drafts, theme preferences, and cached API data.

---

## Building a CRUD Data Layer

The last six problems build one thing: the data layer of a task-manager app.

### 45. In-memory store: Create and Read

**Problem:** Build `createStore()` returning `{ add(text), getAll(), getById(id) }` over a
private array. `add` returns the created task `{ id, text, done, createdAt }`.

**Solution:**
```js
function createStore() {
  let tasks = [];  // private via closure (problem 19)
  let nextId = 1;

  return {
    add(text) {
      if (!text?.trim()) throw new Error("Task text is required");
      const task = {
        id: nextId++,
        text: text.trim(),
        done: false,
        createdAt: new Date().toISOString(),
      };
      tasks = [...tasks, task];   // immutable update (problem 18)
      return task;
    },
    getAll() {
      return [...tasks];          // return a copy so callers can't mutate our state
    },
    getById(id) {
      return tasks.find((t) => t.id === id) ?? null; // null is clearer than undefined
    },
  };
}

const store = createStore();
store.add("Learn closures");
store.add("Build the store");
console.log(store.getAll().length);  // 2
console.log(store.getById(99));      // null
```
This is Create and Read. Note the defensive habits: validate input, return copies, return
`null` explicitly for "not found."

### 46. In-memory store: Update and Delete

**Problem:** Extend the store with `update(id, changes)` (throws `NotFoundError` on a bad
id, ignores attempts to change `id`) and `remove(id)` (returns `true`/`false`).

**Solution:**
```js
// inside the object returned by createStore():
    update(id, changes) {
      const exists = tasks.some((t) => t.id === id);
      if (!exists) throw new Error(`Task ${id} not found`);

      tasks = tasks.map((t) =>
        t.id === id
          ? { ...t, ...changes, id: t.id } // re-assert id so changes can't overwrite it
          : t
      );
      return this.getById(id);
    },

    remove(id) {
      const before = tasks.length;
      tasks = tasks.filter((t) => t.id !== id);
      return tasks.length < before; // false = nothing deleted; caller decides if that's an error
    },

// usage:
const s = createStore();
const t = s.add("Draft");
s.update(t.id, { done: true });
console.log(s.getById(t.id).done); // true
console.log(s.remove(t.id));       // true
console.log(s.remove(999));        // false
```
Full CRUD complete. The `{ ...t, ...changes, id: t.id }` trick — spread the changes, then
re-assert protected fields — is how real APIs prevent clients from overwriting ids and
timestamps.

### 47. Query features: search, filter, sort

**Problem:** Add `query({ search, done, sortBy })` to the store: case-insensitive text
search, optional done-filter, sort by `"createdAt"` or `"text"`.

**Solution:**
```js
    query({ search, done, sortBy = "createdAt" } = {}) {
      let result = [...tasks];

      if (search) {
        const term = search.toLowerCase();
        result = result.filter((t) => t.text.toLowerCase().includes(term));
      }
      if (done !== undefined) {          // explicit check: `false` is a real filter value!
        result = result.filter((t) => t.done === done);
      }
      result.sort((a, b) =>
        sortBy === "text"
          ? a.text.localeCompare(b.text)
          : a.createdAt.localeCompare(b.createdAt) // ISO strings sort chronologically
      );
      return result;
    },

// usage:
store.query({ search: "learn", done: false, sortBy: "text" });
```
Two subtle points: check `done !== undefined` rather than `if (done)` (problem 7's falsy
trap — `done: false` is a legitimate filter), and ISO-8601 timestamps sort correctly as
plain strings.

### 48. An API client module

**Problem:** Write a reusable `api` module wrapping fetch: `api.get(path)`,
`api.post(path, body)`, `api.patch(path, body)`, `api.delete(path)` — one place for the
base URL, headers, error handling, and JSON.

**Solution:**
```js
const API_BASE = "https://jsonplaceholder.typicode.com";

async function request(path, { method = "GET", body } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    // one consistent error shape for the whole app
    throw new Error(`${method} ${path} failed: HTTP ${res.status}`);
  }
  if (res.status === 204) return null; // No Content (common for DELETE)
  return res.json();
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body }),
  patch: (path, body) => request(path, { method: "PATCH", body }),
  delete: (path) => request(path, { method: "DELETE" }),
};

// usage anywhere in the app:
// const todos = await api.get("/todos");
// const created = await api.post("/todos", { title: "hi" });
```
Every fetch rule from problems 29–31 now lives in ONE function instead of being repeated
at every call site. This module (or a library like axios doing the same job) exists in
virtually every production frontend.

### 49. Optimistic updates with rollback

**Problem:** Write `toggleTodoOptimistic(todos, id, saveFn)`: flip the todo in the UI
list immediately, call `saveFn` to persist, and roll back if the save fails. Return the
final list.

**Solution:**
```js
async function toggleTodoOptimistic(todos, id, saveFn) {
  const original = todos; // keep the pre-change list for rollback

  const optimistic = todos.map((t) =>
    t.id === id ? { ...t, done: !t.done } : t
  );
  render(optimistic); // user sees the change instantly — no waiting on the network

  try {
    await saveFn(id); // e.g. api.patch(`/todos/${id}`, { done: ... })
    return optimistic;
  } catch (err) {
    render(original); // save failed -> restore the truth
    showToast("Couldn't save change — please retry");
    return original;
  }
}

const render = (list) => console.log("UI now shows:", list.map((t) => t.done));
const showToast = (msg) => console.warn(msg);
```
"Optimistic UI" is why good apps feel instant: update locally first, persist in the
background, roll back on failure. Immutability makes the rollback trivial — the old array
still exists untouched because we never mutated it.

### 50. Capstone: wire it all together

**Problem:** Combine the api module (48) and validation (35) into a `taskService` that a
UI could call: `list(filters)`, `create(text)`, `toggle(id, done)`, `remove(id)` — with
validation before network calls and errors translated into user-friendly messages.

**Solution:**
```js
import { api } from "./api.js";

function validateText(text) {
  const errors = [];
  if (!text?.trim()) errors.push("Task text is required");
  if (text?.length > 200) errors.push("Task text must be under 200 characters");
  return errors;
}

export const taskService = {
  async list({ done, search } = {}) {
    const query = new URLSearchParams();
    if (done !== undefined) query.set("completed", done);
    const todos = await api.get(`/todos?${query}`);
    return search
      ? todos.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
      : todos;
  },

  async create(text) {
    const errors = validateText(text);
    if (errors.length) throw new Error(errors.join("; ")); // fail BEFORE the network call
    return api.post("/todos", { title: text.trim(), completed: false });
  },

  async toggle(id, done) {
    return api.patch(`/todos/${id}`, { completed: done });
  },

  async remove(id) {
    await api.delete(`/todos/${id}`);
    return true;
  },
};

// A UI (plain JS or React) now needs zero knowledge of HTTP:
// const tasks = await taskService.list({ done: false, search: "report" });
// await taskService.create("Ship the learning lab");
```
This layering — **UI → service (validation + business rules) → api client (HTTP) →
server** — is the architecture of essentially every CRUD frontend. If you can build and
explain this file, you're thinking like a mid-level developer. Next stop: TypeScript, to
make these contracts explicit.
