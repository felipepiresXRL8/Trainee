import { Response } from "express";
import { prisma } from "../config/prismaClient";
import { AuthRequest } from "../middlewares/authMiddleware";
import { OrderStatus } from "@prisma/client";

export async function getOrders(_req: AuthRequest, res: Response): Promise<void> {
  const orders = await prisma.serviceOrder.findMany({
    include: { device: { include: { client: true } }, user: { select: { id: true, name: true } } },
    orderBy: { createdAt: "desc" },
  });
  res.json(orders);
}

export async function getOrderById(req: AuthRequest, res: Response): Promise<void> {
  const { id } = req.params;
  const order = await prisma.serviceOrder.findUnique({
    where: { id: Number(id) },
    include: { device: { include: { client: true } }, user: { select: { id: true, name: true } } },
  });

  if (!order) {
    res.status(404).json({ message: "Ordem de serviço não encontrada." });
    return;
  }

  res.json(order);
}

export async function createOrder(req: AuthRequest, res: Response): Promise<void> {
  const { description, deviceId, price } = req.body;

  if (!description || !deviceId) {
    res.status(400).json({ message: "description e deviceId são obrigatórios." });
    return;
  }

  const order = await prisma.serviceOrder.create({
    data: {
      description,
      deviceId: Number(deviceId),
      userId: req.userId as number,
      price: price ? Number(price) : undefined,
    },
    include: { device: { include: { client: true } } },
  });

  res.status(201).json(order);
}

export async function updateOrder(req: AuthRequest, res: Response): Promise<void> {
  const { id } = req.params;
  const { description, status, price } = req.body;

  const validStatuses = Object.values(OrderStatus);
  if (status && !validStatuses.includes(status)) {
    res.status(400).json({ message: `Status inválido. Use: ${validStatuses.join(", ")}` });
    return;
  }

  const order = await prisma.serviceOrder.update({
    where: { id: Number(id) },
    data: {
      description,
      status,
      price: price !== undefined ? Number(price) : undefined,
    },
    include: { device: { include: { client: true } } },
  });

  res.json(order);
}

export async function deleteOrder(req: AuthRequest, res: Response): Promise<void> {
  const { id } = req.params;
  await prisma.serviceOrder.delete({ where: { id: Number(id) } });
  res.status(204).send();
}
