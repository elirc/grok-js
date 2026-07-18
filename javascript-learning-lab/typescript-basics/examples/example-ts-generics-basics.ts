/*
Example: Generics for Reusable Type-Safe Functions
*/

function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

const firstUser = first([{ id: 1 }, { id: 2 }]); // inferred as { id: number } | undefined
const firstNum = first([10, 20]);               // number | undefined

function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map(item => item[key]);
}

const users = [{ name: "Alex" }, { name: "Sam" }];
const names = pluck(users, "name"); // string[]

/*
The <T> syntax introduces a type variable. When the function is called, TypeScript substitutes the actual type that was passed in. This lets the same function work with numbers, users, or anything else while still providing full type safety and editor autocomplete.

The pluck example adds a constraint with K extends keyof T. This means the key argument must be a property name that actually exists on T. If you pass a key that does not exist on the objects, the compiler will reject the call.

Generics are one of the most powerful tools in TypeScript for writing reusable utilities without losing type information. A junior should practice reading the angle-bracket declarations until the pattern feels natural.
*/
