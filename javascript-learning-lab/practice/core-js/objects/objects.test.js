import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTarget } from '../../helpers/load-target.js';

const objects = await loadTarget(import.meta.url);

test('deepClone copies nested arrays and objects without sharing references', () => {
  const original = { user: { name: 'Ana', tags: ['js'] } };
  const clone = objects.deepClone(original);

  assert.deepEqual(clone, original);
  assert.notEqual(clone, original);
  assert.notEqual(clone.user, original.user);
  assert.notEqual(clone.user.tags, original.user.tags);
});

test('deepMerge merges nested objects and leaves inputs alone', () => {
  const target = { user: { name: 'Ana', role: 'user' }, flags: ['a'] };
  const source = { user: { role: 'admin' }, flags: ['b'] };

  assert.deepEqual(objects.deepMerge(target, source), {
    user: { name: 'Ana', role: 'admin' },
    flags: ['b']
  });
  assert.deepEqual(target.flags, ['a']);
});

test('getPath and safeAccess read nested data with fallbacks', () => {
  const data = { user: { profile: { city: 'Austin' } } };
  assert.equal(objects.getPath(data, 'user.profile.city'), 'Austin');
  assert.equal(objects.getPath(data, ['user', 'missing'], 'N/A'), 'N/A');
  assert.equal(objects.safeAccess({}, 'user.profile.name', 'Unknown'), 'Unknown');
});

test('query string helpers encode and decode simple objects', () => {
  assert.equal(objects.objectToQueryString({ page: 2, q: 'js lab', skip: undefined }), 'page=2&q=js+lab');
  assert.deepEqual(objects.queryStringToObject('?page=2&q=js+lab'), { page: '2', q: 'js lab' });
});

test('countByProperty counts values as object keys', () => {
  const users = [{ role: 'admin' }, { role: 'user' }, { role: 'admin' }];
  assert.deepEqual(objects.countByProperty(users, 'role'), { admin: 2, user: 1 });
});

test('pick and omit create new filtered objects', () => {
  const user = { id: 1, name: 'Ana', password: 'secret' };
  assert.deepEqual(objects.pick(user, ['id', 'name', 'missing']), { id: 1, name: 'Ana' });
  assert.deepEqual(objects.omit(user, ['password']), { id: 1, name: 'Ana' });
});

test('deepEqual compares nested arrays and objects', () => {
  assert.equal(objects.deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] }), true);
  assert.equal(objects.deepEqual({ a: [1, 2] }, { a: [2, 1] }), false);
});

test('entries conversion mirrors Object.entries and Object.fromEntries', () => {
  const entries = [['a', 1], ['b', 2]];
  assert.deepEqual(objects.entriesToObject(entries), { a: 1, b: 2 });
  assert.deepEqual(objects.objectToEntries({ a: 1, b: 2 }), entries);
});

test('getExtensibilityInfo reports freeze, seal, and preventExtensions effects', () => {
  assert.deepEqual(objects.getExtensibilityInfo({ id: 1 }, 'freeze'), {
    isFrozen: true,
    isSealed: true,
    isExtensible: false,
    keys: ['id']
  });

  assert.equal(objects.getExtensibilityInfo({ id: 1 }, 'seal').isSealed, true);
  assert.equal(objects.getExtensibilityInfo({ id: 1 }, 'preventExtensions').isExtensible, false);
});
