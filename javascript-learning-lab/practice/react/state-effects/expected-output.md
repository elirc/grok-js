# State and Effects Expected Behavior

```jsx
getTicketCounts([
  { status: 'open' },
  { status: 'closed' },
  { status: 'open' }
])
// { total: 3, open: 2, in_progress: 0, closed: 1 }

filterTickets(tickets, 'closed')
// only closed tickets

<TicketDashboard />
// Shows ticket counts, a status filter, a create-ticket form, and visible tickets.
// Creating a ticket updates the list and persists to localStorage.
```
