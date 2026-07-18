/*
MID-LEVEL GOAL:
Understand how to design React code that is testable and what makes good component tests.

REAL WORLD USE CASE:
- Writing maintainable test suites
- Choosing between unit, integration, and E2E tests
- Testing custom hooks and complex components
- Mocking and test isolation strategies

CONCEPTS COVERED:
- Testing library philosophy (query by role, accessibility)
- Testing custom hooks with renderHook
- Mocking modules, timers, and network
- Component contract vs implementation
- Snapshot testing pros/cons
*/

// ============================================
// STEP 1: Querying the right way
// ============================================

// Good
screen.getByRole('button', { name: /submit/i });

// Bad
screen.getByTestId('submit-btn'); // only when necessary

// ============================================
// STEP 2: Testing behavior, not implementation
// ============================================

test('submitting the form calls onSubmit with values', async () => {
  const handleSubmit = jest.fn();
  render(<LoginForm onSubmit={handleSubmit} />);

  await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
  await userEvent.click(screen.getByRole('button', { name: /log in/i }));

  expect(handleSubmit).toHaveBeenCalledWith({ email: 'test@example.com', password: '' });
});

// ============================================
// STEP 3: Hook testing
// ============================================

import { renderHook, act } from '@testing-library/react';

test('useCounter', () => {
  const { result } = renderHook(() => useCounter(0));

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});

/*
DEEPER BREAKDOWN:

Good tests verify behavior the user can observe.
Avoid testing internal state or implementation details — they make refactors painful.

Testing Library encourages queries that match how users interact with the page.

MID-LEVEL PERSPECTIVE:

Well-tested components are a sign of engineering maturity. Over-testing internals or under-testing user flows both cause pain.

COMMON PITFALLS:

- Heavy reliance on implementation details (state, private methods)
- Not cleaning up after tests (timers, mocks, portals)
- Testing too many things in one test
- Mocking everything instead of using realistic data

EXPERIMENTS:

1. Refactor a component test that queries by test id or class to use semantic queries.
2. Write tests for a custom hook that uses useEffect and async logic.
3. Add tests that simulate error states and loading states.

MID-LEVEL CHALLENGE:

Take one of the earlier mini-projects (todo or dashboard) and write a comprehensive test suite that covers:
- Happy paths
- Error states
- Edge cases (empty data, long lists)
- User interactions
- Accessibility basics

Use only Testing Library best practices.
*/