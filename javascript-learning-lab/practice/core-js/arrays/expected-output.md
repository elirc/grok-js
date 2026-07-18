# Arrays Expected Output

Use these examples to self-check before opening `solution.js`.

```js
removeValue([1, 2, 2, 3], 2)
// [1, 3]

chunkArray([1, 2, 3, 4, 5], 2)
// [[1, 2], [3, 4], [5]]

moveZerosToEnd([0, 1, 0, 3, 12])
// [1, 3, 12, 0, 0]

mostFrequent(['a', 'b', 'a', 'c', 'b', 'a'])
// 'a'

flattenDeep([1, [2, [3, 4]], 5])
// [1, 2, 3, 4, 5]

myMap([1, 2, 3], (n) => n * 2)
// [2, 4, 6]

myFilter([1, 2, 3, 4], (n) => n % 2 === 0)
// [2, 4]

myReduce([1, 2, 3], (sum, n) => sum + n, 0)
// 6

rotateArray([1, 2, 3, 4], 1)
// [4, 1, 2, 3]

groupBy([{ type: 'fruit' }, { type: 'tool' }, { type: 'fruit' }], 'type')
// { fruit: [{ type: 'fruit' }, { type: 'fruit' }], tool: [{ type: 'tool' }] }

uniquePreserveOrder(['a', 'b', 'a'])
// ['a', 'b']

secondLargest([10, 4, 10, 8])
// 8
```
