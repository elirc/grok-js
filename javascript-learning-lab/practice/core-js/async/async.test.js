import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTarget } from '../../helpers/load-target.js';

const asyncLab = await loadTarget(import.meta.url);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

test('withTimeout resolves fast promises and rejects slow ones', async () => {
  assert.equal(await asyncLab.withTimeout(Promise.resolve('ok'), 20), 'ok');
  await assert.rejects(
    asyncLab.withTimeout(new Promise(() => {}), 5, 'Too slow'),
    /Too slow/
  );
});

test('runSequential runs tasks in order', async () => {
  const order = [];
  const tasks = [
    async () => { order.push('a'); return 1; },
    async () => { order.push('b'); return 2; }
  ];

  assert.deepEqual(await asyncLab.runSequential(tasks), [1, 2]);
  assert.deepEqual(order, ['a', 'b']);
});

test('runParallel returns results in task order', async () => {
  const tasks = [
    async () => { await wait(5); return 'first'; },
    async () => 'second'
  ];

  assert.deepEqual(await asyncLab.runParallel(tasks), ['first', 'second']);
});

test('retry keeps trying and eventually returns success', async () => {
  let attempts = 0;
  const result = await asyncLab.retry(async () => {
    attempts += 1;
    if (attempts < 3) throw new Error('not yet');
    return 'done';
  }, 3);

  assert.equal(result, 'done');
  assert.equal(attempts, 3);
});

test('retry throws the final error after attempts run out', async () => {
  await assert.rejects(
    asyncLab.retry(async () => {
      throw new Error('still broken');
    }, 1),
    /still broken/
  );
});

test('concurrencyLimit caps active tasks and preserves result order', async () => {
  let active = 0;
  let maxActive = 0;

  const tasks = [1, 2, 3, 4].map((value) => async () => {
    active += 1;
    maxActive = Math.max(maxActive, active);
    await wait(5);
    active -= 1;
    return value * 2;
  });

  assert.deepEqual(await asyncLab.concurrencyLimit(tasks, 2), [2, 4, 6, 8]);
  assert.equal(maxActive <= 2, true);
  await assert.rejects(() => asyncLab.concurrencyLimit(tasks, 0), RangeError);
});

test('promisify converts error-first callbacks to promises', async () => {
  const callbackApi = (value, callback) => {
    if (value === 'bad') callback(new Error('bad value'));
    else callback(null, value.toUpperCase());
  };

  const promised = asyncLab.promisify(callbackApi);
  assert.equal(await promised('ok'), 'OK');
  await assert.rejects(promised('bad'), /bad value/);
});

test('cancellableOperation exposes an abort signal', async () => {
  const operation = asyncLab.cancellableOperation((signal) =>
    new Promise((resolve, reject) => {
      signal.addEventListener('abort', () => reject(new Error('aborted')));
      setTimeout(() => resolve('done'), 20);
    })
  );

  operation.cancel();
  await assert.rejects(operation.promise, /aborted/);
});

test('debounceAsync rejects replaced calls and resolves the latest call', async () => {
  const debounced = asyncLab.debounceAsync(async (value) => `${value}!`, 5);
  const first = debounced('first').catch((error) => error.message);
  const second = debounced('second');

  assert.equal(await first, 'Debounced by a newer call');
  assert.equal(await second, 'second!');
});

test('allSettledClone returns fulfilled and rejected result objects', async () => {
  const reason = new Error('bad');
  assert.deepEqual(await asyncLab.allSettledClone([Promise.resolve(1), Promise.reject(reason)]), [
    { status: 'fulfilled', value: 1 },
    { status: 'rejected', reason }
  ]);
});

test('sequenceWithReduce runs tasks sequentially', async () => {
  const order = [];
  const tasks = [
    async () => { order.push(1); return 'a'; },
    async () => { order.push(2); return 'b'; }
  ];

  assert.deepEqual(await asyncLab.sequenceWithReduce(tasks), ['a', 'b']);
  assert.deepEqual(order, [1, 2]);
});

test('createTaskQueue processes enqueued tasks with concurrency', async () => {
  const queue = asyncLab.createTaskQueue(2);
  let active = 0;
  let maxActive = 0;

  const makeTask = (value) => async () => {
    active += 1;
    maxActive = Math.max(maxActive, active);
    await wait(5);
    active -= 1;
    return value;
  };

  const results = await Promise.all([
    queue.enqueue(makeTask(1)),
    queue.enqueue(makeTask(2)),
    queue.enqueue(makeTask(3))
  ]);

  assert.deepEqual(results, [1, 2, 3]);
  assert.equal(maxActive <= 2, true);
  assert.equal(queue.size(), 0);
});
