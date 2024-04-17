import express, { Request, Response } from "express";

// Inicializando o aplicativo Express
const app = express();
const port = process.env.PORT || 3000; // Define a porta do servidor

// Rota 1: Retorna um texto simples
app.get("/user", (req: Request, res: Response) => {
  res.send("Olá, esta é a rota 1!");
});

// Rota 2: Retorna outro texto simples
app.get("/client", (req: Request, res: Response) => {
  res.send("Olá, esta é a rota 2!");
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});
