/*
Examples: ES6+ Modern JavaScript Features (NEW)

Example 1: Destructuring nested + defaults + renaming
const { user: { name = 'anon' } = {} } = data;

Example 2: Spread & Rest everywhere
function sum(...nums) { return nums.reduce((a,b)=>a+b,0); }
const copy = { ...obj, extra: 1 };

Example 3: Optional chaining + nullish
const city = user?.address?.city ?? 'Unknown';

Example 4: Template literals + tagged templates (basic)

Example 5: Classes + extends + super + private fields (#)

Example 6: Modules import/export patterns + dynamic import()

Example 7: for...of + for await...of

Example 8: Symbols, Maps, Sets in practice

Expanded 4x the patterns with comments on when each shines.
*/