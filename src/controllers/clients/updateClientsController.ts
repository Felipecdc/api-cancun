import { Request, Response } from "express";
import Client from "../../models/clients/createClientsService";

interface UpdateClientProps {
  dates?: Date[];
  lastCutie?: Date;
}

class UpdateClientController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const clientrequest = await Client.findById(id);

      const dates = clientrequest?.dates;
      const lastCutie = clientrequest?.lastCutie;
      const currentDate = new Date();

      const updateFields: UpdateClientProps = {};
      if (lastCutie?.getDate() === currentDate.getDate()) {
        return res.status(400).json({ message: "-- Not implemented --" });
      } else if (dates && lastCutie) {
        const updatedDates = [...(dates || []), currentDate];

        if (updatedDates.length >= 5) {
          updatedDates.shift();
        }

        updateFields.dates = updatedDates;
        updateFields.lastCutie = currentDate;
      }

      const updateClient = await Client.findOneAndUpdate(
        { _id: id },
        updateFields,
        { new: true }
      );

      if (updateClient) {
        return res
          .status(200)
          .json({ message: "Cliente atualizado com sucesso", updateClient });
      } else {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }
    } catch (error) {
      console.error("Erro ao criar usuário: ", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

export default UpdateClientController;
