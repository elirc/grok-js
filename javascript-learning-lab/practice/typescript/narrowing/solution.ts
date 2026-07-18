export type TicketStatus = 'open' | 'in_progress' | 'closed';

export type SupportTicket = {
  id: string;
  title: string;
  status: TicketStatus;
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
};

export type TicketEvent =
  | { type: 'created'; ticket: SupportTicket }
  | { type: 'assigned'; ticketId: string; assignee: string }
  | { type: 'closed'; ticketId: string; reason: string };

const statuses = new Set<TicketStatus>(['open', 'in_progress', 'closed']);
const priorities = new Set<SupportTicket['priority']>(['low', 'medium', 'high']);

export function isTicketStatus(value: unknown): value is TicketStatus {
  return typeof value === 'string' && statuses.has(value as TicketStatus);
}

export function isSupportTicket(value: unknown): value is SupportTicket {
  if (typeof value !== 'object' || value === null) return false;

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    isTicketStatus(candidate.status) &&
    typeof candidate.priority === 'string' &&
    priorities.has(candidate.priority as SupportTicket['priority']) &&
    (candidate.assignee === undefined || typeof candidate.assignee === 'string')
  );
}

export function assertSupportTicket(value: unknown): asserts value is SupportTicket {
  if (!isSupportTicket(value)) {
    throw new Error('Expected a valid support ticket');
  }
}

export function parseTicketStatus(value: unknown): TicketStatus {
  if (!isTicketStatus(value)) {
    throw new Error(`Unknown ticket status: ${String(value)}`);
  }
  return value;
}

export function summarizeEvent(event: TicketEvent): string {
  switch (event.type) {
    case 'created':
      return `Created ticket ${event.ticket.id}: ${event.ticket.title}`;
    case 'assigned':
      return `Assigned ticket ${event.ticketId} to ${event.assignee}`;
    case 'closed':
      return `Closed ticket ${event.ticketId}: ${event.reason}`;
    default: {
      const exhaustive: never = event;
      return exhaustive;
    }
  }
}

export function filterTickets(values: unknown[]): SupportTicket[] {
  return values.filter(isSupportTicket);
}
