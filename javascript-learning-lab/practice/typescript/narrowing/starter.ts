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

export function isTicketStatus(value: unknown): value is TicketStatus {
  throw new Error('isTicketStatus is not implemented yet.');
}

export function isSupportTicket(value: unknown): value is SupportTicket {
  throw new Error('isSupportTicket is not implemented yet.');
}

export function assertSupportTicket(value: unknown): asserts value is SupportTicket {
  throw new Error('assertSupportTicket is not implemented yet.');
}

export function parseTicketStatus(value: unknown): TicketStatus {
  throw new Error('parseTicketStatus is not implemented yet.');
}

export function summarizeEvent(event: TicketEvent): string {
  throw new Error('summarizeEvent is not implemented yet.');
}

export function filterTickets(values: unknown[]): SupportTicket[] {
  throw new Error('filterTickets is not implemented yet.');
}
