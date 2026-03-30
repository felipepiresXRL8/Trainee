import { prisma } from '../config/prismaClient';

export class TaskService {
  async create(title: string, description?: string) {
    return await prisma.task.create({
      data: {
        title,
        description,
        completed: false
      }
    });
  }

  async getAll() {
    return await prisma.task.findMany();
  }

  async getById(id: number) {
    const task = await prisma.task.findUnique({
      where: { id }
    });
    if (!task) throw new Error('NOT_FOUND');
    return task;
  }

  async update(id: number, data: { title?: string; completed?: boolean; description?: string }) {
    try {
      return await prisma.task.update({
        where: { id },
        data
      });
    } catch (error) {
      throw new Error('NOT_FOUND');
    }
  }

  async delete(id: number) {
    try {
      await prisma.task.delete({
        where: { id }
      });
    } catch (error) {
      throw new Error('NOT_FOUND');
    }
  }
}