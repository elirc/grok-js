import {
  assertSupportTicket,
  filterTickets,
  isSupportTicket,
  parseTicketStatus,
  summarizeEvent,
  type SupportTicket,
  type TicketEvent,
  type TicketStatus
} from './solution';

const raw: unknown = {
  id: 'T-100',
  title: 'Password reset is failing',
  status: 'open',
  priority: 'high'
};

if (isSupportTicket(raw)) {
  const ticketId: string = raw.id;
  const status: TicketStatus = raw.status;
  void ticketId;
  void status;
}

assertSupportTicket(raw);
const ticket: SupportTicket = raw;

const parsed = parseTicketStatus('closed');
const status: TicketStatus = parsed;

const events: TicketEvent[] = [
  { type: 'created', ticket },
  { type: 'assigned', ticketId: ticket.id, assignee: 'Sam' },
  { type: 'closed', ticketId: ticket.id, reason: 'Resolved' }
];

const summaries: string[] = events.map(summarizeEvent);
const filtered: SupportTicket[] = filterTickets([raw, { nope: true }]);

// @ts-expect-error invalid status should not be assignable
const invalidStatus: TicketStatus = 'done';

void status;
void summaries;
void filtered;
void invalidStatus;
