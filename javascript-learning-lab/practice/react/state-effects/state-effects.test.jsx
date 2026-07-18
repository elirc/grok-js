import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { loadTarget } from '../../helpers/load-target.js';

const ReactPractice = await loadTarget(import.meta.url, 'jsx');

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe('state and effects practice', () => {
  it('derives ticket counts', () => {
    expect(ReactPractice.getTicketCounts([
      { status: 'open' },
      { status: 'closed' },
      { status: 'open' }
    ])).toEqual({
      total: 3,
      open: 2,
      in_progress: 0,
      closed: 1
    });
  });

  it('filters tickets by status', () => {
    const tickets = [
      { id: 'T-1', status: 'open' },
      { id: 'T-2', status: 'closed' }
    ];

    expect(ReactPractice.filterTickets(tickets, 'all')).toHaveLength(2);
    expect(ReactPractice.filterTickets(tickets, 'closed')).toEqual([{ id: 'T-2', status: 'closed' }]);
  });

  it('renders dashboard, filters tickets, and creates a ticket', () => {
    render(<ReactPractice.TicketDashboard storageKey="test-tickets" />);

    expect(screen.getByLabelText('Ticket dashboard')).toBeTruthy();
    expect(screen.getByLabelText('Ticket counts').textContent).toContain('Total: 2');
    expect(screen.getByText('Login problem')).toBeTruthy();
    expect(screen.getByText('Invoice request')).toBeTruthy();

    fireEvent.change(screen.getByLabelText('Status filter'), { target: { value: 'closed' } });
    const list = screen.getByLabelText('Visible tickets');
    expect(within(list).queryByText('Login problem')).toBeNull();
    expect(within(list).getByText('Invoice request')).toBeTruthy();

    fireEvent.change(screen.getByLabelText('Status filter'), { target: { value: 'all' } });
    fireEvent.change(screen.getByLabelText('Ticket title'), {
      target: { value: 'Cannot export report' }
    });
    fireEvent.click(screen.getByRole('button', { name: /create ticket/i }));

    expect(screen.getByText('Cannot export report')).toBeTruthy();
    expect(screen.getByLabelText('Ticket counts').textContent).toContain('Total: 3');
    expect(window.localStorage.getItem('test-tickets')).toContain('Cannot export report');
  });
});
