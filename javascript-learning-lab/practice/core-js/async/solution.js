export function withTimeout(promise, ms, message = 'Timeout') {
  let timer;

  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(message)), ms);
  });

  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

export async function runSequential(tasks) {
  const results = [];
  for (const task of tasks) {
    results.push(await task());
  }
  return results;
}

export function runParallel(tasks) {
  return Promise.all(tasks.map((task) => task()));
}

export async function retry(fn, retries = 3, delayMs = 0) {
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < retries && delayMs > 0) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError;
}

export async function concurrencyLimit(tasks, limit) {
  if (!Number.isInteger(limit) || limit <= 0) {
    throw new RangeError('limit must be a positive integer');
  }

  const results = [];
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < tasks.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await tasks[currentIndex]();
    }
  }

  const workers = Array.from({ length: Math.min(limit, tasks.length) }, worker);
  await Promise.all(workers);
  return results;
}

export function promisify(fn) {
  return (...args) => new Promise((resolve, reject) => {
    fn(...args, (error, value) => {
      if (error) {
        reject(error);
      } else {
        resolve(value);
      }
    });
  });
}

export function cancellableOperation(task) {
  const controller = new AbortController();
  let promise;

  try {
    promise = Promise.resolve(task(controller.signal));
  } catch (error) {
    promise = Promise.reject(error);
  }

  return {
    promise,
    cancel() {
      controller.abort();
    }
  };
}

export function debounceAsync(fn, delayMs) {
  let timer;
  let rejectPrevious;

  return (...args) => {
    clearTimeout(timer);
    if (rejectPrevious) {
      rejectPrevious(new Error('Debounced by a newer call'));
    }

    return new Promise((resolve, reject) => {
      rejectPrevious = reject;
      timer = setTimeout(async () => {
        timer = undefined;
        rejectPrevious = undefined;

        try {
          resolve(await fn(...args));
        } catch (error) {
          reject(error);
        }
      }, delayMs);
    });
  };
}

export function allSettledClone(promises) {
  return Promise.all(
    promises.map((promise) =>
      Promise.resolve(promise).then(
        (value) => ({ status: 'fulfilled', value }),
        (reason) => ({ status: 'rejected', reason })
      )
    )
  );
}

export function sequenceWithReduce(tasks) {
  return tasks.reduce(
    (chain, task) => chain.then((results) =>
      Promise.resolve(task()).then((result) => [...results, result])
    ),
    Promise.resolve([])
  );
}

export function createTaskQueue(concurrency = 1) {
  const queue = [];
  let active = 0;

  function runNext() {
    while (active < concurrency && queue.length > 0) {
      const item = queue.shift();
      active += 1;

      Promise.resolve()
        .then(item.task)
        .then(item.resolve, item.reject)
        .finally(() => {
          active -= 1;
          runNext();
        });
    }
  }

  return {
    enqueue(task) {
      return new Promise((resolve, reject) => {
        queue.push({ task, resolve, reject });
        runNext();
      });
    },
    size() {
      return queue.length;
    },
    activeCount() {
      return active;
    }
  };
}
