# Functions Expected Output

```js
invokeWithCallApplyBind(function (ending) { return this.name + ending; }, { name: 'Ana' }, ['!'])
// { callResult: 'Ana!', applyResult: 'Ana!', bindResult: 'Ana!' }

sumRest(1, 2, 3)
// 6

partial((a, b, c) => a + b + c, 1, 2)(3)
// 6

createFluentBuilder().set('name', 'Ana').set('role', 'admin').build()
// { name: 'Ana', role: 'admin' }

getThisBindingResults()
// { regular: 'object', borrowedRegular: 'borrowed', arrow: undefined, borrowedArrow: undefined }

compose((n) => n * 2, (n) => n + 1)(3)
// 8

pipe((n) => n + 1, (n) => n * 2)(3)
// 8

const init = once(() => 'created')
init()
// 'created'

curry((a, b, c) => a + b + c)(1)(2)(3)
// 6
```
