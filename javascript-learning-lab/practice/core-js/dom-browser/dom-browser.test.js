import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { loadTarget } from '../../helpers/load-target.js';

const domLab = await loadTarget(import.meta.url);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function installDom(html = '<!doctype html><html><body></body></html>') {
  const dom = new JSDOM(html, { url: 'https://example.test' });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.CustomEvent = dom.window.CustomEvent;
  globalThis.Event = dom.window.Event;
  globalThis.FormData = dom.window.FormData;
  globalThis.localStorage = dom.window.localStorage;
  return dom;
}

test('createElement creates text, class, attributes, and dataset', () => {
  installDom();

  const button = domLab.createElement('button', {
    className: 'primary',
    text: 'Save',
    attrs: { type: 'button', 'aria-label': 'Save item' },
    dataset: { id: 42 }
  });

  assert.equal(button.tagName, 'BUTTON');
  assert.equal(button.className, 'primary');
  assert.equal(button.textContent, 'Save');
  assert.equal(button.getAttribute('type'), 'button');
  assert.equal(button.getAttribute('aria-label'), 'Save item');
  assert.equal(button.dataset.id, '42');
});

test('delegate handles matching children and cleanup removes the listener', () => {
  installDom('<!doctype html><html><body><div id="list"><button data-id="1"><span>Open</span></button></div></body></html>');

  const list = document.querySelector('#list');
  const span = document.querySelector('span');
  const seen = [];

  const cleanup = domLab.delegate(list, 'button[data-id]', 'click', (_event, button) => {
    seen.push(button.dataset.id);
  });

  span.dispatchEvent(new Event('click', { bubbles: true }));
  cleanup();
  span.dispatchEvent(new Event('click', { bubbles: true }));

  assert.deepEqual(seen, ['1']);
});

test('dispatchCustomEvent dispatches a bubbling CustomEvent with detail', () => {
  installDom('<!doctype html><html><body><button id="save"></button></body></html>');

  const button = document.querySelector('#save');
  let received;
  document.body.addEventListener('saved', (event) => {
    received = event.detail;
  });

  assert.equal(domLab.dispatchCustomEvent(button, 'saved', { id: 1 }), true);
  assert.deepEqual(received, { id: 1 });
});

test('readFormData and validateRequiredFields handle simple forms', () => {
  installDom(`
    <!doctype html>
    <html><body>
      <form id="signup">
        <input name="email" value="test@example.com">
        <input name="name" value="">
      </form>
    </body></html>
  `);

  const form = document.querySelector('#signup');
  assert.deepEqual(domLab.readFormData(form), {
    email: 'test@example.com',
    name: ''
  });
  assert.deepEqual(domLab.validateRequiredFields(form, ['email', 'name']), {
    name: 'Required'
  });
});

test('debounce runs only the final call after quiet period', async () => {
  installDom();

  const seen = [];
  const debounced = domLab.debounce((value) => seen.push(value), 5);
  debounced('first');
  debounced('second');

  await wait(10);
  assert.deepEqual(seen, ['second']);
});

test('throttle runs immediately and suppresses calls inside interval', () => {
  let now = 0;
  let calls = 0;
  const throttled = domLab.throttle(() => {
    calls += 1;
    return calls;
  }, 100, () => now);

  assert.equal(throttled(), 1);
  now = 50;
  assert.equal(throttled(), undefined);
  now = 100;
  assert.equal(throttled(), 2);
});

test('createStorageWithExpiry stores JSON and expires old values', () => {
  installDom();

  let now = 1000;
  const storage = domLab.createStorageWithExpiry(localStorage, () => now);
  storage.setJSON('user', { id: 1 }, 500);

  assert.deepEqual(storage.getJSON('user'), { id: 1 });
  now = 1500;
  assert.equal(storage.getJSON('user'), null);
  assert.equal(localStorage.getItem('user'), null);
});

test('trackOnlineStatus reports events and cleans up', () => {
  const dom = installDom();
  const statuses = [];
  const cleanup = domLab.trackOnlineStatus(dom.window, (status) => statuses.push(status));

  dom.window.dispatchEvent(new Event('offline'));
  dom.window.dispatchEvent(new Event('online'));
  cleanup();
  dom.window.dispatchEvent(new Event('offline'));

  assert.deepEqual(statuses, [false, true]);
});

test('copyText uses Clipboard API when available', async () => {
  installDom();

  const copied = [];
  const fakeNavigator = {
    clipboard: {
      async writeText(text) {
        copied.push(text);
      }
    }
  };

  assert.equal(await domLab.copyText('hello', fakeNavigator, document), true);
  assert.deepEqual(copied, ['hello']);
});

test('copyText falls back to execCommand when Clipboard API is missing', async () => {
  installDom();

  let command;
  document.execCommand = (value) => {
    command = value;
    return true;
  };

  assert.equal(await domLab.copyText('fallback', {}, document), true);
  assert.equal(command, 'copy');
  assert.equal(document.querySelector('textarea'), null);
});
