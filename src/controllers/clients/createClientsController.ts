import { Request, Response } from "express";
import Client from "../../models/clients/createClientsService";

class CreateClientController {
  async handle(req: Request, res: Response) {
    try {
      const { name, email, phoneNumber } = req.body;

      const existentUser = await Client.findOne({ email });
      if (existentUser) {
        return res.status(400).json({ message: "E-mail já está em uso" });
      }

      const newUser = await Client.create({
        name,
        email,
        phoneNumber,
        dates: [new Date()],
        lastReminderSent: new Date(),
        createdAt: new Date(),
        lastCutie: new Date(),
      });

      res.status(200).json(newUser);
    } catch (error) {
      console.error("Erro ao criar usuário: ", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

export default CreateClientController;
