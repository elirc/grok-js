import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTarget } from '../../helpers/load-target.js';

const arrays = await loadTarget(import.meta.url);

test('removeValue removes all matches without mutating original', () => {
  const input = [1, 2, 2, 3];
  assert.deepEqual(arrays.removeValue(input, 2), [1, 3]);
  assert.deepEqual(input, [1, 2, 2, 3]);
});

test('chunkArray splits arrays and rejects invalid sizes', () => {
  assert.deepEqual(arrays.chunkArray([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
  assert.deepEqual(arrays.chunkArray([], 3), []);
  assert.throws(() => arrays.chunkArray([1], 0), RangeError);
});

test('moveZerosToEnd preserves non-zero order and source array', () => {
  const input = [0, 1, 0, 3, 12];
  assert.deepEqual(arrays.moveZerosToEnd(input), [1, 3, 12, 0, 0]);
  assert.deepEqual(input, [0, 1, 0, 3, 12]);
});

test('mostFrequent returns most common value and undefined for empty arrays', () => {
  assert.equal(arrays.mostFrequent(['a', 'b', 'a', 'c', 'b', 'a']), 'a');
  assert.equal(arrays.mostFrequent([]), undefined);
});

test('flattenDeep recursively flattens nested arrays', () => {
  assert.deepEqual(arrays.flattenDeep([1, [2, [3, 4]], 5]), [1, 2, 3, 4, 5]);
});

test('custom map, filter, and reduce match common behavior', () => {
  assert.deepEqual(arrays.myMap([1, 2, 3], (n, index) => n + index), [1, 3, 5]);
  assert.deepEqual(arrays.myFilter([1, 2, 3, 4], (n) => n % 2 === 0), [2, 4]);
  assert.equal(arrays.myReduce([1, 2, 3], (sum, n) => sum + n, 0), 6);
  assert.equal(arrays.myReduce([1, 2, 3], (sum, n) => sum + n), 6);
  assert.throws(() => arrays.myReduce([], (sum, n) => sum + n), TypeError);
});

test('rotateArray rotates right for positive steps and left for negative steps', () => {
  const input = [1, 2, 3, 4];
  assert.deepEqual(arrays.rotateArray(input, 1), [4, 1, 2, 3]);
  assert.deepEqual(arrays.rotateArray(input, -1), [2, 3, 4, 1]);
  assert.deepEqual(input, [1, 2, 3, 4]);
});

test('groupBy groups by property name or callback', () => {
  const people = [
    { name: 'Ana', role: 'admin' },
    { name: 'Bo', role: 'user' },
    { name: 'Cy', role: 'admin' }
  ];

  assert.deepEqual(Object.keys(arrays.groupBy(people, 'role')).sort(), ['admin', 'user']);
  assert.deepEqual(arrays.groupBy([1, 2, 3, 4], (n) => (n % 2 ? 'odd' : 'even')), {
    odd: [1, 3],
    even: [2, 4]
  });
});

test('uniquePreserveOrder removes duplicates and secondLargest ignores duplicate highs', () => {
  assert.deepEqual(arrays.uniquePreserveOrder(['a', 'b', 'a', 'c', 'b']), ['a', 'b', 'c']);
  assert.equal(arrays.secondLargest([10, 4, 10, 8]), 8);
  assert.equal(arrays.secondLargest([5, 5]), undefined);
});
