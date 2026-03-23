import type { Request, Response } from 'express';
import { TaskService } from '../services/task.service.js';

export const TaskController = {
  list: (req: Request, res: Response) => {
    const { completed } = req.query; // Desafio Extra: Filtro
    const tasks = TaskService.getAll(completed as string);
    res.status(200).json(tasks);
  },

  show: (req: Request, res: Response) => {
    const { id } = req.params;
    const task = TaskService.getById(id as string);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(task);
  },

  create: (req: Request, res: Response) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });
    const newTask = TaskService.create(title);
    res.status(201).json(newTask);
  },

  update: (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedTask = TaskService.update(id as string, req.body);
    if (!updatedTask) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(updatedTask);
  },

  delete: (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = TaskService.delete(id as string);
    if (!deleted) return res.status(404).json({ error: "Task not found" });
    res.status(204).send(); // 204 = No Content (Sucesso)
  }
};