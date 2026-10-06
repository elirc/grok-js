# React — 50 Problems for the CRUD Web Developer

Ordered easiest-first. Sections: Components & JSX (1–8), State & Events (9–16),
Effects & Data Fetching (17–24), Forms & List CRUD (25–32), Hooks & Architecture
(33–40), Full CRUD Against an API (41–50).

Set up a playground with `npm create vite@latest my-lab -- --template react` (or
`react-ts` to practice your TypeScript at the same time), then `npm install && npm run dev`.
Render any solution by importing it in `App.jsx`.

---

## Components & JSX

### 1. Your first component

**Problem:** Write a `Welcome` component that renders an `<h1>` saying "Welcome to the
Lab" and a paragraph under it, and render it inside `App`.

**Solution:**
```jsx
function Welcome() {
  return (
    <div>
      <h1>Welcome to the Lab</h1>
      <p>50 problems to React mastery.</p>
    </div>
  );
}

export default function App() {
  return <Welcome />;
}
```
A component is just a function that returns JSX. Two rules to burn in now: the name must
start with a **capital letter** (lowercase means an HTML tag), and it must return **one
root element** (here the `<div>`; an empty fragment `<>...</>` works when you don't want
a wrapper node).

### 2. JSX is JavaScript

**Problem:** Render a component showing the current year, `5 * 8` computed, and a
variable `user = "Ada"` — all inside JSX. Note the two attribute renames JSX forces.

**Solution:**
```jsx
function Facts() {
  const user = "Ada";
  return (
    <section className="facts" htmlFor={undefined}>
      <p>Year: {new Date().getFullYear()}</p>
      <p>Math: {5 * 8}</p>
      <p>Hello, {user.toUpperCase()}</p>
    </section>
  );
}
```
Curly braces embed any JavaScript *expression* (not statements — no `if`/`for` directly
in JSX). Because JSX compiles to JavaScript, reserved words are renamed: `class` →
`className` and `for` → `htmlFor`. Attributes are camelCase (`onClick`, `tabIndex`).

### 3. Props

**Problem:** Write `ProductCard({ name, price, inStock })` and render three cards with
different data from an `App`.

**Solution:**
```jsx
function ProductCard({ name, price, inStock }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 12, margin: 8 }}>
      <h3>{name}</h3>
      <p>${price.toFixed(2)}</p>
      <p>{inStock ? "In stock" : "Out of stock"}</p>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <ProductCard name="Mouse" price={19.99} inStock={true} />
      <ProductCard name="Monitor" price={199} inStock={false} />
      <ProductCard name="Cable" price={9.5} inStock />
    </div>
  );
}
```
Props are the component's parameters — read-only inputs passed like attributes. Strings
use quotes; everything else (numbers, booleans, objects, functions) needs braces. A bare
prop like `inStock` means `inStock={true}`. **Never modify props** — data flows down,
one way.

### 4. The `children` prop

**Problem:** Build a reusable `Card({ title, children })` wrapper that renders a styled
box with a heading, and use it around arbitrary content twice.

**Solution:**
```jsx
function Card({ title, children }) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16, margin: 8 }}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default function App() {
  return (
    <>
      <Card title="Profile">
        <p>Name: Ada Lovelace</p>
        <p>Role: Admin</p>
      </Card>
      <Card title="Actions">
        <button>Edit</button>
        <button>Delete</button>
      </Card>
    </>
  );
}
```
Whatever you nest between `<Card>...</Card>` arrives as the `children` prop. This is
React's composition model: layout components (cards, modals, page shells) don't need to
know what goes inside them.

### 5. Conditional rendering

**Problem:** Write `StatusBanner({ status })` that renders a green "All systems go" for
`"ok"`, a red error box for `"error"`, and *nothing at all* for `"idle"`.

**Solution:**
```jsx
function StatusBanner({ status }) {
  if (status === "idle") return null; // render nothing — a legitimate return value

  return status === "ok" ? (
    <div style={{ background: "#d4f7d4", padding: 8 }}>All systems go</div>
  ) : (
    <div style={{ background: "#f7d4d4", padding: 8 }}>Something went wrong</div>
  );
}

// Also common — && for "render only if":
function Inbox({ unread }) {
  return (
    <div>
      <h1>Inbox</h1>
      {unread > 0 && <p>You have {unread} unread messages</p>}
    </div>
  );
}
```
Three tools: early-return `null` for "don't render", ternary for either/or, `&&` for
"maybe render". One `&&` trap: `{count && <p>...</p>}` renders a literal `0` when count
is 0 — write `{count > 0 && ...}` instead.

### 6. Rendering lists and keys

**Problem:** Render `const fruits = [{ id: 1, name: "Apple" }, { id: 2, name: "Banana" },
{ id: 3, name: "Cherry" }]` as a `<ul>`, with correct keys. Why not use the array index?

**Solution:**
```jsx
function FruitList() {
  const fruits = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Cherry" },
  ];

  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit.id}>{fruit.name}</li>
      ))}
    </ul>
  );
}
```
`map` an array into an array of elements, and give each a `key` that's **stable and
unique** — almost always the database id. Index-as-key breaks when the list reorders,
inserts, or deletes: React matches old and new items by key, so shifting indexes make it
reuse the wrong DOM/state (a classic bug with input fields in lists).

### 7. Composing a page from components

**Problem:** Build a static page: `Header` (site name), `UserList` (renders three
`UserRow`s), `Footer`. One component per concern, data passed down as props.

**Solution:**
```jsx
const USERS = [
  { id: 1, name: "Ada", role: "admin" },
  { id: 2, name: "Grace", role: "member" },
  { id: 3, name: "Linus", role: "member" },
];

function Header({ siteName }) {
  return <header><h1>{siteName}</h1></header>;
}

function UserRow({ user }) {
  return (
    <li>
      {user.name} — <em>{user.role}</em>
    </li>
  );
}

function UserList({ users }) {
  return (
    <ul>
      {users.map((u) => <UserRow key={u.id} user={u} />)}
    </ul>
  );
}

function Footer() {
  return <footer><small>© 2026 Fable Learning Lab</small></footer>;
}

export default function App() {
  return (
    <>
      <Header siteName="User Admin" />
      <UserList users={USERS} />
      <Footer />
    </>
  );
}
```
This top-down shape — page → list → row — is the skeleton of every CRUD screen. Notice
each component takes exactly the data it needs, no more; that keeps them reusable and
easy to test.

### 8. Styling options

**Problem:** Show the same "badge" three ways: inline `style`, a CSS class via
`className`, and a dynamic class chosen from props.

**Solution:**
```jsx
/* styles.css:
.badge { padding: 2px 10px; border-radius: 999px; font-size: 12px; }
.badge--ok { background: #d4f7d4; }
.badge--warn { background: #fff3cd; }
*/
import "./styles.css";

function Badges({ level }) {
  return (
    <div>
      {/* 1. Inline style: a JS object, camelCase properties, values as strings/numbers */}
      <span style={{ padding: "2px 10px", borderRadius: 999, background: "#eee" }}>
        inline
      </span>

      {/* 2. Static class */}
      <span className="badge badge--ok">class</span>

      {/* 3. Dynamic class from props — template literal */}
      <span className={`badge ${level === "warn" ? "badge--warn" : "badge--ok"}`}>
        dynamic
      </span>
    </div>
  );
}
```
Inline styles are fine for one-off dynamic values; classes are better for anything
reused. (In real projects you'll meet CSS Modules or Tailwind — both are just ways of
producing `className`.) The double-brace `style={{ ... }}` is nothing special: an object
literal inside a JSX expression.

---

## State & Events

### 9. `useState`: the counter

**Problem:** Build a counter with +, −, and Reset buttons. Explain why a plain variable
wouldn't work.

**Solution:**
```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0); // [current value, setter], initial 0

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```
A plain `let count` would reset on every render and, worse, changing it wouldn't tell
React anything — the screen would never update. `useState` gives you a value that
*survives* re-renders and a setter that *triggers* one. State is the component's memory;
setters are how the UI knows to redraw.

### 10. Updater functions and state batching

**Problem:** Predict what this button does, explain why, and fix it so one click adds 3:

```jsx
<button onClick={() => { setCount(count + 1); setCount(count + 1); setCount(count + 1); }}>
```

**Solution:**
```jsx
// It adds only 1. `count` is a snapshot from THIS render — all three calls
// compute the same `count + 1` (e.g. 0 + 1 three times), and React batches them.

// Fix: pass an updater FUNCTION — each receives the latest pending value:
<button
  onClick={() => {
    setCount((c) => c + 1);
    setCount((c) => c + 1);
    setCount((c) => c + 1); // 0 -> 1 -> 2 -> 3 within one click
  }}
>
  +3
</button>
```
Rule: whenever the next state depends on the previous state, use the updater form
`setCount(c => c + 1)`. It also prevents stale-value bugs inside timers, async callbacks,
and rapid clicks — situations where the captured `count` is old by the time you use it.

### 11. Controlled inputs

**Problem:** Build a text input that displays "You typed: ..." live as the user types.

**Solution:**
```jsx
import { useState } from "react";

function Echo() {
  const [text, setText] = useState("");

  return (
    <div>
      <input
        value={text}                              // React state is the source of truth
        onChange={(e) => setText(e.target.value)} // every keystroke updates state
        placeholder="Type something"
      />
      <p>You typed: {text}</p>
    </div>
  );
}
```
This is a **controlled input**: its displayed value comes from state, and typing flows
through `onChange` back into state. The payoff: at any moment, `text` *is* the input —
you can validate it, transform it, clear it (`setText("")`), or submit it, all from code.
Nearly every form field you write will look like this.

### 12. Object state: update immutably

**Problem:** Hold `{ name, email }` in one state object and wire two inputs to it —
without losing the other field when one changes.

**Solution:**
```jsx
function ProfileForm() {
  const [form, setForm] = useState({ name: "", email: "" });

  // one handler for any field, keyed by the input's name attribute
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value })); // copy old fields, overwrite one
  }

  return (
    <form>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </form>
  );
}
```
Two crucial pieces: the spread (`...prev`) keeps the fields you're *not* changing —
`setForm({ name: value })` would delete email — and `[name]: value` (computed property)
lets one handler serve every input. React only re-renders when state is a **new object**,
which is why mutation (`form.name = x`) silently fails.

### 13. Array state: the three moves

**Problem:** Build a tag editor: an input plus "Add" button, each tag shown with a
remove "×", and clicking a tag uppercases it. (Add / remove / update — no mutation.)

**Solution:**
```jsx
function TagEditor() {
  const [tags, setTags] = useState(["react", "js"]);
  const [draft, setDraft] = useState("");

  const addTag = () => {
    const t = draft.trim().toLowerCase();
    if (!t || tags.includes(t)) return;      // ignore empty and duplicates
    setTags([...tags, t]);                   // ADD: spread into a new array
    setDraft("");
  };

  const removeTag = (tag) =>
    setTags(tags.filter((t) => t !== tag));  // REMOVE: filter

  const shoutTag = (tag) =>
    setTags(tags.map((t) => (t === tag ? t.toUpperCase() : t))); // UPDATE: map

  return (
    <div>
      <input value={draft} onChange={(e) => setDraft(e.target.value)} />
      <button onClick={addTag}>Add</button>
      <ul>
        {tags.map((tag) => (
          <li key={tag}>
            <span onClick={() => shoutTag(tag)}>{tag}</span>
            <button onClick={() => removeTag(tag)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```
These are exactly the immutable patterns from the JavaScript file (problem 18), now
driving a UI. `push`, `splice`, and `arr[i] =` all mutate and will *not* re-render —
if your list "doesn't update," this is almost always why.

### 14. Events with arguments and the render-vs-call trap

**Problem:** Render three buttons from `["S", "M", "L"]` that log their size when
clicked. Explain why `onClick={handle(size)}` fires immediately and on every render.

**Solution:**
```jsx
function SizePicker() {
  const [selected, setSelected] = useState(null);

  const choose = (size) => setSelected(size);

  return (
    <div>
      {["S", "M", "L"].map((size) => (
        <button key={size} onClick={() => choose(size)}>
          {size} {selected === size ? "✓" : ""}
        </button>
      ))}
    </div>
  );
}

// onClick={choose(size)}    — WRONG: calls choose during render, passes its
//                             return value (undefined) as the handler.
// onClick={() => choose(size)} — RIGHT: passes a function to call later.
// onClick={choose}          — fine only when you don't need arguments
//                             (the event object is passed automatically).
```
`onClick` wants a *function*, not the *result* of calling one. The arrow wrapper is how
you bind arguments. Calling a state setter during render causes the infamous
"Too many re-renders" loop — same mistake, louder symptom.

### 15. Lifting state up

**Problem:** Two sibling components: `TemperatureInput` and `Verdict` ("Warm"/"Cold",
above or below 20°). They must share the value. Where does the state live?

**Solution:**
```jsx
function TemperatureInput({ value, onChange }) {   // stateless: fully driven by props
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  );
}

function Verdict({ celsius }) {
  return <p>{celsius >= 20 ? "Warm 🌞" : "Cold 🧊"}</p>;
}

function Weather() {
  const [celsius, setCelsius] = useState(15); // state lives in the CLOSEST COMMON PARENT

  return (
    <div>
      <TemperatureInput value={celsius} onChange={setCelsius} />
      <Verdict celsius={celsius} />
    </div>
  );
}
```
Siblings can't talk to each other — data flows down, so shared state must live in the
closest common ancestor. The parent passes the *value* down to one child and a *change
handler* down to the other (or both). "Lift state up" solves 90% of "how do I get data
from component A to component B?"

### 16. Derived state: don't store what you can compute

**Problem:** A todo list needs a "remaining count" and a filtered "active only" view.
Show the wrong design (extra state) and the right one (compute during render).

**Solution:**
```jsx
function TodoStats() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn state", done: true },
    { id: 2, text: "Learn derived state", done: false },
  ]);
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  // WRONG: const [remaining, setRemaining] = useState(0)
  // — now every add/toggle/delete must remember to update it, and one missed
  //   update means the count is silently wrong.

  // RIGHT: derive it. Plain constants, recomputed each render, can never drift.
  const remaining = todos.filter((t) => !t.done).length;
  const visible = showActiveOnly ? todos.filter((t) => !t.done) : todos;

  return (
    <div>
      <p>{remaining} remaining</p>
      <label>
        <input
          type="checkbox"
          checked={showActiveOnly}
          onChange={(e) => setShowActiveOnly(e.target.checked)}
        />
        Active only
      </label>
      <ul>{visible.map((t) => <li key={t.id}>{t.text}</li>)}</ul>
    </div>
  );
}
```
Ask of every piece of state: *can I compute this from existing state or props?* If yes,
compute it — during render, as a plain constant. Store only the **minimal source of
truth** (the todos and the filter flag); everything else is derived. Redundant state is
the leading cause of "the UI is out of sync" bugs.

---

## Effects & Data Fetching

### 17. `useEffect` basics

**Problem:** Set the browser tab title to `"(n) unread"` whenever an `unread` counter
changes. Why can't you just do it during render?

**Solution:**
```jsx
import { useEffect, useState } from "react";

function Inbox() {
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    document.title = `(${unread}) unread`;
  }, [unread]); // run after render, only when unread changed

  return <button onClick={() => setUnread((n) => n + 1)}>New message</button>;
}
```
Rendering must be a pure calculation: props/state in, JSX out, no side effects. Anything
that touches the world *outside* React — `document`, timers, network, subscriptions —
belongs in `useEffect`, which runs *after* the render is committed. The dependency array
`[unread]` means "re-run only when this value changes."

### 18. Effect cleanup

**Problem:** Build a `Clock` that ticks every second — without leaking timers when the
component unmounts. Then explain what the cleanup function is.

**Solution:**
```jsx
function Clock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);

    return () => clearInterval(id); // cleanup: runs on unmount (and before any re-run)
  }, []); // empty deps: set up once

  return <p>{now.toLocaleTimeString()}</p>;
}
```
The function you `return` from an effect is its cleanup — React calls it when the
component unmounts and before the effect re-runs. Every subscription-like effect
(intervals, event listeners, sockets) needs one; without it, the interval outlives the
component and keeps calling `setNow`, leaking the timer and everything its closure holds.
(React 18 removed the old "state update on an unmounted component" console warning, so
this leak is now silent — another reason to write the cleanup by habit.)

### 19. Fetch on mount — with loading and error states

**Problem:** Load users from `https://jsonplaceholder.typicode.com/users` when the
component mounts, and render all three UI states: loading, error, success.

**Solution:**
```jsx
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false; // guards against setting state after unmount

    async function load() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setUsers(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();

    return () => { cancelled = true; };
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error) return <p style={{ color: "red" }}>Failed to load: {error}</p>;
  return (
    <ul>
      {users.map((u) => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}
```
Memorize this triad — `data`, `loading`, `error` — and the render order: loading first,
then error, then success. Every data-driven screen in every CRUD app is a variation of
this component. The `cancelled` flag prevents the "setState on unmounted component"
race when the user navigates away mid-request.

### 20. Re-fetching when inputs change

**Problem:** Given a `userId` prop, load that user's posts — and reload whenever
`userId` changes. What goes in the dependency array, and what happens if you lie about it?

**Solution:**
```jsx
function UserPosts({ userId }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setPosts([]); // clear stale posts from the previous user

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => { if (!cancelled) setPosts(data); })
      .catch(console.error)
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [userId]); // ← the effect reads userId, so userId must be listed

  if (loading) return <p>Loading posts…</p>;
  return <ul>{posts.map((p) => <li key={p.id}>{p.title}</li>)}</ul>;
}
```
The rule: **every reactive value the effect reads goes in the array.** Omit `userId` and
the component keeps showing the first user's posts forever (stale closure); the linter
rule `react-hooks/exhaustive-deps` exists to catch exactly this. Also note the reset of
`posts`/`loading` at the top — switching users should not flash the old user's data.

### 21. StrictMode and the double-run

**Problem:** Your effect's `console.log("fetching")` prints twice in development. Is it a
bug? What is React telling you?

**Solution:**
```jsx
// main.jsx — Vite wraps your app like this by default:
// <React.StrictMode><App /></React.StrictMode>

// In DEVELOPMENT ONLY, StrictMode mounts, unmounts, and remounts each component
// once, running effects twice, to prove your effects survive being re-run.
// Production runs them once. It is a feature, not a bug.

useEffect(() => {
  const controller = new AbortController();

  fetch(url, { signal: controller.signal })
    .then((res) => res.json())
    .then(setData)
    .catch((err) => {
      if (err.name !== "AbortError") setError(err.message);
    });

  return () => controller.abort(); // cleanup makes the double-run harmless
}, [url]);
```
If the double-run breaks your component, the component was already broken — it would
also break on fast navigation or flaky networks. The fix is never "remove StrictMode";
it's proper cleanup (abort the fetch, clear the timer, unsubscribe). Write effects so
that *setup + cleanup + setup again* leaves everything correct.

### 22. `useRef`: escape hatch to the DOM

**Problem:** Focus an input when a "Search" button is clicked, and explain how a ref
differs from state.

**Solution:**
```jsx
import { useRef } from "react";

function SearchBox() {
  const inputRef = useRef(null); // { current: null } until attached

  return (
    <div>
      <input ref={inputRef} placeholder="Search…" />
      <button onClick={() => inputRef.current?.focus()}>Search</button>
    </div>
  );
}
```
A ref is a box (`.current`) that persists across renders — like state — but **changing it
does not re-render** — unlike state. Two uses: holding DOM nodes (focus, scroll, measure)
and stashing mutable values that aren't part of the UI (timer ids, previous values).
If the screen should update when a value changes, it's state, not a ref.

### 23. Sharing data with `useContext`

**Problem:** A `ThemeToggle` deep in the tree needs the current theme and a setter from
`App` — without threading props through every layer.

**Solution:**
```jsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

export default function App() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Page />
    </ThemeContext.Provider>
  );
}

function Page() {           // no theme props pass through here…
  return <Toolbar />;
}

function Toolbar() {        // …or here
  return <ThemeToggle />;
}

function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext); // grab it directly
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Current: {theme}
    </button>
  );
}
```
Context solves **prop drilling**: a Provider makes a value available to any descendant
that asks with `useContext`. Use it for genuinely global concerns — theme, current user,
locale. Don't reach for it for ordinary parent-child data; props remain the default.

### 24. A loading skeleton pattern

**Problem:** Extract the loading/error/success rendering from problem 19 into a reusable
`<AsyncBoundary loading={} error={}>` component.

**Solution:**
```jsx
function AsyncBoundary({ loading, error, onRetry, children }) {
  if (loading) return <p>Loading…</p>;
  if (error) {
    return (
      <div role="alert" style={{ color: "crimson" }}>
        <p>Something went wrong: {error}</p>
        {onRetry && <button onClick={onRetry}>Retry</button>}
      </div>
    );
  }
  return children; // success: render whatever was nested inside
}

// usage — the data component stays focused on data:
function UserPage({ users, loading, error, reload }) {
  return (
    <AsyncBoundary loading={loading} error={error} onRetry={reload}>
      <ul>{users.map((u) => <li key={u.id}>{u.name}</li>)}</ul>
    </AsyncBoundary>
  );
}
```
Once you've written loading/error branches three times, extract them. `children` (problem
4) makes the boundary wrap anything. Small, boring, reused components like this are what
make a codebase feel professional — and the `onRetry` affordance turns dead-end error
screens into recoverable ones.

---

## Forms & List CRUD

### 25. Form submission done right

**Problem:** Build a login form that collects email/password state and logs them on
submit — without reloading the page, and with the button disabled while either field is
empty.

**Solution:**
```jsx
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // stop the browser's full-page form POST
    console.log({ email, password });
  }

  const canSubmit = email.trim() !== "" && password.length > 0;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" disabled={!canSubmit}>Log in</button>
    </form>
  );
}
```
Use a real `<form>` with `onSubmit` (not a click handler on the button) so Enter-to-submit
works, and call `e.preventDefault()` — forgetting it causes the mysterious page reload
every beginner hits. `canSubmit` is derived state (problem 16), not another `useState`.

### 26. Inline validation with error messages

**Problem:** Extend the signup form: email must contain `@`, password ≥ 8 chars. Show
field-level errors only after the user has touched a field, and block submit while
invalid.

**Solution:**
```jsx
function SignupForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({});

  const errors = {
    email: !form.email.includes("@") ? "Enter a valid email" : null,
    password: form.password.length < 8 ? "At least 8 characters" : null,
  };
  const isValid = !errors.email && !errors.password;

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleBlur = (e) =>
    setTouched((t) => ({ ...t, [e.target.name]: true }));

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ email: true, password: true }); // show all errors on submit attempt
    if (isValid) console.log("Submitting", form);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <input name="email" value={form.email} onChange={handleChange} onBlur={handleBlur} />
      {touched.email && errors.email && <p style={{ color: "crimson" }}>{errors.email}</p>}

      <input
        name="password" type="password"
        value={form.password} onChange={handleChange} onBlur={handleBlur}
      />
      {touched.password && errors.password && (
        <p style={{ color: "crimson" }}>{errors.password}</p>
      )}

      <button type="submit" disabled={!isValid}>Sign up</button>
    </form>
  );
}
```
The `touched` map is the key UX idea: errors are *computed* immediately (derived state
again) but *shown* only after blur or a submit attempt, so users aren't yelled at while
still typing. This errors-object shape scales to any form and mirrors problem 45 in the
TypeScript file.

### 27. Todo list: Create and Read

**Problem:** Build the classic: an input + Add button, todos rendered in a list. Empty
input is rejected; the input clears after adding.

**Solution:**
```jsx
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [draft, setDraft] = useState("");

  function addTodo(e) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;

    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, done: false }, // stable unique key
    ]);
    setDraft("");
  }

  return (
    <div>
      <form onSubmit={addTodo}>
        <input value={draft} onChange={(e) => setDraft(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((t) => <li key={t.id}>{t.text}</li>)}
      </ul>
      {todos.length === 0 && <p>No todos yet — add one!</p>}
    </div>
  );
}
```
Everything so far in one component: controlled input, form submit, immutable add,
list + keys, and an empty state (never show users a blank void). `crypto.randomUUID()`
gives client-side ids; once a server is involved, the server's id takes over.

### 28. Todo list: Update and Delete

**Problem:** Add a checkbox to toggle each todo's `done` (with strikethrough) and a
Delete button.

**Solution:**
```jsx
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li>
      <label style={{ textDecoration: todo.done ? "line-through" : "none" }}>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
        />
        {todo.text}
      </label>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}

// inside TodoApp:
const toggleTodo = (id) =>
  setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

const deleteTodo = (id) =>
  setTodos((prev) => prev.filter((t) => t.id !== id));

// render: <TodoItem key={t.id} todo={t} onToggle={toggleTodo} onDelete={deleteTodo} />
```
Full CRUD on local state. Note the division of labor: the child renders one item and
*reports intent* (`onToggle(id)`); the parent owns the array and performs the update.
Children never modify data they don't own — that discipline is what keeps larger apps
comprehensible.

### 29. Edit-in-place

**Problem:** Double-clicking a todo turns it into a text input; Enter saves, Escape
cancels. Only one todo is editable at a time.

**Solution:**
```jsx
function EditableTodo({ todo, isEditing, onStartEdit, onSave, onCancel }) {
  const [draft, setDraft] = useState(todo.text);

  if (!isEditing) {
    return <li onDoubleClick={() => onStartEdit(todo.id)}>{todo.text}</li>;
  }

  return (
    <li>
      <input
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && draft.trim()) onSave(todo.id, draft.trim());
          if (e.key === "Escape") { setDraft(todo.text); onCancel(); }
        }}
        onBlur={onCancel}
      />
    </li>
  );
}

// parent keeps track of WHICH todo is being edited:
const [editingId, setEditingId] = useState(null);

const saveTodo = (id, text) => {
  setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));
  setEditingId(null);
};

// render:
// <EditableTodo key={t.id} todo={t} isEditing={editingId === t.id}
//   onStartEdit={setEditingId} onSave={saveTodo} onCancel={() => setEditingId(null)} />
```
The parent stores only `editingId` — *which* row is editing — while each row keeps its
own `draft` text locally until saved. Splitting "app state" (the list) from "UI state"
(edit mode, drafts) is a judgment you'll make constantly; drafts don't belong in the
shared list until committed.

### 30. Search filter

**Problem:** Add a search box above a contact list that filters by name,
case-insensitive, showing "No matches" when empty. Should the filtered list be state?

**Solution:**
```jsx
function ContactList({ contacts }) {
  const [query, setQuery] = useState("");

  // NOT state — derived on every render from the two sources of truth
  const visible = contacts.filter((c) =>
    c.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search contacts…"
      />
      {visible.length === 0 ? (
        <p>No matches for “{query}”</p>
      ) : (
        <ul>{visible.map((c) => <li key={c.id}>{c.name}</li>)}</ul>
      )}
    </div>
  );
}
```
No: storing `filteredContacts` in state would duplicate data and desynchronize the
moment contacts change. State is the *query*; the filtered list is a plain computed
constant (problem 16 again — it keeps coming back because it's the most common React
design mistake).

### 31. Sorting a table

**Problem:** Render users in a table; clicking a column header sorts by that column,
clicking again reverses. Show ▲/▼ on the active column.

**Solution:**
```jsx
function UserTable({ users }) {
  const [sort, setSort] = useState({ key: "name", dir: 1 }); // dir: 1 asc, -1 desc

  function clickHeader(key) {
    setSort((s) => (s.key === key ? { key, dir: -s.dir } : { key, dir: 1 }));
  }

  const sorted = [...users].sort((a, b) => {
    const [x, y] = [a[sort.key], b[sort.key]];
    const cmp = typeof x === "number" ? x - y : String(x).localeCompare(String(y));
    return cmp * sort.dir;
  });

  const arrow = (key) => (sort.key === key ? (sort.dir === 1 ? " ▲" : " ▼") : "");

  return (
    <table>
      <thead>
        <tr>
          {["name", "email", "age"].map((key) => (
            <th key={key} onClick={() => clickHeader(key)} style={{ cursor: "pointer" }}>
              {key}{arrow(key)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sorted.map((u) => (
          <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.age}</td></tr>
        ))}
      </tbody>
    </table>
  );
}
```
State is the sort *description* (`{ key, dir }`), the sorted array is derived, and
`[...users]` copies before sorting because `sort` mutates (JavaScript file, problem 13).
Toggling direction with `-s.dir` on a repeat click is a neat, common trick.

### 32. Pagination controls

**Problem:** Show 5 items per page with Prev/Next buttons and "Page X of Y". Prev/Next
must disable at the edges, and changing the underlying list must never leave you stranded
on a page that no longer exists.

**Solution:**
```jsx
function PagedList({ items, pageSize = 5 }) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(page, totalPages); // clamp if items shrank
  const start = (safePage - 1) * pageSize;
  const visible = items.slice(start, start + pageSize);

  return (
    <div>
      <ul>{visible.map((item) => <li key={item.id}>{item.name}</li>)}</ul>
      <button disabled={safePage === 1} onClick={() => setPage(safePage - 1)}>
        ← Prev
      </button>
      <span> Page {safePage} of {totalPages} </span>
      <button disabled={safePage === totalPages} onClick={() => setPage(safePage + 1)}>
        Next →
      </button>
    </div>
  );
}
```
Same pagination math as the JavaScript file (problem 41), now driving UI. Only `page` is
state; everything else derives. The `safePage` clamp handles the real-world case where a
delete removes the last item of the last page — without it, the user stares at an empty
page.

---

## Hooks & Architecture

### 33. Custom hook: `useLocalStorage`

**Problem:** Write `useLocalStorage(key, initialValue)` — a drop-in `useState` that
persists across page reloads.

**Solution:**
```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    // lazy initializer: read storage once, not on every render
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue; // corrupt data or blocked storage
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue]; // same contract as useState
}

// usage — persistence in one line:
function Settings() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme}
    </button>
  );
}
```
A custom hook is just a function that calls other hooks — the name must start with `use`.
This one packages state + a persistence effect + error handling behind the familiar
`[value, setValue]` tuple. Extracting hooks is React's main reuse mechanism for *logic*
(components are the reuse mechanism for *UI*).

### 34. Custom hook: `useFetch`

**Problem:** Extract the fetch-on-mount pattern (problem 19) into `useFetch(url)`
returning `{ data, loading, error }`, re-fetching when the url changes.

**Solution:**
```jsx
function useFetch(url) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, loading: true, error: null });

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err) => {
        if (err.name !== "AbortError") {
          setState({ data: null, loading: false, error: err.message });
        }
      });

    return () => controller.abort();
  }, [url]);

  return state;
}

// every data screen shrinks to:
function Users() {
  const { data: users, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );
  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;
  return <ul>{users.map((u) => <li key={u.id}>{u.name}</li>)}</ul>;
}
```
All the hard-won details — ok-check, abort on cleanup, the three-state shape — written
once, reused everywhere. (Production apps typically adopt TanStack Query, which is this
hook plus caching, retries, and invalidation — the concepts transfer directly.)

### 35. Custom hook: `useDebounce`

**Problem:** Write `useDebounce(value, delay)` and combine it with `useFetch` for a
search box that only queries the API after typing pauses.

**Solution:**
```jsx
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id); // each keystroke cancels the previous timer
  }, [value, delay]);

  return debounced;
}

function ProductSearch() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);

  const { data, loading } = useFetch(
    `/api/products?search=${encodeURIComponent(debouncedQuery)}`
  );

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      {loading ? <p>Searching…</p> : <ul>{data?.map((p) => <li key={p.id}>{p.name}</li>)}</ul>}
    </div>
  );
}
```
The debounce logic from the JavaScript file (problem 22), rebuilt the React way:
timer-in-effect with cleanup. The input stays instantly responsive (bound to `query`)
while the network follows lazily (bound to `debouncedQuery`) — two values on purpose.

### 36. `useReducer` for complex state

**Problem:** Rewrite the todo app with `useReducer`: actions `added`, `toggled`,
`deleted`, `cleared_completed`.

**Solution:**
```jsx
import { useReducer } from "react";

function todosReducer(todos, action) {
  switch (action.type) {
    case "added":
      return [...todos, { id: crypto.randomUUID(), text: action.text, done: false }];
    case "toggled":
      return todos.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t));
    case "deleted":
      return todos.filter((t) => t.id !== action.id);
    case "cleared_completed":
      return todos.filter((t) => !t.done);
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  return (
    <div>
      {/* dispatch describes WHAT happened; the reducer decides HOW state changes */}
      <button onClick={() => dispatch({ type: "added", text: "New todo" })}>Add</button>
      <button onClick={() => dispatch({ type: "cleared_completed" })}>Clear done</button>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <span onClick={() => dispatch({ type: "toggled", id: t.id })}>{t.text}</span>
            <button onClick={() => dispatch({ type: "deleted", id: t.id })}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```
When several updates touch the same state, a reducer centralizes them: components emit
*events*, one pure function holds all the transition logic (testable without React!).
This is the same discriminated-action reducer shape you typed in the TypeScript file
(problem 48, there for a project list) — and the mental
model behind Redux.

### 37. Context + reducer: app-level state

**Problem:** Combine problems 23 and 36 so any component can read todos and dispatch
actions, via a `TodosProvider` and a `useTodos()` hook that throws if used outside it.

**Solution:**
```jsx
const TodosContext = createContext(null);

export function TodosProvider({ children }) {
  const [todos, dispatch] = useReducer(todosReducer, []);
  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
}

export function useTodos() {
  const ctx = useContext(TodosContext);
  if (!ctx) throw new Error("useTodos must be used inside <TodosProvider>");
  return ctx;
}

// deep in the tree, no prop drilling:
function AddButton() {
  const { dispatch } = useTodos();
  return <button onClick={() => dispatch({ type: "added", text: "hi" })}>Add</button>;
}

function Stats() {
  const { todos } = useTodos();
  return <p>{todos.filter((t) => !t.done).length} remaining</p>;
}

// App: <TodosProvider><AddButton /><Stats /></TodosProvider>
```
Provider + reducer + guard hook is the standard "small global store" recipe — enough for
most apps before reaching for Redux/Zustand. The throwing hook turns a silent
`undefined` bug (forgot the Provider) into an immediate, named error.

### 38. `useMemo` and expensive computations

**Problem:** A dashboard filters 10,000 rows on every render, even when only an unrelated
counter changes. Fix it — and say when *not* to memoize.

**Solution:**
```jsx
import { useMemo } from "react";

function Dashboard({ rows }) {
  const [minScore, setMinScore] = useState(50);
  const [unrelatedCounter, setUnrelatedCounter] = useState(0);

  const highScorers = useMemo(() => {
    console.log("filtering…"); // now logs only when rows or minScore change
    return rows
      .filter((r) => r.score >= minScore)
      .sort((a, b) => b.score - a.score);
  }, [rows, minScore]); // recompute only when these change

  return (
    <div>
      <input type="number" value={minScore}
             onChange={(e) => setMinScore(Number(e.target.value))} />
      <button onClick={() => setUnrelatedCounter((c) => c + 1)}>
        Clicks: {unrelatedCounter} (no refilter!)
      </button>
      <p>{highScorers.length} high scorers</p>
    </div>
  );
}
```
`useMemo(fn, deps)` caches a computed value between renders until a dependency changes.
Use it for genuinely expensive work (big filters/sorts, chart data) — not for every
little expression: the cache itself has a cost, and premature memoization clutters code.
Measure first (React DevTools Profiler), memoize second.

### 39. `React.memo` and `useCallback`

**Problem:** Every keystroke in a search box re-renders all 500 `Row` components even
though their props haven't changed. Fix with `React.memo` — and explain why it doesn't
work without `useCallback`.

**Solution:**
```jsx
import { memo, useCallback } from "react";

const Row = memo(function Row({ item, onDelete }) {
  console.log("render row", item.id); // now quiet during typing
  return (
    <li>
      {item.name} <button onClick={() => onDelete(item.id)}>×</button>
    </li>
  );
});

function BigList({ items }) {
  const [query, setQuery] = useState("");
  const [list, setList] = useState(items);

  // Without useCallback, a NEW onDelete function is created every render,
  // so memo sees "props changed" and re-renders every row anyway.
  const handleDelete = useCallback((id) => {
    setList((prev) => prev.filter((i) => i.id !== id)); // updater form: no stale list
  }, []);

  const visible = list.filter((i) =>
    i.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {visible.map((item) => (
          <Row key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
}
```
`memo` skips re-rendering when props are shallow-equal; `useCallback` keeps a function
prop's *identity* stable so that check can succeed. They're a pair. As with `useMemo`:
apply to measured hot spots (long lists are the classic one), not everywhere by reflex.

### 40. Error boundaries

**Problem:** One crashing widget currently blanks the whole app. Contain it so the rest
of the page survives and shows a fallback.

**Solution:**
```jsx
import { Component } from "react";

class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error }; // switch to fallback UI
  }

  componentDidCatch(error, info) {
    console.error("Boundary caught:", error, info); // real apps: report to Sentry etc.
  }

  render() {
    if (this.state.error) {
      return this.props.fallback ?? <p role="alert">This section failed to load.</p>;
    }
    return this.props.children;
  }
}

// usage — crash stays inside the box:
function App() {
  return (
    <div>
      <Header />
      <ErrorBoundary fallback={<p>Chart unavailable.</p>}>
        <BuggyChart />
      </ErrorBoundary>
      <MainContent /> {/* still renders even if the chart throws */}
    </div>
  );
}
```
Error boundaries are the one place class components are still required (a hook version
doesn't exist; libraries like `react-error-boundary` wrap this same pattern). They catch
*render* errors of their children — not event handlers or async code, which you handle
with try/catch (problem 19 here; JavaScript file, problems 26–27). Wrap independent page sections so one failure doesn't
take down the app.

---

## Full CRUD Against an API

The final ten problems build one app: a **User Manager** backed by
`https://jsonplaceholder.typicode.com/users` (a free fake API — writes return success
without persisting, which is perfect for practice).

### 41. The api module (no HTTP in components)

**Problem:** Create `api/users.js` exporting `listUsers`, `getUser`, `createUser`,
`updateUser`, `deleteUser` — components must never call `fetch` directly.

**Solution:**
```js
// api/users.js
const BASE = "https://jsonplaceholder.typicode.com/users";

async function request(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: options.body ? { "Content-Type": "application/json" } : undefined,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.status === 204 ? null : res.json();
}

export const listUsers = () => request(BASE);
export const getUser = (id) => request(`${BASE}/${id}`);
export const createUser = (data) => request(BASE, { method: "POST", body: data });
export const updateUser = (id, data) => request(`${BASE}/${id}`, { method: "PATCH", body: data });
export const deleteUser = (id) => request(`${BASE}/${id}`, { method: "DELETE" });
```
This is the JavaScript file's api client (problem 48) put to work. The layering rule for
the rest of the capstone: **components → api module → network**. When the backend
changes a route, you edit one file, not thirty components.

### 42. Read: the user list screen

**Problem:** Build `UserListPage`: loads users on mount, shows loading/error/empty/data
states, renders rows with Edit and Delete buttons (wired in later problems).

**Solution:**
```jsx
import { useEffect, useState } from "react";
import { listUsers } from "./api/users";

function UserListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    listUsers()
      .then((data) => { if (!cancelled) setUsers(data); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  if (loading) return <p>Loading users…</p>;
  if (error) return <p role="alert">Couldn't load users: {error}</p>;
  if (users.length === 0) return <p>No users yet.</p>;

  return (
    <table>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>
              <button>Edit</button> <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```
Four render states, in priority order: loading → error → empty → data. Interviewers and
code reviewers look for exactly this; missing the empty state is the most common gap.

### 43. Create: the add-user form

**Problem:** Add an `AddUserForm` that validates (name required, email contains `@`),
POSTs via the api module, disables the submit button while saving, and hands the created
user up to the list.

**Solution:**
```jsx
import { useState } from "react";
import { createUser } from "./api/users";

function AddUserForm({ onCreated }) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const isValid = form.name.trim() && form.email.includes("@");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isValid || saving) return;

    setSaving(true);
    setError(null);
    try {
      const created = await createUser(form);
      onCreated(created);                    // parent adds it to the list
      setForm({ name: "", email: "" });      // reset on success only
    } catch (err) {
      setError("Could not save — please try again.");
    } finally {
      setSaving(false);                      // always re-enable the button
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
      />
      <button type="submit" disabled={!isValid || saving}>
        {saving ? "Saving…" : "Add user"}
      </button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}

// in UserListPage:
// <AddUserForm onCreated={(u) => setUsers((prev) => [...prev, u])} />
```
The `saving` flag does triple duty: disables the button (prevents double-submits —
a real production bug), changes the label for feedback, and gates the handler. Reset the
form only on success; on failure the user's input survives for a retry.

### 44. Delete with confirmation

**Problem:** Wire the Delete button: confirm first, remove the row on success, restore
it with an error message on failure.

**Solution:**
```jsx
import { deleteUser } from "./api/users";

// inside UserListPage:
const [deletingId, setDeletingId] = useState(null);

async function handleDelete(user) {
  if (!window.confirm(`Delete ${user.name}? This cannot be undone.`)) return;

  const previous = users;
  setDeletingId(user.id);
  setUsers((prev) => prev.filter((u) => u.id !== user.id)); // optimistic remove

  try {
    await deleteUser(user.id);
  } catch (err) {
    setUsers(previous);                       // rollback — the old array still exists
    setError(`Could not delete ${user.name}.`);
  } finally {
    setDeletingId(null);
  }
}

// row button:
// <button onClick={() => handleDelete(u)} disabled={deletingId === u.id}>
//   {deletingId === u.id ? "Deleting…" : "Delete"}
// </button>
```
Optimistic delete (JavaScript file, problem 49): the row vanishes instantly, and because
we never mutated the old array, rollback is just `setUsers(previous)`. `window.confirm`
is the honest starter solution; swap in a modal component later without touching the
data logic.

### 45. Update: the edit form, reusing the form component

**Problem:** Extract one `UserForm` used by *both* Add (empty initial values) and Edit
(pre-filled), with the parent deciding what "submit" means.

**Solution:**
```jsx
function UserForm({ initialValues, onSubmit, submitLabel = "Save" }) {
  const [form, setForm] = useState(initialValues);
  const [saving, setSaving] = useState(false);

  const isValid = form.name.trim() && form.email.includes("@");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isValid || saving) return;
    setSaving(true);
    try {
      await onSubmit(form);   // parent supplies create OR update behavior
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={form.name}
             onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
      <input value={form.email}
             onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
      <button disabled={!isValid || saving}>{saving ? "Saving…" : submitLabel}</button>
    </form>
  );
}

// Add:
<UserForm
  initialValues={{ name: "", email: "" }}
  submitLabel="Add user"
  onSubmit={async (data) => setUsers((prev) => [...prev, await createUser(data)])}
/>

// Edit (editingUser comes from clicking a row's Edit button):
<UserForm
  key={editingUser.id}  // remount when switching users, so state re-initializes
  initialValues={{ name: editingUser.name, email: editingUser.email }}
  onSubmit={async (data) => {
    const updated = await updateUser(editingUser.id, data);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? { ...u, ...updated } : u)));
    setEditingUser(null);
  }}
/>
```
One form, two behaviors, injected via the `onSubmit` prop. The subtle gem is
`key={editingUser.id}`: state initializers run only on mount, so changing the key forces
a fresh mount with the new user's values — the idiomatic fix for "the form shows the
previous user's data."

### 46. Client-side routing between list and detail

**Problem:** Without a router library, show either the list or a detail view for a
selected user, with a working "Back" button. Then name what a real router adds.

**Solution:**
```jsx
function App() {
  // "route" state: which screen + which record
  const [view, setView] = useState({ name: "list" });

  if (view.name === "detail") {
    return (
      <UserDetailPage
        userId={view.userId}
        onBack={() => setView({ name: "list" })}
      />
    );
  }
  return <UserListPage onSelect={(id) => setView({ name: "detail", userId: id })} />;
}

function UserDetailPage({ userId, onBack }) {
  const { data: user, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  if (loading) return <p>Loading…</p>;
  if (error) return <p role="alert">{error}</p>;
  return (
    <div>
      <button onClick={onBack}>← Back</button>
      <h1>{user.name}</h1>
      <p>{user.email} · {user.phone}</p>
      <p>{user.company?.name}</p>
    </div>
  );
}
```
Navigation is just state — a discriminated union of views (TypeScript file, problem 16,
would type it perfectly). What React Router adds on top: URL sync (shareable links,
refresh survives), browser back/forward, and nested layouts. Learn it next
(`<Route path="/users/:id" element={<UserDetailPage />} />` maps 1:1 onto this).

### 47. Extracting the data layer into a hook

**Problem:** `UserListPage` now juggles fetching, creating, deleting, editing. Extract a
`useUsers()` hook exposing `{ users, loading, error, add, update, remove }`.

**Solution:**
```jsx
import * as api from "./api/users";

function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    api.listUsers()
      .then((data) => { if (!cancelled) setUsers(data); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  async function add(data) {
    const created = await api.createUser(data);
    setUsers((prev) => [...prev, created]);
    return created;
  }

  async function update(id, data) {
    const updated = await api.updateUser(id, data);
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updated } : u)));
    return updated;
  }

  async function remove(id) {
    const previous = users;
    setUsers((prev) => prev.filter((u) => u.id !== id)); // optimistic
    try {
      await api.deleteUser(id);
    } catch (err) {
      setUsers(previous); // rollback
      throw err;          // let the component show the message
    }
  }

  return { users, loading, error, add, update, remove };
}

// The page component becomes almost pure rendering:
function UserListPage() {
  const { users, loading, error, add, remove } = useUsers();
  /* ...render with the four states, pass add/remove down... */
}
```
The complete architecture: **components render, hooks orchestrate state, the api module
talks HTTP.** Each layer is testable alone, and `useUsers` can later be swapped for
TanStack Query or a context provider without touching the page markup.

### 48. Global toast notifications

**Problem:** Any component should be able to fire a success/error toast (e.g. "User
deleted") that auto-dismisses after 3 seconds. Build a `ToastProvider` + `useToast()`.

**Solution:**
```jsx
const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, kind = "success") => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, kind }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id)); // auto-dismiss
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div style={{ position: "fixed", bottom: 16, right: 16 }}>
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            style={{
              padding: "8px 16px", marginTop: 8, borderRadius: 6, color: "white",
              background: t.kind === "error" ? "crimson" : "seagreen",
            }}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
};

// anywhere:
// const toast = useToast();
// toast("User deleted");  toast("Save failed", "error");
```
Context (23), state arrays (13), guard hooks (37), and timers in one practical package.
Every CRUD app needs feedback for background operations; this 40-line provider is the
pattern behind every toast library you'll meet.

### 49. Loading UX: skeletons and disabled states

**Problem:** Polish the list screen: skeleton rows while loading (instead of a spinner),
and dim + disable the whole table during a refresh so stale data is visibly stale.

**Solution:**
```jsx
function SkeletonRow() {
  return (
    <tr aria-hidden="true">
      {[120, 180, 80].map((w, i) => (
        <td key={i}>
          <div style={{
            width: w, height: 14, borderRadius: 4,
            background: "#e2e2e2", animation: "pulse 1.2s infinite",
          }} />
        </td>
      ))}
    </tr>
  );
}
/* CSS: @keyframes pulse { 0%,100% { opacity: 1 } 50% { opacity: .45 } } */

function UserTable({ users, loading, refreshing }) {
  if (loading) {
    return (
      <table><tbody>
        {Array.from({ length: 5 }, (_, i) => <SkeletonRow key={i} />)}
      </tbody></table>
    );
  }
  return (
    <div style={{ opacity: refreshing ? 0.5 : 1, pointerEvents: refreshing ? "none" : "auto" }}>
      <table><tbody>
        {users.map((u) => (
          <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>…</td></tr>
        ))}
      </tbody></table>
    </div>
  );
}
```
Distinguish **initial load** (nothing to show → skeletons that match the final layout,
reducing layout shift) from **refresh** (stale data is better than a blank → keep it
visible but visibly inert). This distinction — `loading` vs `refreshing` — is a small
flag in code and a large difference in perceived quality.

### 50. Capstone: the assembled app

**Problem:** Assemble problems 41–49 into the final `App`, then trace the data flow of
one user action from click to pixel.

**Solution:**
```jsx
export default function App() {
  return (
    <ErrorBoundary fallback={<p>The app hit an unexpected error.</p>}>
      <ToastProvider>
        <UserManager />
      </ToastProvider>
    </ErrorBoundary>
  );
}

function UserManager() {
  const { users, loading, error, add, update, remove } = useUsers(); // hook: problem 47
  const [view, setView] = useState({ name: "list" });                // routing: problem 46
  const [editingUser, setEditingUser] = useState(null);
  const toast = useToast();                                          // problem 48

  async function handleDelete(user) {
    if (!window.confirm(`Delete ${user.name}?`)) return;
    try {
      await remove(user.id);
      toast(`Deleted ${user.name}`);
    } catch {
      toast("Delete failed — restored the user.", "error");
    }
  }

  if (view.name === "detail") {
    return <UserDetailPage userId={view.userId} onBack={() => setView({ name: "list" })} />;
  }

  return (
    <main>
      <h1>User Manager</h1>
      <UserForm
        initialValues={{ name: "", email: "" }}
        submitLabel="Add user"
        onSubmit={async (data) => { await add(data); toast("User created"); }}
      />
      {editingUser && (
        <UserForm
          key={editingUser.id}
          initialValues={editingUser}
          onSubmit={async (data) => {
            await update(editingUser.id, data);
            setEditingUser(null);
            toast("User updated");
          }}
        />
      )}
      <AsyncBoundary loading={loading} error={error}>   {/* problem 24 */}
        <UserTable
          users={users}
          onSelect={(id) => setView({ name: "detail", userId: id })}
          onEdit={setEditingUser}
          onDelete={handleDelete}
        />
      </AsyncBoundary>
    </main>
  );
}
```
Trace "Delete" end to end: button `onClick` → `handleDelete` → `remove` in `useUsers`
(optimistic filter, `api.deleteUser`, rollback on failure) → state change → React
re-renders the table → toast confirms. Every layer does one job: **api module** (HTTP),
**hook** (state + orchestration), **components** (rendering), **providers** (cross-
cutting UI). If you can build this from a blank Vite project without peeking, you can
build the frontend of a production CRUD app.
