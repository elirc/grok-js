function isPlainObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

export function deepClone(value) {
  if (Array.isArray(value)) {
    return value.map((item) => deepClone(item));
  }

  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, deepClone(item)])
    );
  }

  return value;
}

export function deepMerge(target, source) {
  const result = deepClone(target);

  for (const [key, value] of Object.entries(source)) {
    if (isPlainObject(value) && isPlainObject(result[key])) {
      result[key] = deepMerge(result[key], value);
    } else {
      result[key] = deepClone(value);
    }
  }

  return result;
}

export function getPath(object, path, fallback = undefined) {
  const parts = Array.isArray(path) ? path : String(path).split('.').filter(Boolean);
  let current = object;

  for (const part of parts) {
    if (current == null || !Object.hasOwn(Object(current), part)) {
      return fallback;
    }
    current = current[part];
  }

  return current;
}

export function objectToQueryString(object) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(object)) {
    if (value === undefined) continue;
    params.set(key, value === null ? '' : String(value));
  }

  return params.toString();
}

export function queryStringToObject(queryString) {
  const trimmed = queryString.startsWith('?') ? queryString.slice(1) : queryString;
  return Object.fromEntries(new URLSearchParams(trimmed).entries());
}

export function countByProperty(array, property) {
  return array.reduce((counts, item) => {
    const key = String(item[property]);
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});
}

export function pick(object, keys) {
  const result = {};
  for (const key of keys) {
    if (Object.hasOwn(object, key)) {
      result[key] = object[key];
    }
  }
  return result;
}

export function omit(object, keys) {
  const blocked = new Set(keys);
  return Object.fromEntries(
    Object.entries(object).filter(([key]) => !blocked.has(key))
  );
}

export function deepEqual(left, right) {
  if (Object.is(left, right)) return true;
  if (typeof left !== typeof right) return false;
  if (left == null || right == null) return false;

  if (Array.isArray(left) || Array.isArray(right)) {
    if (!Array.isArray(left) || !Array.isArray(right)) return false;
    if (left.length !== right.length) return false;
    return left.every((item, index) => deepEqual(item, right[index]));
  }

  if (isPlainObject(left) && isPlainObject(right)) {
    const leftKeys = Object.keys(left);
    const rightKeys = Object.keys(right);
    if (leftKeys.length !== rightKeys.length) return false;
    return leftKeys.every((key) => Object.hasOwn(right, key) && deepEqual(left[key], right[key]));
  }

  return false;
}

export function entriesToObject(entries) {
  return Object.fromEntries(entries);
}

export function objectToEntries(object) {
  return Object.entries(object);
}

export function getExtensibilityInfo(object, mode = 'none') {
  const copy = { ...object };

  if (mode === 'freeze') Object.freeze(copy);
  if (mode === 'seal') Object.seal(copy);
  if (mode === 'preventExtensions') Object.preventExtensions(copy);

  return {
    isFrozen: Object.isFrozen(copy),
    isSealed: Object.isSealed(copy),
    isExtensible: Object.isExtensible(copy),
    keys: Object.keys(copy)
  };
}

export function safeAccess(object, path, fallback = undefined) {
  return getPath(object, path, fallback);
}
