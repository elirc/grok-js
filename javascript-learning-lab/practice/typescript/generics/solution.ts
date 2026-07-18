export type ApiResponse<T> = {
  data: T;
  receivedAt: string;
};

export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export function identity<T>(value: T): T {
  return value;
}

export function createApiResponse<T>(
  data: T,
  receivedAt = new Date(0).toISOString()
): ApiResponse<T> {
  return { data, receivedAt };
}

export function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((item) => item[key]);
}

export function groupBy<T, K extends PropertyKey>(
  items: T[],
  keySelector: (item: T) => K
): Record<K, T[]> {
  return items.reduce((groups, item) => {
    const key = keySelector(item);
    groups[key] ??= [];
    groups[key].push(item);
    return groups;
  }, {} as Record<K, T[]>);
}

export function createRepository<T extends { id: string }>(initialItems: T[] = []) {
  const store = new Map(initialItems.map((item) => [item.id, item]));

  return {
    findById(id: string): T | undefined {
      return store.get(id);
    },
    save(item: T): T {
      store.set(item.id, item);
      return item;
    },
    list(): T[] {
      return [...store.values()];
    },
    remove(id: string): boolean {
      return store.delete(id);
    }
  };
}

export function mapResult<T, U, E>(
  result: Result<T, E>,
  mapper: (value: T) => U
): Result<U, E> {
  if (!result.ok) return result;
  return { ok: true, value: mapper(result.value) };
}
