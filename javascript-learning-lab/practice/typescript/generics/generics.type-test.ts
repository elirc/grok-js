import {
  createApiResponse,
  createRepository,
  groupBy,
  identity,
  mapResult,
  pluck,
  type ApiResponse,
  type Result
} from './solution';

type Ticket = {
  id: string;
  title: string;
  status: 'open' | 'closed';
  points: number;
};

const ticket: Ticket = {
  id: 'T-1',
  title: 'Login broken',
  status: 'open',
  points: 3
};

const sameTicket: Ticket = identity(ticket);
const response: ApiResponse<Ticket> = createApiResponse(ticket);
const titles: string[] = pluck([ticket], 'title');
const points: number[] = pluck([ticket], 'points');
const grouped: Record<Ticket['status'], Ticket[]> = groupBy([ticket], (item) => item.status);

const repo = createRepository<Ticket>([ticket]);
const found: Ticket | undefined = repo.findById('T-1');
const saved: Ticket = repo.save({ ...ticket, id: 'T-2' });

const result: Result<number, string> = { ok: true, value: 2 };
const mapped: Result<string, string> = mapResult(result, (value) => String(value));

// @ts-expect-error missing id should not work with repository constraint
createRepository([{ title: 'missing id' }]);

// @ts-expect-error unknown key should not be pluckable
pluck([ticket], 'missing');

void sameTicket;
void response;
void titles;
void points;
void grouped;
void found;
void saved;
void mapped;
