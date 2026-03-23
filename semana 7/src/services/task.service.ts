import type { Task } from '../types/Task.js';


let tasks: Task[] = [];

export const TaskService = {
  getAll: (completed?: string) => {
    if (completed) {
      const isCompleted = completed === 'true';
      return tasks.filter(t => t.completed === isCompleted);
    }
    return tasks;
  },

  getById: (id: string) => tasks.find(t => t.id === id),

  create: (title: string) => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      completed: false
    };
    tasks.push(newTask);
    return newTask;
  },

  update: (id: string, data: Partial<Task>) => {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return null;
    
    tasks[index] = { ...tasks[index], ...data } as Task;
    return tasks[index];
  },

  delete: (id: string) => {
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id !== id);
    return tasks.length !== initialLength;
  }
};