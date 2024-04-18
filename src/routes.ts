import { Router, Request, Response } from "express";

const router = Router();

// Rota home
router.get("/", (req: Request, res: Response) => {
  res.json({ ok: true });
});

// Rota 1: Retorna um texto simples
router.get("/user", (req: Request, res: Response) => {
  res.send("Olá, esta é a rota 1!");
});

// Rota 2: Retorna outro texto simples
router.get("/client", (req: Request, res: Response) => {
  res.send("Olá, esta é a rota 2!");
});

export { router };
