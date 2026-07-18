# Components and Props Expected Behavior

```jsx
<StatusBadge status="in_progress" />
// Renders: In Progress
// Has accessible label: Status: In Progress

<TicketCard ticket={ticket} onSelect={handleSelect} />
// Renders ticket title, status, priority, and a "View ticket" button.
// Clicking the button calls handleSelect(ticket.id).

<TicketList tickets={[]} onSelect={handleSelect} />
// Renders the empty state.
```
