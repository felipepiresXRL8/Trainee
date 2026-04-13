import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes";
import clientRoutes from "./routes/clientRoutes";
import deviceRoutes from "./routes/deviceRoutes";
import orderRoutes from "./routes/orderRoutes";
import { authMiddleware } from "./middlewares/authMiddleware";

const app = express();

// ─── Middlewares globais ───────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true, // permite envio de cookies cross-origin
  })
);
app.use(express.json());
app.use(cookieParser());

// ─── Rotas públicas (auth) ─────────────────────────────────────────────
app.use("/auth", authRoutes);

// ─── Rotas protegidas (todas exigem token válido) ──────────────────────
app.use("/clients", authMiddleware, clientRoutes);
app.use("/devices", authMiddleware, deviceRoutes);
app.use("/orders", authMiddleware, orderRoutes);

// ─── Health check ──────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

export default app;
