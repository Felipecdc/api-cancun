import { Request, Response } from "express";
import Client from "../../models/clients/createClientsService";
import twilio from "twilio";
import schedule from "node-schedule";

const accountSid = "AC8de96a3727e8acca4c36b922598cd7f9";
const authToken = "MLMY6RPMYPXZPFTVQME3BDLS";
const twilioPhoneNumber = "14155238886";
const twilioClient = twilio(accountSid, authToken);

class CreateAutomationController {
  async handle(req: Request, res: Response) {
    try {
      const clients = await Client.find();
      if (!clients || clients.length === 0) {
        return res.status(401).json({ message: "Nenhum cliente encontrado" });
      }

      const currentDate: Date = new Date();

      clients.forEach((client) => {
        const { id, name, phoneNumber, dates, lastCutie } = client;

        let dateDiffs = [];
        for (let i = 1; i < dates.length; i++) {
          const diffTime = Math.abs(
            new Date(dates[i]).getTime() - new Date(dates[i - 1]).getTime()
          );
          dateDiffs.push(diffTime);
        }
        const minDateDiff = Math.min(...dateDiffs);

        if (dates.length < 3) {
          console.log({
            Message: "--- Este user tem menos de 3 serviços ---",
            name: name,
            userId: id,
            Phone: phoneNumber,
          });
        }

        if (dates.length >= 3) {
          const nextNotified = new Date(lastCutie.getTime() + minDateDiff);
          if (currentDate >= nextNotified) {
            console.log({
              Message: "--- Mensagem enviada ---",
              name: name,
              userId: id,
              Phone: phoneNumber,
              envio: nextNotified,
            });
          } else {
            console.log({
              Message: "--- Tempo de menssagem dentro do limite ---",
              name: name,
              userId: id,
              Phone: phoneNumber,
              proxima: nextNotified,
            });
          }
        }
      });

      return res.status(200).json({
        clients: clients,
      });
    } catch (error) {
      console.error("Erro ao enviar mensagem via WhatsApp: ", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

export default CreateAutomationController;
