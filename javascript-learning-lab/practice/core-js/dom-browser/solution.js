export function createElement(tagName, options = {}) {
  const element = document.createElement(tagName);

  if (options.className) {
    element.className = options.className;
  }

  if (options.text !== undefined) {
    element.textContent = String(options.text);
  }

  for (const [name, value] of Object.entries(options.attrs ?? {})) {
    element.setAttribute(name, String(value));
  }

  for (const [name, value] of Object.entries(options.dataset ?? {})) {
    element.dataset[name] = String(value);
  }

  return element;
}

export function delegate(container, selector, eventName, handler) {
  const listener = (event) => {
    const match = event.target.closest(selector);
    if (!match || !container.contains(match)) return;
    handler(event, match);
  };

  container.addEventListener(eventName, listener);
  return () => container.removeEventListener(eventName, listener);
}

export function dispatchCustomEvent(target, eventName, detail = {}) {
  return target.dispatchEvent(
    new CustomEvent(eventName, {
      detail,
      bubbles: true
    })
  );
}

export function readFormData(form) {
  return Object.fromEntries(new FormData(form).entries());
}

export function validateRequiredFields(form, fieldNames) {
  const values = readFormData(form);
  const errors = {};

  for (const fieldName of fieldNames) {
    if (!String(values[fieldName] ?? '').trim()) {
      errors[fieldName] = 'Required';
    }
  }

  return errors;
}

export function debounce(fn, delayMs) {
  let timer;

  return function debounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delayMs);
  };
}

export function throttle(fn, intervalMs, nowFn = () => Date.now()) {
  let lastRun = -Infinity;

  return function throttled(...args) {
    const now = nowFn();
    if (now - lastRun >= intervalMs) {
      lastRun = now;
      return fn.apply(this, args);
    }
    return undefined;
  };
}

export function createStorageWithExpiry(storage = localStorage, nowFn = () => Date.now()) {
  return {
    setJSON(key, value, ttlMs) {
      storage.setItem(key, JSON.stringify({
        value,
        expiresAt: ttlMs == null ? null : nowFn() + ttlMs
      }));
    },
    getJSON(key) {
      const raw = storage.getItem(key);
      if (!raw) return null;

      const record = JSON.parse(raw);
      if (record.expiresAt != null && nowFn() >= record.expiresAt) {
        storage.removeItem(key);
        return null;
      }

      return record.value;
    },
    remove(key) {
      storage.removeItem(key);
    }
  };
}

export function trackOnlineStatus(windowObject = window, callback) {
  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);

  windowObject.addEventListener('online', handleOnline);
  windowObject.addEventListener('offline', handleOffline);

  return () => {
    windowObject.removeEventListener('online', handleOnline);
    windowObject.removeEventListener('offline', handleOffline);
  };
}

export async function copyText(
  text,
  navigatorObject = navigator,
  documentObject = document
) {
  if (navigatorObject.clipboard?.writeText) {
    await navigatorObject.clipboard.writeText(text);
    return true;
  }

  const textarea = documentObject.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  documentObject.body.appendChild(textarea);
  textarea.select();

  const copied = documentObject.execCommand?.('copy') ?? false;
  textarea.remove();
  return copied;
}
