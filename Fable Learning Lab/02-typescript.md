# TypeScript — 50 Problems for the CRUD Web Developer

Ordered easiest-first. Sections: Type Basics (1–8), Object Shapes & Interfaces (9–16),
Narrowing & Unions (17–24), Generics & Utility Types (25–32), Classes & Advanced Types
(33–40), Typing a CRUD App (41–50).

Run these in the [TypeScript Playground](https://www.typescriptlang.org/play) or a local
project (`npx tsc --init`, then `npx tsc file.ts`). Assume `strict: true` — always.

---

## Type Basics

### 1. Primitive annotations and inference

**Problem:** Declare an annotated `string`, `number`, and `boolean`. Then show a case
where you should *not* write the annotation because inference already knows.

**Solution:**
```ts
let username: string = "ada";
let attempts: number = 3;
let isActive: boolean = true;

// Inference: TS already knows this is a string — the annotation is just noise.
let city = "Boston";        // type: string (inferred)
// city = 42;               // Error: Type 'number' is not assignable to type 'string'

// Annotate when inference CAN'T know: empty starts and function parameters.
let scores: number[] = [];  // without the annotation this would be never[]
function greet(name: string) { return `Hi ${name}`; } // params always need types
```
Rule of thumb: annotate function parameters, return types on public functions, and empty
initializations. Let inference handle obvious local variables.

### 2. Arrays and tuples

**Problem:** Type (a) an array of prices, (b) an array of names, (c) a tuple representing
`[latitude, longitude]`, and show what a tuple catches that an array doesn't.

**Solution:**
```ts
const prices: number[] = [19.99, 5.5];
const names: string[] = ["Ada", "Grace"];   // Array<string> is the same thing

// A tuple is a fixed-length array where each POSITION has a type
type Coordinate = [lat: number, lng: number]; // labels are optional but readable
const boston: Coordinate = [42.36, -71.06];

// const bad: Coordinate = [42.36];          // Error: needs exactly 2 elements
// const bad2: Coordinate = ["42", -71];     // Error: position 0 must be number

// You already use tuples: React's useState returns one.
// const [count, setCount] = useState(0)  ->  [number, Dispatch<...>]
```
Use arrays for "many of the same thing," tuples for "these exact positions mean these
exact things."

### 3. Typing functions

**Problem:** Fully type `applyDiscount(price, percent)` returning a number, an arrow
function `formatPrice`, and an optional parameter version of `greet(name, title?)`.

**Solution:**
```ts
function applyDiscount(price: number, percent: number): number {
  return price * (1 - percent / 100);
}

const formatPrice = (amount: number): string => `$${amount.toFixed(2)}`;

// `title?: string` means string | undefined — you must handle the undefined case
function greet(name: string, title?: string): string {
  return title ? `Hello, ${title} ${name}` : `Hello, ${name}`;
}

console.log(formatPrice(applyDiscount(100, 20))); // "$80.00"
console.log(greet("Lovelace", "Countess"));       // "Hello, Countess Lovelace"
console.log(greet("Ada"));                        // "Hello, Ada"
```
Return-type annotations are optional (TS infers them) but writing them on exported
functions turns the *implementation* into a checked contract: change what you return and
the function errors instead of silently breaking every caller.

### 4. Union types

**Problem:** A task status can be `"todo"`, `"in-progress"`, or `"done"`. Type it so that
`status = "finished"` is a compile error, and write `isComplete(status)`.

**Solution:**
```ts
type TaskStatus = "todo" | "in-progress" | "done";

let status: TaskStatus = "todo";
status = "done";
// status = "finished"; // Error: '"finished"' is not assignable to type 'TaskStatus'

function isComplete(status: TaskStatus): boolean {
  return status === "done";
}
```
A union of string literals beats both plain `string` (no protection) and enums (heavier
syntax) for most app code. The compiler now catches typos in statuses, roles, and modes —
bugs that in plain JS only surface at runtime, if ever.

### 5. Type aliases

**Problem:** Create aliases: `UserId` (number), `Money` (number), and `ApiCallback`
(function taking a string error-or-null and returning void). Use each.

**Solution:**
```ts
type UserId = number;
type Money = number;
type ApiCallback = (error: string | null) => void;

function chargeUser(id: UserId, amount: Money, done: ApiCallback): void {
  if (amount <= 0) return done("Amount must be positive");
  console.log(`Charged user ${id}: $${amount}`);
  done(null);
}

chargeUser(42, 19.99, (err) => {
  if (err) console.error(err);
});
```
`type` names any type — primitives, functions, unions, objects. Aliases like `UserId`
document intent even when they don't add checking; function-type aliases save you from
retyping signatures everywhere callbacks appear.

### 6. `any` vs `unknown`

**Problem:** Explain why `any` is dangerous, and rewrite a `handleResponse(data: any)`
function using `unknown` safely.

**Solution:**
```ts
// `any` turns OFF checking — this compiles and crashes at runtime:
function bad(data: any) {
  console.log(data.user.name.toUpperCase()); // no error, even if data is null
}

// `unknown` means "could be anything, so PROVE what it is before using it":
function handleResponse(data: unknown): string {
  // console.log(data.name);        // Error: 'data' is of type 'unknown'

  if (
    typeof data === "object" && data !== null &&
    "name" in data && typeof (data as { name: unknown }).name === "string"
  ) {
    return (data as { name: string }).name.toUpperCase();
  }
  return "UNKNOWN";
}
```
`unknown` is the type-safe counterpart of `any`: you can assign anything *to* it, but you
can't use it until you've narrowed it. Use it for API responses, `JSON.parse` results,
and caught errors. Treat `any` as a code smell.

### 7. Typing objects inline

**Problem:** Type a function `describeProduct(product)` where product is
`{ name: string; price: number; tags: string[] }`, then explain why you'd promote that
inline type to a named one.

**Solution:**
```ts
function describeProduct(product: { name: string; price: number; tags: string[] }): string {
  return `${product.name} ($${product.price}) [${product.tags.join(", ")}]`;
}

console.log(describeProduct({ name: "Mouse", price: 19.99, tags: ["usb", "wireless"] }));

// The moment two places need the same shape, name it:
type Product = { name: string; price: number; tags: string[] };
function describeProduct2(product: Product): string { /* same body */ return ""; }
```
Inline object types are fine for one-off shapes. But duplicated inline types drift apart
as the app grows — naming the type (`type Product` or `interface Product`) creates a
single source of truth that every function, component, and API call shares.

### 8. `null`, `undefined`, and strict null checks

**Problem:** With `strict` on, `find` returns `T | undefined`. Show the compile error in
naive code and three ways to handle it.

**Solution:**
```ts
type User = { id: number; name: string };
const users: User[] = [{ id: 1, name: "Ada" }];

const found = users.find((u) => u.id === 2); // type: User | undefined
// console.log(found.name); // Error: 'found' is possibly 'undefined'

// 1. Narrow with a check (preferred — handles the miss explicitly)
if (found) console.log(found.name);

// 2. Optional chaining + fallback, when a default is acceptable
console.log(found?.name ?? "Guest");

// 3. Non-null assertion (!) — "trust me, it exists". Compiles, but crashes if
//    you're wrong. Use only when you can PROVE it, and prefer not to.
// console.log(found!.name);
```
Strict null checking is TypeScript's biggest single win: the "cannot read properties of
undefined" crash — the most common JS runtime error — becomes a compile-time error you
fix before shipping.

---

## Object Shapes & Interfaces

### 9. Interfaces

**Problem:** Define a `Task` interface (`id`, `title`, `done`, optional `dueDate`), create
a valid task, and show the errors for a missing field and an extra field.

**Solution:**
```ts
interface Task {
  id: number;
  title: string;
  done: boolean;
  dueDate?: string; // optional — may be absent
}

const task: Task = { id: 1, title: "Learn interfaces", done: false };

// const missing: Task = { id: 2, title: "Oops" };
// Error: Property 'done' is missing

// const extra: Task = { id: 3, title: "Hm", done: false, color: "red" };
// Error: Object literal may only specify known properties
```
An interface describes an object's required shape. `interface` and `type` are nearly
interchangeable for objects — pick one style per codebase (many teams: `interface` for
object shapes, `type` for unions and aliases) and stay consistent.

### 10. `readonly` and immutability at the type level

**Problem:** Make `Task.id` impossible to reassign after creation, and type a function
parameter so the function cannot mutate the array you pass it.

**Solution:**
```ts
interface Task {
  readonly id: number; // set once at creation, never reassigned
  title: string;
  done: boolean;
}

const task: Task = { id: 1, title: "A", done: false };
task.title = "B";   // fine
// task.id = 99;    // Error: Cannot assign to 'id' because it is a read-only property

// readonly arrays: the function promises not to mutate its input
function totalTitles(tasks: readonly Task[]): number {
  // tasks.push(...);  // Error: 'push' does not exist on 'readonly Task[]'
  return tasks.reduce((n, t) => n + t.title.length, 0);
}
```
`readonly` enforces at compile time the no-mutation discipline you practiced in the
JavaScript file (problem 18 there). Typing parameters as `readonly T[]` documents and
*enforces* that a function is safe to call with shared state.

### 11. Extending interfaces

**Problem:** Model `BaseEntity` (`id`, `createdAt`), then `User` and `Product` extending
it, and write one `logEntity` function that accepts anything with the base shape.

**Solution:**
```ts
interface BaseEntity {
  id: number;
  createdAt: string;
}

interface User extends BaseEntity {
  email: string;
  role: "admin" | "member";
}

interface Product extends BaseEntity {
  name: string;
  price: number;
}

function logEntity(entity: BaseEntity): void {
  console.log(`#${entity.id} created ${entity.createdAt}`);
}

const user: User = { id: 1, createdAt: "2026-07-02", email: "a@b.com", role: "member" };
const product: Product = { id: 2, createdAt: "2026-07-02", name: "Mouse", price: 20 };
logEntity(user);    // works — User has everything BaseEntity requires
logEntity(product); // works too (structural typing: shape is what matters)
```
Every table in a CRUD app tends to share `id`/`createdAt`/`updatedAt` — a base interface
captures that once. TypeScript is *structural*: any object with the right shape is
accepted, no explicit "implements" required.

### 12. Index signatures and `Record`

**Problem:** Type (a) an object mapping any string key to a number (word counts), and
(b) a map from a *fixed* set of statuses to a label, so a missing status is an error.

**Solution:**
```ts
// (a) index signature: unknown keys, uniform value type
interface WordCounts {
  [word: string]: number;
}
const counts: WordCounts = { hello: 2, world: 1 };
counts["typescript"] = 5;

// (b) Record with a literal-union key: ALL keys are required
type Status = "todo" | "in-progress" | "done";
const statusLabels: Record<Status, string> = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
  // forget one -> Error: Property 'done' is missing
};

function labelFor(status: Status): string {
  return statusLabels[status]; // no undefined possible — the Record is exhaustive
}
```
`Record<UnionType, V>` is the workhorse for lookup tables: add a new status to the union
and the compiler points at every table that needs a new entry. Index signatures are for
genuinely open-ended keys (caches, dictionaries).

### 13. Typing nested API data

**Problem:** Type this API response and write `getCityNames(response)`:

```json
{
  "meta": { "page": 1, "total": 2 },
  "data": [
    { "id": 1, "name": "Ada", "address": { "city": "Boston", "zip": "02101" } },
    { "id": 2, "name": "Grace", "address": null }
  ]
}
```

**Solution:**
```ts
interface Address {
  city: string;
  zip: string;
}

interface Customer {
  id: number;
  name: string;
  address: Address | null; // the API really does send null — encode that truth
}

interface CustomerResponse {
  meta: { page: number; total: number };
  data: Customer[];
}

function getCityNames(response: CustomerResponse): string[] {
  return response.data
    .map((c) => c.address?.city)
    .filter((city): city is string => city !== undefined);
}
```
Model nullable fields honestly (`Address | null`) instead of pretending they're always
present — then the compiler forces every consumer to handle the null case. Build nested
types from small named pieces, mirroring the JSON.

### 14. Narrowing with `typeof`

**Problem:** Write `formatId(id: string | number)` that pads numbers to 5 digits
(`42 → "00042"`) and uppercases strings — with TypeScript proving each branch is safe.

**Solution:**
```ts
function formatId(id: string | number): string {
  if (typeof id === "number") {
    // in this branch TS knows id: number
    return String(id).padStart(5, "0");
  }
  // and here it must be string — no `else` needed after a return
  return id.toUpperCase();
}

console.log(formatId(42));      // "00042"
console.log(formatId("ab-12")); // "AB-12"
```
This is *narrowing*: TypeScript tracks your runtime checks (`typeof`, `===`, `in`,
`instanceof`, truthiness) and shrinks the type inside each branch. You write ordinary
JavaScript checks; the compiler turns them into proofs.

### 15. Narrowing with `in` and `instanceof`

**Problem:** Given `type Pet = Dog | Fish` where dogs `walk()` and fish `swim()`,
dispatch correctly with `in`. Then use `instanceof` to give a better message for `Error`
objects in a `handle(err: unknown)` function.

**Solution:**
```ts
interface Dog { name: string; walk(): void }
interface Fish { name: string; swim(): void }
type Pet = Dog | Fish;

function exercise(pet: Pet): void {
  if ("walk" in pet) pet.walk(); // property check narrows Dog vs Fish
  else pet.swim();
}

function handle(err: unknown): string {
  if (err instanceof Error) return err.message; // narrows unknown -> Error
  return String(err);
}
```
`in` narrows by property existence — useful for plain-object unions. `instanceof` narrows
by class — the standard move in `catch` blocks, since TypeScript types caught errors as
`unknown` (anything can be thrown, not just `Error`).

### 16. Discriminated unions

**Problem:** Model the three states of a data fetch — loading, success (with data), error
(with message) — so it's *impossible* to read `data` in the error state.

**Solution:**
```ts
type FetchState =
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };

function render(state: FetchState): string {
  switch (state.status) {         // `status` is the discriminant
    case "loading":
      return "Spinner...";
    case "success":
      return state.data.join(", ");   // data exists ONLY here
    case "error":
      return `Error: ${state.message}`; // message exists ONLY here
  }
}

console.log(render({ status: "success", data: ["a", "b"] }));
// render({ status: "success" })          // Error: missing data
// state.data in the "error" case         // Error: no such property
```
The single most valuable TypeScript pattern for app code. Instead of a bag of maybe-set
fields (`data?`, `error?`, `isLoading?` — 8 combinations, most nonsensical), each state
carries exactly its own fields. React reducers and API states should look like this.

---

## Narrowing & Unions (continued)

### 17. Custom type guards (`is`)

**Problem:** Write `isProduct(value: unknown): value is Product` that validates an
unknown value at runtime, and use it to safely handle `JSON.parse` output.

**Solution:**
```ts
interface Product {
  id: number;
  name: string;
  price: number;
}

function isProduct(value: unknown): value is Product {
  return (
    typeof value === "object" && value !== null &&
    "id" in value && typeof (value as Product).id === "number" &&
    "name" in value && typeof (value as Product).name === "string" &&
    "price" in value && typeof (value as Product).price === "number"
  );
}

const raw: unknown = JSON.parse('{"id":1,"name":"Mouse","price":20}');
if (isProduct(raw)) {
  console.log(raw.name.toUpperCase()); // raw is Product in here — full autocomplete
} else {
  console.error("Malformed product data");
}
```
The `value is Product` return type tells the compiler "if I return true, treat it as a
Product." This bridges the gap between untrusted runtime data (API responses, storage)
and your type system. Libraries like Zod generate these guards from schemas — same idea,
industrialized.

### 18. Exhaustiveness checking with `never`

**Problem:** Make the compiler *force* you to update `labelFor` when someone adds a new
member to the `Role` union.

**Solution:**
```ts
type Role = "admin" | "editor" | "viewer";

function labelFor(role: Role): string {
  switch (role) {
    case "admin": return "Administrator";
    case "editor": return "Editor";
    case "viewer": return "Read-only";
    default: {
      // If every case is handled, `role` here has type `never`.
      // Add "owner" to Role without a case -> this line errors at compile time.
      const unhandled: never = role;
      throw new Error(`Unhandled role: ${unhandled}`);
    }
  }
}
```
The `never` trick turns "I forgot to update that switch" — a classic source of silent
production bugs — into a compile error at the exact spot that needs attention. Use it in
every switch over a union that will grow.

### 19. Literal types and `as const`

**Problem:** Explain why `const config = { method: "POST" }` fails when passed to fetch's
typed options, and fix it with `as const`.

**Solution:**
```ts
function send(options: { method: "GET" | "POST" }) { /* ... */ }

const config1 = { method: "POST" };
// send(config1); // Error: string is not assignable to '"GET" | "POST"'
// Why: object properties are mutable, so TS widens "POST" to string.

const config2 = { method: "POST" as const }; // keep the literal type
send(config2); // OK

const config3 = { method: "POST" } as const; // freeze the whole object's types
send(config3); // OK — also makes every property readonly

// as const on arrays gives readonly tuples of literals:
const ROLES = ["admin", "editor", "viewer"] as const;
type Role = (typeof ROLES)[number]; // "admin" | "editor" | "viewer" — derived, not duplicated
```
`as const` says "narrow, don't widen." The `typeof ROLES[number]` trick — deriving a union
type from a runtime array — keeps your dropdown options and your types permanently in sync
from a single list.

### 20. Optional properties vs `| undefined` vs `| null`

**Problem:** For an update-profile form, decide the right type for: a field the user may
omit, a field the API may explicitly clear, and show how the three differ.

**Solution:**
```ts
interface ProfileUpdate {
  displayName?: string;        // may be ABSENT: "don't change this field"
  bio: string | null;          // must be present; null means "clear it"
  email: string;               // required, always a string
}

const update1: ProfileUpdate = { bio: null, email: "a@b.com" };          // clear bio
const update2: ProfileUpdate = { bio: "Hi!", email: "a@b.com", displayName: "Ada" };
// const bad: ProfileUpdate = { email: "a@b.com" }; // Error: bio is required

// The distinction matters at the API boundary:
// PATCH { }                  -> displayName absent: leave it alone
// PATCH { "bio": null }      -> explicit null: delete the bio
```
`?` = "may not be there at all"; `| null` = "there, but deliberately empty." REST PATCH
semantics rely on this difference — a well-typed update DTO encodes which fields are
omittable and which are clearable, and the compiler enforces it.

### 21. Function overloads

**Problem:** Write `getById` that returns `User` when given a number and `User[]` when
given an array of numbers — with the return type tracking the argument type.

**Solution:**
```ts
interface User { id: number; name: string }
const db: User[] = [{ id: 1, name: "Ada" }, { id: 2, name: "Grace" }];

// Overload signatures — what callers see:
function getById(id: number): User | undefined;
function getById(ids: number[]): User[];
// Implementation signature — must cover both:
function getById(idOrIds: number | number[]): User | undefined | User[] {
  if (Array.isArray(idOrIds)) {
    return db.filter((u) => idOrIds.includes(u.id));
  }
  return db.find((u) => u.id === idOrIds);
}

const one = getById(1);        // type: User | undefined
const many = getById([1, 2]);  // type: User[]
```
Overloads let one function present different signatures. Use them sparingly — a union
parameter or two separate functions is usually simpler — but recognize them: DOM and
library typings (`addEventListener`, `useState`) are full of them.

### 22. Typing errors in `catch`

**Problem:** In strict TS, the catch variable is `unknown`. Write a robust
`getErrorMessage(err: unknown): string` and use it in a try/catch.

**Solution:**
```ts
function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err); // objects thrown by libraries
  } catch {
    return "Unknown error";     // circular structures etc.
  }
}

async function save(): Promise<void> {
  try {
    throw new Error("Network down");
  } catch (err) {           // err: unknown — you cannot assume it's an Error
    console.error(`Save failed: ${getErrorMessage(err)}`);
  }
}
```
JavaScript lets you `throw` anything — strings, numbers, objects — so TypeScript
truthfully types caught values as `unknown`. Every real codebase has a helper like this;
write it once, use it in every catch block.

### 23. Enums vs literal unions

**Problem:** Model HTTP methods both ways — as an `enum` and as a literal union — and
give the practical trade-off.

**Solution:**
```ts
// Option A: enum — a real object exists at runtime
enum HttpMethodEnum {
  Get = "GET",
  Post = "POST",
  Delete = "DELETE",
}
const m1: HttpMethodEnum = HttpMethodEnum.Post;

// Option B: literal union — types only, zero runtime code
type HttpMethod = "GET" | "POST" | "DELETE";
const m2: HttpMethod = "POST";

// Need to iterate the values at runtime? Derive the union from a const array:
const HTTP_METHODS = ["GET", "POST", "DELETE"] as const;
type HttpMethod2 = (typeof HTTP_METHODS)[number];
HTTP_METHODS.forEach((m) => console.log(m)); // runtime iteration AND a derived type
```
Modern TS style favors literal unions: lighter syntax (`"POST"` vs
`HttpMethodEnum.Post`), no generated JS, and better inference. The `as const` array
pattern (option B+) gives you both a runtime list and a type from one source of truth.

### 24. Type assertions — and their dangers

**Problem:** Show a legitimate use of `as` (a DOM lookup you know more about than the
compiler), a dangerous use, and the safer alternative.

**Solution:**
```ts
// Legitimate: you know the element's concrete type; TS only knows Element | null
const input = document.querySelector("#email") as HTMLInputElement;
console.log(input.value);

// Dangerous: asserting untrusted data — the compiler now trusts a lie
interface User { id: number; name: string }
const user = JSON.parse('{"id":1}') as User;
console.log(user.name.toUpperCase()); // compiles fine, CRASHES at runtime — name is undefined

// Safer: validate, then narrow (type guard from problem 17)
function isUser(v: unknown): v is User {
  return typeof v === "object" && v !== null &&
    typeof (v as User).id === "number" && typeof (v as User).name === "string";
}
const raw: unknown = JSON.parse('{"id":1}');
if (isUser(raw)) console.log(raw.name.toUpperCase());
else console.error("Bad user payload");
```
`as` never checks anything — it silences the compiler. Fine when *you* have information
TS lacks (DOM types); a landmine when applied to data from outside the program. At data
boundaries, validate instead of asserting.

---

## Generics & Utility Types

### 25. Generic functions

**Problem:** Write `firstOrDefault<T>(items, fallback)` returning the first element or
the fallback — one function working for any element type without `any`.

**Solution:**
```ts
function firstOrDefault<T>(items: T[], fallback: T): T {
  return items.length > 0 ? items[0] : fallback;
}

const n = firstOrDefault([10, 20], 0);            // n: number
const s = firstOrDefault<string>([], "none");     // s: string ("none")
const u = firstOrDefault([{ id: 1 }], { id: 0 }); // u: { id: number }

// With `any` you'd lose everything: the result of firstOrDefault-as-any
// could be used as a number even when it's an object. Generics keep the link
// between what goes in and what comes out.
```
A generic is a *type parameter*: "this function works for some type T, and wherever T
appears, it's the same T." Usually you never write the `<...>` at the call site —
inference fills it from the arguments.

### 26. Generic constraints

**Problem:** Write `getLongest<T>(a, b)` returning whichever argument has the greater
`.length` — it should accept strings and arrays but reject numbers.

**Solution:**
```ts
function getLongest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

console.log(getLongest("hello", "hi"));        // "hello" (T = string)
console.log(getLongest([1, 2, 3], [1]));       // [1,2,3] (T = number[])
// getLongest(10, 20); // Error: number doesn't have a .length property
```
`extends` constrains what T can be: "any type, as long as it has a numeric `length`."
Constraints let generic code *use* properties of T safely. The most common real-world
constraint: `T extends { id: number }` for functions that work on any entity with an id.

### 27. `keyof` and typed property access

**Problem:** Write `pluck<T, K>(items, key)` that extracts one property from every object
in an array — `pluck(users, "name")` returns `string[]`, and `pluck(users, "nmae")` is a
compile error.

**Solution:**
```ts
function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((item) => item[key]);
}

const users = [
  { id: 1, name: "Ada", active: true },
  { id: 2, name: "Grace", active: false },
];

const names = pluck(users, "name");    // string[]
const ids = pluck(users, "id");        // number[]
const flags = pluck(users, "active");  // boolean[]
// pluck(users, "nmae"); // Error: '"nmae"' is not assignable to keyof
```
`keyof T` is the union of T's property names (`"id" | "name" | "active"`), and `T[K]` is
the type *of that property*. Together they make string-based property access fully
type-safe — the pattern behind typed form libraries, sort-by-column tables, and ORMs.

### 28. `Partial` and `Required`

**Problem:** Use `Partial<Task>` to type an `updateTask(id, changes)` function that
accepts any subset of fields, and note what `Required` does.

**Solution:**
```ts
interface Task {
  id: number;
  title: string;
  done: boolean;
  dueDate?: string;
}

function updateTask(id: number, changes: Partial<Task>): void {
  // Partial<Task> = { id?: number; title?: string; done?: boolean; dueDate?: string }
  console.log(`Updating ${id} with`, changes);
}

updateTask(1, { done: true });                    // any subset is fine
updateTask(1, { title: "New", dueDate: "2026-08-01" });
// updateTask(1, { color: "red" });               // Error: unknown property

type FullTask = Required<Task>; // the reverse: dueDate becomes required
```
`Partial<T>` makes every property optional — the exact type of a PATCH body or an
"edit form" state. These utility types *derive* from `Task`, so adding a field to the
interface automatically updates every Partial/Required use of it.

### 29. `Pick` and `Omit`

**Problem:** From a full `User` (including `passwordHash`), derive: a `UserPreview` with
just `id` and `name`, and a `PublicUser` that is everything *except* `passwordHash`.

**Solution:**
```ts
interface User {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

type UserPreview = Pick<User, "id" | "name">;
// { id: number; name: string }

type PublicUser = Omit<User, "passwordHash">;
// everything but passwordHash

function toPublic(user: User): PublicUser {
  const { passwordHash, ...rest } = user; // strip it at runtime too!
  return rest;
}
```
`Pick` selects fields, `Omit` excludes them. This is how you define API response shapes
(never send the hash!) and list-item types from one canonical entity — change `User` once
and every derived type follows. Note the runtime destructuring: types alone don't remove
data, they just catch you if you forget to.

### 30. `Record`, `Readonly`, `ReturnType`

**Problem:** (a) Type a cache mapping url → response body. (b) Freeze a config type.
(c) Get the return type of an existing function without retyping it.

**Solution:**
```ts
// (a) Record for open key-value maps
const cache: Record<string, string> = {};
cache["/api/users"] = '[{"id":1}]';

// (b) Readonly<T> makes every property readonly
interface Config { apiUrl: string; retries: number }
const config: Readonly<Config> = { apiUrl: "/api", retries: 3 };
// config.retries = 5; // Error: read-only

// (c) ReturnType extracts what a function returns
function buildUser(name: string) {
  return { id: Math.random(), name, createdAt: new Date() };
}
type BuiltUser = ReturnType<typeof buildUser>;
// { id: number; name: string; createdAt: Date } — stays in sync with the function

const u: BuiltUser = buildUser("Ada");
```
`ReturnType<typeof fn>` is the key trick here: instead of hand-maintaining a type that
mirrors a function, derive it. When the function changes, the type follows. (Sibling
utility: `Parameters<typeof fn>` for argument types.)

### 31. Generic interfaces: a typed API envelope

**Problem:** Your API wraps every response as `{ success, data, error }`. Type it once as
`ApiResponse<T>` and use it for a user response and a product-list response.

**Solution:**
```ts
interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}

interface User { id: number; name: string }
interface Product { id: number; name: string; price: number }

const userRes: ApiResponse<User> = {
  success: true,
  data: { id: 1, name: "Ada" },
  error: null,
};

const listRes: ApiResponse<Product[]> = {
  success: false,
  data: null,
  error: "Database unavailable",
};

function unwrap<T>(res: ApiResponse<T>): T {
  if (!res.success || res.data === null) {
    throw new Error(res.error ?? "Unknown API error");
  }
  return res.data;
}

const user = unwrap(userRes); // user: User — fully typed all the way through
```
Generic interfaces let you type the *envelope* once and vary the payload. Even better:
model it as a discriminated union (`{ success: true; data: T } | { success: false;
error: string }`) so `data` can't be null when success is true — combine problems 16
and 31 as an exercise.

### 32. A typed fetch wrapper

**Problem:** Write `http<T>(path, options?): Promise<T>` so that callers get typed
results: `const users = await http<User[]>("/users")`.

**Solution:**
```ts
const API_BASE = "https://jsonplaceholder.typicode.com";

interface HttpOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
}

async function http<T>(path: string, options: HttpOptions = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: options.method ?? "GET",
    headers: options.body ? { "Content-Type": "application/json" } : undefined,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} on ${path}`);
  return res.json() as Promise<T>;
}

interface Todo { id: number; title: string; completed: boolean }

const todos = await http<Todo[]>("/todos");        // todos: Todo[]
const created = await http<Todo>("/todos", {       // created: Todo
  method: "POST",
  body: { title: "Learn generics", completed: false },
});
console.log(todos[0].title, created.id);
```
This is the JS api-client (JavaScript file, problem 48) upgraded with types. Honest
caveat: the `as Promise<T>` is a promise to the compiler, not a check — the server could
send anything. For hard guarantees, validate the response with a type guard or a schema
library (Zod) at this exact spot; either way, this wrapper is where types enter your app.

---

## Classes & Advanced Types

### 33. Classes with typed members

**Problem:** Write a `ShoppingCart` class: private item list, `add(item)`,
`remove(productId)`, and a `total` getter.

**Solution:**
```ts
interface CartItem {
  productId: number;
  name: string;
  price: number;
  qty: number;
}

class ShoppingCart {
  private items: CartItem[] = []; // private: inaccessible outside the class

  add(item: CartItem): void {
    const existing = this.items.find((i) => i.productId === item.productId);
    if (existing) existing.qty += item.qty;   // merge duplicates
    else this.items.push({ ...item });
  }

  remove(productId: number): void {
    this.items = this.items.filter((i) => i.productId !== productId);
  }

  get total(): number {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }
}

const cart = new ShoppingCart();
cart.add({ productId: 1, name: "Mouse", price: 20, qty: 2 });
console.log(cart.total);   // 40
// cart.items;             // Error: 'items' is private
```
TS classes add access modifiers (`private`, `protected`, `public`) and typed fields to JS
classes. A getter (`get total`) exposes computed values as properties. Classes shine for
stateful services; plain functions + interfaces are still preferred for data.

### 34. Constructor shorthand and `implements`

**Problem:** Define a `Logger` interface, implement it twice (`ConsoleLogger`, and
`PrefixLogger` using constructor parameter properties), and write code that depends only
on the interface.

**Solution:**
```ts
interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(message);
  }
}

class PrefixLogger implements Logger {
  // "parameter properties": declares AND assigns this.prefix in one line
  constructor(private prefix: string) {}

  log(message: string): void {
    console.log(`[${this.prefix}] ${message}`);
  }
}

// Depends on the interface — works with ANY Logger, real or fake
function processOrder(orderId: number, logger: Logger): void {
  logger.log(`Processing order ${orderId}`);
}

processOrder(7, new ConsoleLogger());
processOrder(7, new PrefixLogger("orders")); // [orders] Processing order 7
```
`implements` makes the compiler verify a class satisfies an interface. Depending on
interfaces instead of concrete classes is what makes code testable (pass a fake logger in
tests) — the same dependency-injection idea you'll meet big-time in C#/ASP.NET.

### 35. Abstract classes

**Problem:** Create an abstract `PaymentProcessor` with a concrete `process(amount)`
method that calls an abstract `charge(amount)`, then implement `StripeProcessor`.

**Solution:**
```ts
abstract class PaymentProcessor {
  constructor(protected merchantId: string) {}

  // Template method: shared validation + logging around a varying core
  process(amount: number): void {
    if (amount <= 0) throw new Error("Amount must be positive");
    console.log(`[${this.merchantId}] processing $${amount}`);
    this.charge(amount);           // deferred to the subclass
    console.log("Done.");
  }

  protected abstract charge(amount: number): void; // subclasses MUST implement
}

class StripeProcessor extends PaymentProcessor {
  protected charge(amount: number): void {
    console.log(`Stripe API: charging $${amount}`);
  }
}

new StripeProcessor("m-42").process(25);
// new PaymentProcessor("x"); // Error: cannot instantiate an abstract class
```
Abstract classes are half interface, half implementation: shared logic lives once in the
base, the parts that vary are forced onto subclasses. Reach for an interface first; use
abstract classes when there's real shared behavior to inherit.

### 36. Intersection types

**Problem:** Given `Timestamps` (`createdAt`, `updatedAt`) and `SoftDelete`
(`deletedAt: string | null`), compose a `BlogPost` type from a base shape plus both
mixins using `&`.

**Solution:**
```ts
type Timestamps = {
  createdAt: string;
  updatedAt: string;
};

type SoftDelete = {
  deletedAt: string | null;
};

type BlogPost = {
  id: number;
  title: string;
  body: string;
} & Timestamps & SoftDelete;

const post: BlogPost = {
  id: 1,
  title: "Intersections",
  body: "...",
  createdAt: "2026-07-01",
  updatedAt: "2026-07-02",
  deletedAt: null, // required by SoftDelete — forget it and the compiler objects
};

function isActive(record: SoftDelete): boolean {
  return record.deletedAt === null; // works on ANY soft-deletable type
}
```
`A & B` means "has everything from both." Intersections compose small capability types
(timestamps, soft-delete, audit fields) onto entities — and functions can then accept
just the capability they need (`isActive` takes any `SoftDelete`), not the whole entity.

### 37. Mapped types (a gentle introduction)

**Problem:** Without using the built-ins, write your own `MyPartial<T>` and a
`Flags<T>` type that turns every property of T into a boolean (for a "which fields are
dirty?" form tracker).

**Solution:**
```ts
// Mapped type: "for every key K in T, produce a property"
type MyPartial<T> = {
  [K in keyof T]?: T[K];    // same value types, all optional
};

type Flags<T> = {
  [K in keyof T]: boolean;  // same keys, boolean values
};

interface Profile { name: string; email: string; age: number }

type ProfileDraft = MyPartial<Profile>; // { name?: string; email?: ...; age?: ... }
type DirtyFields = Flags<Profile>;      // { name: boolean; email: boolean; age: boolean }

const dirty: DirtyFields = { name: true, email: false, age: false };
```
Mapped types iterate over `keyof T` to build new types from old ones — this is literally
how `Partial`, `Required`, `Readonly`, and `Pick` are implemented. You'll rarely write
them daily, but reading them unlocks understanding of library typings and form/ORM magic.

### 38. Template literal types

**Problem:** Type event names as `` `${Entity}:${Action}` `` where entity is
`"user" | "post"` and action is `"created" | "deleted"`, and write a typed `emit`.

**Solution:**
```ts
type Entity = "user" | "post";
type Action = "created" | "deleted";

type EventName = `${Entity}:${Action}`;
// "user:created" | "user:deleted" | "post:created" | "post:deleted"

function emit(event: EventName, payload: unknown): void {
  console.log(`Event: ${event}`, payload);
}

emit("user:created", { id: 1 });
emit("post:deleted", { id: 9 });
// emit("user:destroyed", {}); // Error: not a valid EventName
```
Template literal types build string unions combinatorially. Event buses, route paths
(`/users/${string}`), and CSS-ish props all benefit: typos in "stringly-typed" APIs
become compile errors instead of silently-ignored events.

### 39. Typing module boundaries

**Problem:** Split a mini app into `types.ts`, `validation.ts`, and `main.ts` with
type-only imports where appropriate.

**Solution:**
```ts
// ---- types.ts — the shared vocabulary of the app
export interface Task {
  id: number;
  title: string;
  done: boolean;
}
export type TaskInput = Omit<Task, "id">;

// ---- validation.ts
import type { TaskInput } from "./types";  // `import type` = erased at compile time

export function validateTask(input: TaskInput): string[] {
  const errors: string[] = [];
  if (!input.title.trim()) errors.push("Title is required");
  if (input.title.length > 100) errors.push("Title too long");
  return errors;
}

// ---- main.ts
import type { Task } from "./types";
import { validateTask } from "./validation";

const draft = { title: "Ship it", done: false };
const errors = validateTask(draft);
const task: Task = errors.length === 0 ? { id: 1, ...draft } : (() => { throw new Error(errors.join(", ")); })();
console.log(task);
```
A dedicated `types.ts` (per feature or shared) gives every layer one vocabulary.
`import type` documents that you're importing only compile-time information — it
disappears entirely from the built JavaScript.

### 40. Deriving types from data with `satisfies`

**Problem:** Define a `routes` config object that must map route names to paths, but
without widening the values to `string` — you want `routes.home` to stay the literal
`"/"`.

**Solution:**
```ts
// Annotating widens: every value becomes plain `string`
const routesA: Record<string, string> = { home: "/", users: "/users" };
// routesA.hoem  -> no error! Record<string, ...> allows any key. Bad.

// `satisfies` CHECKS against the type but KEEPS the inferred literals
const routes = {
  home: "/",
  users: "/users",
  userDetail: "/users/:id",
} satisfies Record<string, `/${string}`>; // every value must start with "/"

routes.home;          // type: "/" (literal preserved)
// routes.hoem;       // Error: property doesn't exist — keys stay exact
// Adding `about: "about"` -> Error: doesn't match `/${string}`

type RouteName = keyof typeof routes; // "home" | "users" | "userDetail"
```
`satisfies` = "verify this value fits the type, but don't change its inferred type."
It's the modern answer to config objects: full checking of the values *and* precise
autocomplete on the keys. Compare: annotation widens, `as` lies, `satisfies` checks.

---

## Typing a CRUD App

The last ten problems build the typed data layer of a project-tracker app.

### 41. Entity types and DTOs

**Problem:** Define the `Project` entity, plus `CreateProjectDto` (no id/timestamps —
the server assigns those) and `UpdateProjectDto` (any subset of editable fields) —
derived, not duplicated.

**Solution:**
```ts
export interface Project {
  id: number;
  name: string;
  description: string;
  status: "active" | "paused" | "archived";
  createdAt: string;
  updatedAt: string;
}

// What the CLIENT sends to create one: strip server-managed fields
export type CreateProjectDto = Omit<Project, "id" | "createdAt" | "updatedAt">;

// What the client sends to update one: any subset of the editable fields
export type UpdateProjectDto = Partial<CreateProjectDto>;

const dto: CreateProjectDto = {
  name: "Learning Lab",
  description: "50 problems each",
  status: "active",
};
const patch: UpdateProjectDto = { status: "paused" };
```
DTO ("data transfer object") types describe what crosses the wire, which is never quite
the entity itself. Deriving them with `Omit`/`Partial` means adding a field to `Project`
automatically flows into both DTOs — one source of truth.

### 42. A repository interface

**Problem:** Define a generic `Repository<T, TCreate, TUpdate>` interface with
`getAll`, `getById`, `create`, `update`, `remove` — all async.

**Solution:**
```ts
export interface Repository<T, TCreate, TUpdate> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T | null>;   // null = not found, typed honestly
  create(data: TCreate): Promise<T>;        // returns the full entity with server fields
  update(id: number, data: TUpdate): Promise<T>;
  remove(id: number): Promise<void>;
}

// Specialize it per entity:
export type ProjectRepository = Repository<Project, CreateProjectDto, UpdateProjectDto>;
```
An interface for the data layer means the rest of the app doesn't care *where* data
lives — REST API, localStorage, in-memory test fake — as long as the contract holds.
This is the TypeScript version of what you'll do with `IRepository` in C#.

### 43. An in-memory implementation

**Problem:** Implement `InMemoryProjectRepository` satisfying the interface — useful for
tests and prototyping before a backend exists.

**Solution:**
```ts
export class InMemoryProjectRepository implements ProjectRepository {
  private projects: Project[] = [];
  private nextId = 1;

  async getAll(): Promise<Project[]> {
    return [...this.projects];
  }

  async getById(id: number): Promise<Project | null> {
    return this.projects.find((p) => p.id === id) ?? null;
  }

  async create(data: CreateProjectDto): Promise<Project> {
    const now = new Date().toISOString();
    const project: Project = { id: this.nextId++, ...data, createdAt: now, updatedAt: now };
    this.projects.push(project);
    return project;
  }

  async update(id: number, data: UpdateProjectDto): Promise<Project> {
    const existing = await this.getById(id);
    if (!existing) throw new Error(`Project ${id} not found`);
    const updated: Project = { ...existing, ...data, updatedAt: new Date().toISOString() };
    this.projects = this.projects.map((p) => (p.id === id ? updated : p));
    return updated;
  }

  async remove(id: number): Promise<void> {
    this.projects = this.projects.filter((p) => p.id !== id);
  }
}
```
`implements ProjectRepository` makes the compiler verify every method signature matches.
The methods are `async` even though nothing awaits — so the fake has the *same interface*
as a real HTTP implementation and the two are interchangeable.

### 44. The HTTP implementation

**Problem:** Implement `ApiProjectRepository` over the typed `http` helper from
problem 32 — same interface, real network.

**Solution:**
```ts
export class ApiProjectRepository implements ProjectRepository {
  constructor(private baseUrl: string = "/api/projects") {}

  getAll(): Promise<Project[]> {
    return http<Project[]>(this.baseUrl);
  }

  async getById(id: number): Promise<Project | null> {
    try {
      return await http<Project>(`${this.baseUrl}/${id}`);
    } catch (err) {
      if (err instanceof Error && err.message.includes("404")) return null;
      throw err; // real failures still propagate — only "not found" becomes null
    }
  }

  create(data: CreateProjectDto): Promise<Project> {
    return http<Project>(this.baseUrl, { method: "POST", body: data });
  }

  update(id: number, data: UpdateProjectDto): Promise<Project> {
    return http<Project>(`${this.baseUrl}/${id}`, { method: "PATCH", body: data });
  }

  async remove(id: number): Promise<void> {
    await http<void>(`${this.baseUrl}/${id}`, { method: "DELETE" });
  }
}

// Anywhere in the app:
const repo: ProjectRepository =
  import.meta.env?.MODE === "test" ? new InMemoryProjectRepository()
                                   : new ApiProjectRepository();
```
Two implementations, one interface — swap them with one line. Note how `getById`
translates a 404 into `null` (an expected outcome) while letting genuine errors throw:
mapping transport-level events into domain-level meanings is exactly the repository's job.

### 45. Typed validation results

**Problem:** Write `validateCreateProject(dto)` returning a discriminated union:
`{ ok: true; value: CreateProjectDto } | { ok: false; errors: Record<string, string> }`
(field name → message), so callers can't touch `value` without checking `ok`.

**Solution:**
```ts
type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; errors: Record<string, string> };

const STATUSES = ["active", "paused", "archived"] as const;

export function validateCreateProject(input: {
  name: string; description: string; status: string;
}): ValidationResult<CreateProjectDto> {
  const errors: Record<string, string> = {};

  if (!input.name.trim()) errors.name = "Name is required";
  else if (input.name.length > 80) errors.name = "Name must be 80 characters or fewer";

  if (!(STATUSES as readonly string[]).includes(input.status)) {
    errors.status = `Status must be one of: ${STATUSES.join(", ")}`;
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    value: {
      name: input.name.trim(),
      description: input.description.trim(),
      status: input.status as CreateProjectDto["status"], // safe: checked above
    },
  };
}

const result = validateCreateProject({ name: "", description: "", status: "wat" });
if (result.ok) console.log(result.value.name);
else console.log(result.errors); // { name: '...', status: '...' }
```
The union makes invalid access impossible: `result.value` doesn't exist until you've
checked `result.ok`. Field-keyed errors (`Record<string, string>`) map directly onto
form fields in a UI — each input shows its own message.

### 46. Typed pagination and query params

**Problem:** Type a paginated response `Paginated<T>` and a `ProjectQuery`
(`page`, `pageSize`, optional `status` filter, optional `search`), then write
`buildQueryString(query)`.

**Solution:**
```ts
export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface ProjectQuery {
  page?: number;
  pageSize?: number;
  status?: Project["status"];  // reuse the entity's own union — no duplication
  search?: string;
}

export function buildQueryString(query: ProjectQuery): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) params.set(key, String(value));
  }
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

// usage:
// const page = await http<Paginated<Project>>(
//   `/api/projects${buildQueryString({ page: 2, status: "active" })}`
// );
```
`Project["status"]` is an *indexed access type* — it reads the status union straight off
the entity, so a new status value automatically becomes filterable. `Paginated<T>` will
wrap any list endpoint in the app.

### 47. A typed event system

**Problem:** Type an event emitter where each event name has its own payload type:
`"project:created"` carries a `Project`, `"project:deleted"` carries `{ id: number }` —
and mismatches are compile errors.

**Solution:**
```ts
interface EventMap {
  "project:created": Project;
  "project:deleted": { id: number };
  "error": { message: string };
}

class TypedEmitter {
  private handlers: { [K in keyof EventMap]?: Array<(payload: EventMap[K]) => void> } = {};

  on<K extends keyof EventMap>(event: K, handler: (payload: EventMap[K]) => void): void {
    (this.handlers[event] ??= []).push(handler);
  }

  emit<K extends keyof EventMap>(event: K, payload: EventMap[K]): void {
    this.handlers[event]?.forEach((h) => h(payload));
  }
}

const bus = new TypedEmitter();
bus.on("project:created", (p) => console.log(p.name));      // p: Project — inferred!
bus.on("project:deleted", (p) => console.log(p.id));        // p: { id: number }
// bus.emit("project:created", { id: 1 });                  // Error: not a Project
// bus.on("project:renamed", () => {});                     // Error: unknown event
```
One `EventMap` interface drives everything: event names come from `keyof`, payload types
from indexed access. This generic-constraint pattern (`K extends keyof Map`) is the same
machinery behind typed `addEventListener` and every typed pub/sub library.

### 48. Typing a state reducer

**Problem:** Type a reducer for the project list screen: state holds `projects`,
`loading`, `error`; actions are `fetch_start`, `fetch_success` (with projects),
`fetch_error` (with message), `project_removed` (with id).

**Solution:**
```ts
interface ProjectListState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

type ProjectListAction =
  | { type: "fetch_start" }
  | { type: "fetch_success"; projects: Project[] }
  | { type: "fetch_error"; message: string }
  | { type: "project_removed"; id: number };

function reducer(state: ProjectListState, action: ProjectListAction): ProjectListState {
  switch (action.type) {
    case "fetch_start":
      return { ...state, loading: true, error: null };
    case "fetch_success":
      return { projects: action.projects, loading: false, error: null };
    case "fetch_error":
      return { ...state, loading: false, error: action.message };
    case "project_removed":
      return { ...state, projects: state.projects.filter((p) => p.id !== action.id) };
    default: {
      const unhandled: never = action; // exhaustiveness guard (problem 18)
      return state;
    }
  }
}
```
Discriminated-union actions give each `case` exactly the right payload fields
(`action.projects` only exists in `fetch_success`), and the `never` guard forces updates
when a new action is added. This is precisely the shape `useReducer` expects — you'll
reuse it verbatim in the React file.

### 49. Generic service with constraints

**Problem:** Write a generic `CrudService<T extends { id: number }>` that wraps any
repository and adds caching for `getById`.

**Solution:**
```ts
export class CrudService<
  T extends { id: number },
  TCreate,
  TUpdate,
> {
  private cache = new Map<number, T>();

  constructor(private repo: Repository<T, TCreate, TUpdate>) {}

  async getById(id: number): Promise<T | null> {
    const cached = this.cache.get(id);
    if (cached) return cached;

    const entity = await this.repo.getById(id);
    if (entity) this.cache.set(entity.id, entity); // .id is safe: T extends { id }
    return entity;
  }

  async create(data: TCreate): Promise<T> {
    const created = await this.repo.create(data);
    this.cache.set(created.id, created);
    return created;
  }

  async update(id: number, data: TUpdate): Promise<T> {
    const updated = await this.repo.update(id, data);
    this.cache.set(id, updated);
    return updated;
  }

  async remove(id: number): Promise<void> {
    await this.repo.remove(id);
    this.cache.delete(id); // keep the cache honest
  }
}

const projectService = new CrudService(new InMemoryProjectRepository());
// projectService.getById / create / update / remove — all typed for Project
```
The constraint `T extends { id: number }` is what lets generic code do something real
with T (use its id for caching) while remaining reusable for Projects, Users, Products…
Note every mutation keeps the cache in sync — stale caches are the classic bug in this
pattern.

### 50. Capstone: end-to-end typed flow

**Problem:** Wire problems 41–49 together: take raw form input, validate it, create the
project through the service, emit an event, and return a discriminated result — every
step typed, no `any` anywhere.

**Solution:**
```ts
type CreateOutcome =
  | { ok: true; project: Project }
  | { ok: false; errors: Record<string, string> };

async function handleCreateProject(
  rawInput: { name: string; description: string; status: string },
  service: CrudService<Project, CreateProjectDto, UpdateProjectDto>,
  bus: TypedEmitter,
): Promise<CreateOutcome> {
  // 1. Validate untrusted input -> typed DTO (problem 45)
  const validation = validateCreateProject(rawInput);
  if (!validation.ok) {
    return { ok: false, errors: validation.errors };
  }

  // 2. Persist through the generic service (problems 42–44, 49)
  try {
    const project = await service.create(validation.value);

    // 3. Notify the rest of the app (problem 47)
    bus.emit("project:created", project);

    return { ok: true, project };
  } catch (err) {
    bus.emit("error", { message: err instanceof Error ? err.message : "Create failed" });
    return { ok: false, errors: { _form: "Could not save the project. Please retry." } };
  }
}

// A UI calls it like this:
const outcome = await handleCreateProject(formData, projectService, bus);
if (outcome.ok) console.log(`Created #${outcome.project.id}`);
else console.log(outcome.errors);
```
Follow one keystroke of user input through this function: raw string → validated DTO →
entity with server fields → typed event → discriminated outcome. At no point can the
wrong shape sneak through, and every "sad path" is a value the caller must handle. That's
the payoff of TypeScript in a CRUD app — now take these exact types into React.
