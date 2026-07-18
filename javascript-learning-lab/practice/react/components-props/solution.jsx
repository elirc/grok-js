import React from 'react';

const statusLabels = {
  open: 'Open',
  in_progress: 'In Progress',
  closed: 'Closed'
};

export function StatusBadge({ status }) {
  return (
    <span aria-label={`Status: ${statusLabels[status] ?? status}`} data-status={status}>
      {statusLabels[status] ?? status}
    </span>
  );
}

export function EmptyState({ title = 'No tickets yet', message = 'Create a ticket to get started.' }) {
  return (
    <section aria-label="Empty state">
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
}

export function TicketCard({ ticket, onSelect }) {
  return (
    <article aria-label={`Ticket ${ticket.id}`}>
      <h3>{ticket.title}</h3>
      <StatusBadge status={ticket.status} />
      <p>Priority: {ticket.priority}</p>
      <button type="button" onClick={() => onSelect(ticket.id)}>
        View ticket
      </button>
    </article>
  );
}

export function TicketList({ tickets, onSelect }) {
  if (tickets.length === 0) {
    return <EmptyState />;
  }

  return (
    <section aria-label="Ticket list">
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} onSelect={onSelect} />
      ))}
    </section>
  );
}
