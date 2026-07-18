/*
Examples: Arrays & Modern Iteration (NEW)

Many concrete runnable snippets.

Example 1: Imperative vs declarative
// for loop vs map/filter/reduce

Example 2: flatMap for one-to-many
const orders = [{items: ['a','b']}, {items:['c']}];
const all = orders.flatMap(o => o.items);

Example 3: Reduce for grouping
const grouped = arr.reduce((acc, item) => {
  (acc[item.cat] ||= []).push(item);
  return acc;
}, {});

Example 4: Searching patterns
.find, .findIndex, .some, .every, .includes

Example 5: Sorting stable + custom comparator

Example 6: Array.from + mapFn for ranges
Array.from({length:5}, (_,i) => i+1)

Example 7: Copying and non-mutating updates
const newArr = [...old, newItem];
const updated = old.map(...)

Expanded with 3-5x examples and explanations.
*/