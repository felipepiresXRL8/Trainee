import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';

const service = new TaskService();

export class TaskController {
  async create(req: Request, res: Response) {
    try {
      const { title, description } = req.body;
      const task = await service.create(title, description);
      return res.status(201).json(task);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    const tasks = await service.getAll();
    return res.status(200).json(tasks);
  }

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
      const task = await service.getById(id);
      return res.status(200).json(task);
    } catch (error) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
      const task = await service.update(id, req.body);
      return res.status(200).json(task);
    } catch (error) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
      await service.delete(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
  }
}