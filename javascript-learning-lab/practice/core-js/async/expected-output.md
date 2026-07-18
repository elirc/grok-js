# Async Expected Output

```js
await withTimeout(Promise.resolve('ok'), 100)
// 'ok'

await runSequential([() => Promise.resolve(1), () => Promise.resolve(2)])
// [1, 2]

await runParallel([() => Promise.resolve('a'), () => Promise.resolve('b')])
// ['a', 'b']

await retry(async () => 'eventual success', 3)
// 'eventual success'

await concurrencyLimit([task1, task2, task3], 2)
// results in original task order, with only 2 running at once

const readFileAsync = promisify(fakeReadFile)
await readFileAsync('notes.txt')
// callback result

await allSettledClone([Promise.resolve(1), Promise.reject(new Error('bad'))])
// [{ status: 'fulfilled', value: 1 }, { status: 'rejected', reason: Error('bad') }]
```
