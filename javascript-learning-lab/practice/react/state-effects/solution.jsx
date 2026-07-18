import React, { useEffect, useMemo, useState } from 'react';

export function getTicketCounts(tickets) {
  return tickets.reduce(
    (counts, ticket) => {
      counts.total += 1;
      counts[ticket.status] = (counts[ticket.status] ?? 0) + 1;
      return counts;
    },
    { total: 0, open: 0, in_progress: 0, closed: 0 }
  );
}

export function filterTickets(tickets, statusFilter) {
  if (statusFilter === 'all') return tickets;
  return tickets.filter((ticket) => ticket.status === statusFilter);
}

export function useLocalStorageState(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export function TicketDashboard({ storageKey = 'react-practice-tickets' }) {
  const [tickets, setTickets] = useLocalStorageState(storageKey, [
    { id: 'T-1', title: 'Login problem', status: 'open' },
    { id: 'T-2', title: 'Invoice request', status: 'closed' }
  ]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [title, setTitle] = useState('');

  const visibleTickets = useMemo(
    () => filterTickets(tickets, statusFilter),
    [tickets, statusFilter]
  );
  const counts = useMemo(() => getTicketCounts(tickets), [tickets]);

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    setTickets((current) => [
      ...current,
      {
        id: `T-${current.length + 1}`,
        title: trimmedTitle,
        status: 'open'
      }
    ]);
    setTitle('');
  }

  return (
    <section aria-label="Ticket dashboard">
      <p aria-label="Ticket counts">
        Total: {counts.total} | Open: {counts.open} | Closed: {counts.closed}
      </p>

      <label>
        Status filter
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </label>

      <form onSubmit={handleSubmit}>
        <label>
          Ticket title
          <input value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <button type="submit">Create ticket</button>
      </form>

      <ul aria-label="Visible tickets">
        {visibleTickets.map((ticket) => (
          <li key={ticket.id}>{ticket.title}</li>
        ))}
      </ul>
    </section>
  );
}
