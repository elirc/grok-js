/*
Example: Destructuring and Spread for Cleaner Data Handling
*/

const config = { host: "localhost", port: 3000, debug: true, timeout: 5000 };
const { host, port, ...rest } = config;
console.log(host, port, rest);

const user = { id: 1, name: "Alex", profile: { age: 29, city: "NYC" } };
const { profile: { city } } = user;
console.log("City:", city);

const defaults = { theme: "light", lang: "en" };
const userPrefs = { lang: "es", fontSize: 16 };
const finalSettings = { ...defaults, ...userPrefs, lastUpdated: Date.now() };
console.log(finalSettings);

/*
Destructuring pulls values out of objects or arrays into individual variables on the left side of the assignment. In the first block we pull host and port directly while capturing everything else into a rest object using the ... syntax. This is extremely common when you only care about a couple of properties from a larger configuration object.

Nested destructuring (profile: { city }) lets you reach deep into a structure without writing multiple lines of intermediate variables. It is a powerful readability tool once you get used to the syntax.

The spread example at the bottom shows the typical "merge defaults with overrides" pattern used everywhere in frontend and backend code. Properties from later objects override earlier ones. Adding lastUpdated creates a new property that didn't exist in either source. Because each spread creates a shallow new object, the pattern is safe for creating updated state snapshots.

Junior engineers should become very comfortable with these two operators. They appear constantly in React props, Redux state updates, API response shaping, and configuration merging.
*/
