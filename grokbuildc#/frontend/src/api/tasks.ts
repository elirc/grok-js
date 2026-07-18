// Same API client as the other projects.
// Backend port for C# will typically be 5000 or 8080 depending on launch settings.

const API_BASE = 'http://localhost:5000/api';

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
