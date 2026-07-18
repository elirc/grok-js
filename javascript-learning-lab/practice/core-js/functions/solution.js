export function invokeWithCallApplyBind(fn, context, args = []) {
  return {
    callResult: fn.call(context, ...args),
    applyResult: fn.apply(context, args),
    bindResult: fn.bind(context)(...args)
  };
}

export function sumRest(...numbers) {
  return numbers.reduce((sum, number) => sum + number, 0);
}

export function partial(fn, ...presetArgs) {
  return function partiallyApplied(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

export function createFluentBuilder(initialState = {}) {
  const state = { ...initialState };

  return {
    set(key, value) {
      state[key] = value;
      return this;
    },
    get(key) {
      return state[key];
    },
    build() {
      return { ...state };
    }
  };
}

export function getThisBindingResults() {
  const object = {
    label: 'object',
    regular() {
      return this.label;
    },
    arrow: () => this?.label
  };

  return {
    regular: object.regular(),
    borrowedRegular: object.regular.call({ label: 'borrowed' }),
    arrow: object.arrow(),
    borrowedArrow: object.arrow.call({ label: 'borrowed' })
  };
}

export function compose(...functions) {
  return function composed(initialValue) {
    return functions.reduceRight((value, fn) => fn(value), initialValue);
  };
}

export function pipe(...functions) {
  return function piped(initialValue) {
    return functions.reduce((value, fn) => fn(value), initialValue);
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

export function before(maxCalls, fn) {
  let calls = 0;
  let lastResult;

  return function runBefore(...args) {
    if (calls < maxCalls) {
      calls += 1;
      lastResult = fn.apply(this, args);
    }
    return lastResult;
  };
}

export function after(minCalls, fn) {
  let calls = 0;

  return function runAfter(...args) {
    calls += 1;
    if (calls >= minCalls) {
      return fn.apply(this, args);
    }
    return undefined;
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
