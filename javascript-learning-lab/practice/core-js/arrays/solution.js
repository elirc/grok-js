export function removeValue(array, value) {
  return array.filter((item) => item !== value);
}

export function chunkArray(array, size) {
  if (!Number.isInteger(size) || size <= 0) {
    throw new RangeError('size must be a positive integer');
  }

  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function moveZerosToEnd(array) {
  const nonZeros = array.filter((item) => item !== 0);
  const zeros = array.filter((item) => item === 0);
  return [...nonZeros, ...zeros];
}

export function mostFrequent(array) {
  if (array.length === 0) return undefined;

  const counts = new Map();
  let bestValue = array[0];
  let bestCount = 0;

  for (const item of array) {
    const nextCount = (counts.get(item) ?? 0) + 1;
    counts.set(item, nextCount);

    if (nextCount > bestCount) {
      bestValue = item;
      bestCount = nextCount;
    }
  }

  return bestValue;
}

export function flattenDeep(array) {
  const flattened = [];

  for (const item of array) {
    if (Array.isArray(item)) {
      flattened.push(...flattenDeep(item));
    } else {
      flattened.push(item);
    }
  }

  return flattened;
}

export function myMap(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i += 1) {
    result.push(callback(array[i], i, array));
  }
  return result;
}

export function myFilter(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i += 1) {
    if (callback(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}

export function myReduce(array, callback, initialValue) {
  const hasInitial = arguments.length >= 3;

  if (!hasInitial && array.length === 0) {
    throw new TypeError('Reduce of empty array with no initial value');
  }

  let accumulator = hasInitial ? initialValue : array[0];
  let startIndex = hasInitial ? 0 : 1;

  for (let i = startIndex; i < array.length; i += 1) {
    accumulator = callback(accumulator, array[i], i, array);
  }

  return accumulator;
}

export function rotateArray(array, steps) {
  if (array.length === 0) return [];

  const normalized = ((steps % array.length) + array.length) % array.length;
  if (normalized === 0) return [...array];

  return [
    ...array.slice(array.length - normalized),
    ...array.slice(0, array.length - normalized)
  ];
}

export function groupBy(array, keyOrCallback) {
  return array.reduce((groups, item) => {
    const key = typeof keyOrCallback === 'function'
      ? keyOrCallback(item)
      : item[keyOrCallback];

    if (!Object.hasOwn(groups, key)) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});
}

export function uniquePreserveOrder(array) {
  const seen = new Set();
  const result = [];

  for (const item of array) {
    if (!seen.has(item)) {
      seen.add(item);
      result.push(item);
    }
  }

  return result;
}

export function secondLargest(array) {
  let largest = -Infinity;
  let second = -Infinity;

  for (const value of array) {
    if (typeof value !== 'number' || Number.isNaN(value)) continue;
    if (value === largest || value === second) continue;

    if (value > largest) {
      second = largest;
      largest = value;
    } else if (value > second) {
      second = value;
    }
  }

  return second === -Infinity ? undefined : second;
}
