import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prismaClient";
import { AuthRequest } from "../middlewares/authMiddleware";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 1000 * 60 * 60 * 24, // 24 horas
};

export async function register(req: Request, res: Response): Promise<void> {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "name, email e password são obrigatórios." });
    return;
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    res.status(409).json({ message: "E-mail já cadastrado." });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
    select: { id: true, name: true, email: true, createdAt: true },
  });

  res.status(201).json({ message: "Usuário criado com sucesso.", user });
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "email e password são obrigatórios." });
    return;
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(401).json({ message: "Credenciais inválidas." });
    return;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    res.status(401).json({ message: "Credenciais inválidas." });
    return;
  }

  const secret = process.env.JWT_SECRET as string;
  const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "24h" });

  res.cookie("token", token, COOKIE_OPTIONS);

  res.json({
    message: "Login realizado com sucesso.",
    user: { id: user.id, name: user.name, email: user.email },
  });
}

export async function logout(_req: Request, res: Response): Promise<void> {
  res.clearCookie("token", COOKIE_OPTIONS);
  res.json({ message: "Logout realizado com sucesso." });
}

export async function me(req: AuthRequest, res: Response): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: { id: true, name: true, email: true, createdAt: true },
  });

  if (!user) {
    res.status(404).json({ message: "Usuário não encontrado." });
    return;
  }

  res.json({ user });
}
