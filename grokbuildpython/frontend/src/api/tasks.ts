// This is almost identical to the JS version.
// The only difference is the base URL if the Python backend runs on a different port.
// The API contract (what fields exist) should be the same across all three projects for learning purposes.

const API_BASE = 'http://localhost:8000/api';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  dueDate: string | null;
  createdAt: string;
}

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${API_BASE}/tasks`);
  const json = await res.json();
  return json.data;
}

export async function createTask(data: any) {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return (await res.json()).data;
}

export async function updateTask(id: number, data: any) {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return (await res.json()).data;
}

export async function deleteTask(id: number) {
  await fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' });
}
