// This React page is intentionally very similar to the one in grokbuildjs.
// The goal is to show that once you learn React + TanStack Query, the frontend looks similar
// regardless of whether the backend is Node, .NET, or Python.
//
// The only real difference is usually the base API URL.

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTasks, createTask, updateTask, deleteTask, Task } from '../api/tasks';

export function TasksPage() {
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Task> }) => updateTask(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const [newTitle, setNewTitle] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    createMutation.mutate({ title: newTitle });
    setNewTitle('');
  };

  const toggleComplete = (task: Task) => {
    updateMutation.mutate({ id: task.id, data: { completed: !task.completed } });
  };

  const handleDelete = (id: number) => {
    if (confirm('Delete this task?')) deleteMutation.mutate(id);
  };

  if (isLoading) return <div className="p-8">Loading tasks...</div>;
  if (error) return <div className="p-8 text-red-500">Failed to load tasks</div>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Tasks (Python Backend)</h1>

      <form onSubmit={handleCreate} className="mb-8 flex gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New task title..."
          className="flex-1 border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Task
        </button>
      </form>

      <div className="space-y-3">
        {tasks.length === 0 && <p className="text-gray-500">No tasks yet.</p>}
        
        {tasks.map((task) => (
          <div key={task.id} className="border p-4 rounded flex justify-between items-start">
            <div className={task.completed ? 'line-through text-gray-400' : ''}>
              {task.title}
            </div>
            <div className="flex gap-2">
              <button onClick={() => toggleComplete(task)} className="text-sm px-3 py-1 border rounded">
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => handleDelete(task.id)} className="text-sm px-3 py-1 border rounded text-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
