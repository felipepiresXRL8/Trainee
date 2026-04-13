import { Response } from "express";
import { prisma } from "../config/prismaClient";
import { AuthRequest } from "../middlewares/authMiddleware";

export async function getDevices(_req: AuthRequest, res: Response): Promise<void> {
  const devices = await prisma.device.findMany({
    include: { client: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(devices);
}

export async function getDeviceById(req: AuthRequest, res: Response): Promise<void> {
  const { id } = req.params;
  const device = await prisma.device.findUnique({
    where: { id: Number(id) },
    include: { client: true, orders: true },
  });

  if (!device) {
    res.status(404).json({ message: "Dispositivo não encontrado." });
    return;
  }

  res.json(device);
}

export async function createDevice(req: AuthRequest, res: Response): Promise<void> {
  const { brand, model, serial, clientId } = req.body;

  if (!brand || !model || !clientId) {
    res.status(400).json({ message: "brand, model e clientId são obrigatórios." });
    return;
  }

  const device = await prisma.device.create({
    data: { brand, model, serial, clientId: Number(clientId) },
    include: { client: true },
  });

  res.status(201).json(device);
}

export async function updateDevice(req: AuthRequest, res: Response): Promise<void> {
  const { id } = req.params;
  const { brand, model, serial, clientId } = req.body;

  const device = await prisma.device.update({
    where: { id: Number(id) },
    data: { brand, model, serial, clientId: clientId ? Number(clientId) : undefined },
    include: { client: true },
  });

  res.json(device);
}

export async function deleteDevice(req: AuthRequest, res: Response): Promise<void> {
  const { id } = req.params;
  await prisma.device.delete({ where: { id: Number(id) } });
  res.status(204).send();
}
