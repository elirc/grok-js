# Objects Expected Output

```js
deepClone({ user: { name: 'Ana' } })
// { user: { name: 'Ana' } } // with new nested object references

deepMerge({ user: { name: 'Ana', role: 'user' } }, { user: { role: 'admin' } })
// { user: { name: 'Ana', role: 'admin' } }

getPath({ user: { profile: { city: 'Austin' } } }, 'user.profile.city')
// 'Austin'

objectToQueryString({ page: 2, q: 'js lab' })
// 'page=2&q=js+lab'

queryStringToObject('?page=2&q=js+lab')
// { page: '2', q: 'js lab' }

countByProperty([{ role: 'admin' }, { role: 'user' }, { role: 'admin' }], 'role')
// { admin: 2, user: 1 }

pick({ id: 1, name: 'Ana', password: 'secret' }, ['id', 'name'])
// { id: 1, name: 'Ana' }

omit({ id: 1, name: 'Ana', password: 'secret' }, ['password'])
// { id: 1, name: 'Ana' }

deepEqual({ a: [1, 2] }, { a: [1, 2] })
// true

entriesToObject([['a', 1], ['b', 2]])
// { a: 1, b: 2 }

getExtensibilityInfo({ id: 1 }, 'freeze')
// { isFrozen: true, isSealed: true, isExtensible: false, keys: ['id'] }

safeAccess({}, 'user.profile.name', 'Unknown')
// 'Unknown'
```
