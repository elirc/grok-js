import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTarget } from '../../helpers/load-target.js';

const closures = await loadTarget(import.meta.url);

test('createCounter keeps private count and supports reset', () => {
  const counter = closures.createCounter(10, 2);
  assert.equal(counter.get(), 10);
  assert.equal(counter.increment(), 12);
  assert.equal(counter.decrement(), 10);
  assert.equal(counter.reset(), 10);
});

test('once runs a function only once', () => {
  let calls = 0;
  const init = closures.once((value) => {
    calls += 1;
    return value * 2;
  });

  assert.equal(init(5), 10);
  assert.equal(init(10), 10);
  assert.equal(calls, 1);
});

test('createBankAccount keeps balance private and rejects bad withdrawals', () => {
  const account = closures.createBankAccount(100);
  assert.equal(account.deposit(25), 125);
  assert.equal(account.withdraw(50), 75);
  assert.equal(account.getBalance(), 75);
  assert.throws(() => account.withdraw(100), /Insufficient/);
});

test('createLoopHandlers captures each loop value separately', () => {
  assert.deepEqual(closures.createLoopHandlers(4).map((handler) => handler()), [0, 1, 2, 3]);
});

test('createEventEmitter supports on, off, emit, and unsubscribe', () => {
  const emitter = closures.createEventEmitter();
  const seen = [];
  const unsubscribe = emitter.on('saved', (item) => {
    seen.push(item.id);
    return item.id;
  });

  assert.deepEqual(emitter.emit('saved', { id: 1 }), [1]);
  unsubscribe();
  assert.deepEqual(emitter.emit('saved', { id: 2 }), []);
  assert.deepEqual(seen, [1]);
});

test('memoize caches by arguments', () => {
  let calls = 0;
  const double = closures.memoize((number) => {
    calls += 1;
    return number * 2;
  });

  assert.equal(double(4), 8);
  assert.equal(double(4), 8);
  assert.equal(double(5), 10);
  assert.equal(calls, 2);
});

test('createRateLimiter allows only max calls inside a window', () => {
  let now = 0;
  const limited = closures.createRateLimiter(2, 1000, () => now);

  assert.equal(limited(), true);
  assert.equal(limited(), true);
  assert.equal(limited(), false);
  now = 1000;
  assert.equal(limited(), true);
});

test('curry collects arguments over multiple calls', () => {
  assert.equal(closures.curry((a, b, c) => a + b + c)(1)(2)(3), 6);
});

test('createTemperature validates private state', () => {
  const temp = closures.createTemperature(70, { min: 0, max: 100 });
  assert.equal(temp.get(), 70);
  assert.equal(temp.set(80), 80);
  assert.throws(() => temp.set(120), RangeError);
  assert.equal(temp.get(), 80);
});

test('createTodoStore protects internal todo array', () => {
  const store = closures.createTodoStore([{ id: 1, text: 'Learn', completed: false }]);
  const added = store.add('Practice');

  assert.deepEqual(added, { id: 2, text: 'Practice', completed: false });
  assert.equal(store.toggle(1).completed, true);

  const todos = store.list();
  todos[0].text = 'Changed outside';
  assert.equal(store.list()[0].text, 'Learn');

  store.remove(2);
  assert.deepEqual(store.list().map((todo) => todo.id), [1]);
});
