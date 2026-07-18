# Generics Expected Output

```ts
identity('hello')
// 'hello' typed as string

createApiResponse({ id: 'T-1', title: 'Login broken' })
// { data: { id: 'T-1', title: 'Login broken' }, receivedAt: '...' }

pluck([{ title: 'A' }, { title: 'B' }], 'title')
// ['A', 'B']

groupBy([{ status: 'open' }, { status: 'closed' }], (item) => item.status)
// { open: [{ status: 'open' }], closed: [{ status: 'closed' }] }

const repo = createRepository([{ id: 'T-1', title: 'Login broken' }])
repo.findById('T-1')
// { id: 'T-1', title: 'Login broken' }
```
