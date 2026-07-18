# DOM and Browser Expected Output

```js
createElement('button', {
  className: 'primary',
  text: 'Save',
  attrs: { type: 'button' },
  dataset: { id: 42 }
})
// <button class="primary" type="button" data-id="42">Save</button>

readFormData(form)
// { email: 'test@example.com', name: 'Ana' }

validateRequiredFields(form, ['email', 'name'])
// {} when both fields are filled
// { email: 'Required' } when email is empty

const storage = createStorageWithExpiry(localStorage)
storage.setJSON('user', { id: 1 }, 1000)
storage.getJSON('user')
// { id: 1 }

dispatchCustomEvent(button, 'saved', { id: 1 })
// triggers listeners for the "saved" event
```
