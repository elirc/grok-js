import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { loadTarget } from '../../helpers/load-target.js';

const ReactPractice = await loadTarget(import.meta.url, 'jsx');

afterEach(() => cleanup());

describe('components and props practice', () => {
  it('renders a human-friendly status badge', () => {
    render(<ReactPractice.StatusBadge status="in_progress" />);

    expect(screen.getByText('In Progress')).toBeTruthy();
    expect(screen.getByLabelText('Status: In Progress')).toBeTruthy();
  });

  it('renders ticket cards and calls parent callbacks', () => {
    const onSelect = vi.fn();
    const ticket = {
      id: 'T-1',
      title: 'Cannot reset password',
      status: 'open',
      priority: 'high'
    };

    render(<ReactPractice.TicketCard ticket={ticket} onSelect={onSelect} />);

    expect(screen.getByRole('heading', { name: 'Cannot reset password' })).toBeTruthy();
    expect(screen.getByText('Priority: high')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: /view ticket/i }));
    expect(onSelect).toHaveBeenCalledWith('T-1');
  });

  it('renders a ticket list or empty state', () => {
    const onSelect = vi.fn();
    const tickets = [
      { id: 'T-1', title: 'Login issue', status: 'open', priority: 'medium' },
      { id: 'T-2', title: 'Billing question', status: 'closed', priority: 'low' }
    ];

    const { rerender } = render(<ReactPractice.TicketList tickets={tickets} onSelect={onSelect} />);
    expect(screen.getByLabelText('Ticket list')).toBeTruthy();
    expect(screen.getByText('Login issue')).toBeTruthy();
    expect(screen.getByText('Billing question')).toBeTruthy();

    rerender(<ReactPractice.TicketList tickets={[]} onSelect={onSelect} />);
    expect(screen.getByLabelText('Empty state')).toBeTruthy();
    expect(screen.getByText('No tickets yet')).toBeTruthy();
  });
});
