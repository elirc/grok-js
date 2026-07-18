/*
JavaScript Coding Problems: Arrays and Iteration (NEW)

BEGINNER GOAL:
Practice real array manipulation patterns: mutation vs non-mutation, searching, transforming, reducing.

CONCEPTS: push/pop/shift/unshift, splice, slice, map/filter/reduce, find/findIndex, some/every, sort, flat, from, includes, indexOf, flatMap, etc.

Problem 1: Remove all occurrences of a value from array without mutating original (return new).

Problem 2: Implement chunk(array, size) => [[1,2],[3,4],...]

Problem 3: Move all zeros to end while keeping order of non-zeros (in place or new).

Problem 4: Find the most frequent element in array.

Problem 5: Flatten a nested array of unknown depth (manual, no flat()).

Problem 6: Implement your own map, filter, reduce from scratch.

Problem 7: Rotate array left/right by k positions.

Problem 8: Group array of objects by a property into object of arrays.

Problem 9: Remove duplicates preserving order.

Problem 10: Find second largest number (no sort).

Solutions (try first):

/*
// 1
function removeValue(arr, val) {
  return arr.filter(x => x !== val);
}

// 2
function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

// 6
Array.prototype.myMap = function(fn) {
  const res = [];
  for (let i = 0; i < this.length; i++) res.push(fn(this[i], i, this));
  return res;
};
*/

console.log("10 array challenges to solidify fundamentals.");
*/