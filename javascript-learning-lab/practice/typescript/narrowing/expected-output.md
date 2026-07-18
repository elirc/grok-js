# Narrowing Expected Output

```ts
isTicketStatus('open')
// true

isSupportTicket({
  id: 'T-100',
  title: 'Password reset is failing',
  status: 'open',
  priority: 'high'
})
// true

parseTicketStatus('closed')
// 'closed'

summarizeEvent({ type: 'assigned', ticketId: 'T-100', assignee: 'Sam' })
// 'Assigned ticket T-100 to Sam'
```
