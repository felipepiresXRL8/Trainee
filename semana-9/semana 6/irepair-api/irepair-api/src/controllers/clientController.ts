import { Response } from "express";
import { prisma } from "../config/prismaClient";
import { AuthRequest } from "../middlewares/authMiddleware";

export async function getClients(_req: AuthRequest, res: Response): Promise<void> {
  const clients = await prisma.client.findMany({
    include: { devices: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(clients);
}

export async function getClientById(req: AuthRequest, res: Response): Promise<void> {
  const { id } = req.params;
  const client = await prisma.client.findUnique({
    where: { id: Number(id) },
    include: { devices: { include: { orders: true } } },
  });

  if (!client) {
    res.status(404).json({ message: "Cliente não encontrado." });
    return;
  }

  res.json(client);
}

export async function createClient(req: AuthRequest, res: Response): Promise<void> {
  const { name, email, phone } = req.body;

  if (!name || !phone) {
    res.status(400).json({ message: "name e phone são obrigatórios." });
    return;
  }

  const client = await prisma.client.create({
    data: { name, email, phone },
  });

  res.status(201).json(client);
}

export async function updateClient(req: AuthRequest, res: Response): Promise<void> {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  const client = await prisma.client.update({
    where: { id: Number(id) },
    data: { name, email, phone },
  });

  res.json(client);
}

export async function deleteClient(req: AuthRequest, res: Response): Promise<void> {
  const { id } = req.params;

  await prisma.client.delete({ where: { id: Number(id) } });

  res.status(204).send();
}
