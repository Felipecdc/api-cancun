"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Inicializando o aplicativo Express
const app = (0, express_1.default)();
const port = process.env.PORT || 3000; // Define a porta do servidor
// Rota 1: Retorna um texto simples
app.get("/user", (req, res) => {
    res.send("Olá, esta é a rota 1!");
});
// Rota 2: Retorna outro texto simples
app.get("/client", (req, res) => {
    res.send("Olá, esta é a rota 2!");
});
// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});
