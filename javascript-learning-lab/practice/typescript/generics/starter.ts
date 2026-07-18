export type ApiResponse<T> = {
  data: T;
  receivedAt: string;
};

export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export function identity<T>(value: T): T {
  throw new Error('identity is not implemented yet.');
}

export function createApiResponse<T>(data: T, receivedAt?: string): ApiResponse<T> {
  throw new Error('createApiResponse is not implemented yet.');
}

export function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  throw new Error('pluck is not implemented yet.');
}

export function groupBy<T, K extends PropertyKey>(
  items: T[],
  keySelector: (item: T) => K
): Record<K, T[]> {
  throw new Error('groupBy is not implemented yet.');
}

export function createRepository<T extends { id: string }>(initialItems?: T[]) {
  throw new Error('createRepository is not implemented yet.');
}

export function mapResult<T, U, E>(result: Result<T, E>, mapper: (value: T) => U): Result<U, E> {
  throw new Error('mapResult is not implemented yet.');
}
