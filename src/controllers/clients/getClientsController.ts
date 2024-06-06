import { Request, Response } from "express";
import Client from "../../models/clients/createClientsService";

class GetClientsController {
  async handle(req: Request, res: Response) {
    try {
      const clients = await Client.find({});
      return res.status(200).json(clients);
    } catch (error) {
      console.error("Erro ao buscar clientes: ", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

export default GetClientsController;
