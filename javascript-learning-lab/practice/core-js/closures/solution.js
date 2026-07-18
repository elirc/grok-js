export function createCounter(initialValue = 0, step = 1) {
  let count = initialValue;

  return {
    increment() {
      count += step;
      return count;
    },
    decrement() {
      count -= step;
      return count;
    },
    reset() {
      count = initialValue;
      return count;
    },
    get() {
      return count;
    }
  };
}

export function once(fn) {
  let called = false;
  let result;

  return function runOnce(...args) {
    if (called) return result;
    called = true;
    result = fn.apply(this, args);
    return result;
  };
}

export function createBankAccount(initialBalance = 0) {
  let balance = initialBalance;

  function assertPositive(amount) {
    if (typeof amount !== 'number' || amount <= 0) {
      throw new RangeError('amount must be a positive number');
    }
  }

  return {
    deposit(amount) {
      assertPositive(amount);
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      assertPositive(amount);
      if (amount > balance) {
        throw new Error('Insufficient funds');
      }
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    }
  };
}

export function createLoopHandlers(count) {
  const handlers = [];

  for (let i = 0; i < count; i += 1) {
    handlers.push(() => i);
  }

  return handlers;
}

export function createEventEmitter() {
  const listeners = new Map();

  return {
    on(eventName, handler) {
      if (!listeners.has(eventName)) {
        listeners.set(eventName, new Set());
      }
      listeners.get(eventName).add(handler);
      return () => this.off(eventName, handler);
    },
    off(eventName, handler) {
      listeners.get(eventName)?.delete(handler);
    },
    emit(eventName, payload) {
      return [...(listeners.get(eventName) ?? [])].map((handler) => handler(payload));
    }
  };
}

export function memoize(fn, keyFn = (...args) => JSON.stringify(args)) {
  const cache = new Map();

  return function memoized(...args) {
    const key = keyFn(...args);
    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

export function createRateLimiter(maxCalls, windowMs, nowFn = () => Date.now()) {
  const timestamps = [];

  return function canRun() {
    const now = nowFn();
    while (timestamps.length > 0 && now - timestamps[0] >= windowMs) {
      timestamps.shift();
    }

    if (timestamps.length >= maxCalls) {
      return false;
    }

    timestamps.push(now);
    return true;
  };
}

export function curry(fn, arity = fn.length) {
  return function curried(...args) {
    if (args.length >= arity) {
      return fn(...args);
    }

    return (...nextArgs) => curried(...args, ...nextArgs);
  };
}

export function createTemperature(initialValue, options = {}) {
  const min = options.min ?? -50;
  const max = options.max ?? 150;
  let value = initialValue;

  function assertInRange(nextValue) {
    if (nextValue < min || nextValue > max) {
      throw new RangeError(`temperature must be between ${min} and ${max}`);
    }
  }

  assertInRange(value);

  return {
    get() {
      return value;
    },
    set(nextValue) {
      assertInRange(nextValue);
      value = nextValue;
      return value;
    }
  };
}

export function createTodoStore(initialTodos = []) {
  let todos = initialTodos.map((todo) => ({ ...todo }));
  let nextId = todos.reduce((max, todo) => Math.max(max, todo.id ?? 0), 0) + 1;

  return {
    add(text) {
      const todo = { id: nextId, text, completed: false };
      nextId += 1;
      todos = [...todos, todo];
      return { ...todo };
    },
    remove(id) {
      todos = todos.filter((todo) => todo.id !== id);
    },
    toggle(id) {
      todos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      return todos.find((todo) => todo.id === id);
    },
    list() {
      return todos.map((todo) => ({ ...todo }));
    }
  };
}
