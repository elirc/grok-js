import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTarget } from '../../helpers/load-target.js';

const functions = await loadTarget(import.meta.url);

test('invokeWithCallApplyBind invokes a function three context-aware ways', () => {
  function greet(ending) {
    return `${this.name}${ending}`;
  }

  assert.deepEqual(functions.invokeWithCallApplyBind(greet, { name: 'Ana' }, ['!']), {
    callResult: 'Ana!',
    applyResult: 'Ana!',
    bindResult: 'Ana!'
  });
});

test('sumRest sums any number of arguments', () => {
  assert.equal(functions.sumRest(1, 2, 3), 6);
  assert.equal(functions.sumRest(), 0);
});

test('partial presets initial arguments', () => {
  const join = (a, b, c) => `${a}-${b}-${c}`;
  assert.equal(functions.partial(join, 'a', 'b')('c'), 'a-b-c');
});

test('createFluentBuilder supports chaining and returns copies', () => {
  const builder = functions.createFluentBuilder({ active: true });
  const result = builder.set('name', 'Ana').set('role', 'admin').build();

  assert.deepEqual(result, { active: true, name: 'Ana', role: 'admin' });
  result.name = 'Changed';
  assert.equal(builder.get('name'), 'Ana');
});

test('getThisBindingResults shows regular function this vs arrow function this', () => {
  assert.deepEqual(functions.getThisBindingResults(), {
    regular: 'object',
    borrowedRegular: 'borrowed',
    arrow: undefined,
    borrowedArrow: undefined
  });
});

test('compose runs right-to-left and pipe runs left-to-right', () => {
  const double = (n) => n * 2;
  const addOne = (n) => n + 1;

  assert.equal(functions.compose(double, addOne)(3), 8);
  assert.equal(functions.pipe(addOne, double)(3), 8);
});

test('once runs only once and returns cached result', () => {
  let calls = 0;
  const init = functions.once(() => {
    calls += 1;
    return 'created';
  });

  assert.equal(init(), 'created');
  assert.equal(init(), 'created');
  assert.equal(calls, 1);
});

test('before and after gate function calls', () => {
  let beforeCalls = 0;
  const firstTwo = functions.before(2, () => {
    beforeCalls += 1;
    return beforeCalls;
  });

  assert.equal(firstTwo(), 1);
  assert.equal(firstTwo(), 2);
  assert.equal(firstTwo(), 2);
  assert.equal(beforeCalls, 2);

  let afterCalls = 0;
  const afterThree = functions.after(3, () => {
    afterCalls += 1;
    return afterCalls;
  });

  assert.equal(afterThree(), undefined);
  assert.equal(afterThree(), undefined);
  assert.equal(afterThree(), 1);
});

test('curry collects arguments until arity is met', () => {
  const addThree = (a, b, c) => a + b + c;
  assert.equal(functions.curry(addThree)(1)(2)(3), 6);
  assert.equal(functions.curry(addThree)(1, 2)(3), 6);
});
