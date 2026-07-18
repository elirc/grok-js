# Closures Expected Output

```js
const counter = createCounter(10, 2)
counter.increment()
// 12
counter.reset()
// 10

const init = once(() => Math.random())
init() === init()
// true

const account = createBankAccount(100)
account.deposit(25)
// 125
account.withdraw(50)
// 75

createLoopHandlers(3).map((handler) => handler())
// [0, 1, 2]

const emitter = createEventEmitter()
emitter.on('saved', (value) => value.id)
emitter.emit('saved', { id: 1 })
// [1]

const limited = createRateLimiter(2, 1000, () => 0)
limited()
// true

curry((a, b, c) => a + b + c)(1)(2)(3)
// 6
```
