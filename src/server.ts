import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { router } from "./routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  console.error("A variavel de ambiente MONGODB_URL não está definida!");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Conexão com o MongoDB estabilizada!");
  })
  .catch((error) => {
    console.error("Erro ao conectar no MongoDB: ", error);
  });

app.use(router);

const port = process.env.PORT;

app.listen(port, () => {
  console.log("------- Server online -------");
});
