import { Request, Response } from "express";
import Client from "../../models/clients/createClientsService";
import twilio from "twilio";
import schedule from "node-schedule";

const accountSid = "AC8de96a3727e8acca4c36b922598cd7f9";
const authToken = "MLMY6RPMYPXZPFTVQME3BDLS";
const twilioPhoneNumber = "14155238886";
const twilioClient = twilio(accountSid, authToken);

class CreateAutomationController {
  constructor() {
    const fakeReq = {} as Request;
    const fakeRes = {} as Response;
    schedule.scheduleJob("0 4 * * *", () => {
      this.handle(fakeReq, fakeRes);
    });
  }
  async handle(req: Request, res: Response) {
    try {
      const clients = await Client.find();

      if (!clients || clients.length === 0) {
        return res.status(401).json({ message: "Nenhum cliente encontrado" });
      }

      const currentDate: Date = new Date();
      //const warnMessage: { user: string; userId: string; message: string }[] =
      //  [];

      clients.forEach((client) => {
        const { id, name, phoneNumber, dates, lastReminderSent } = client;

        // Diferenca entre as datas
        let dateDiffs = [];
        for (let i = 1; i < dates.length; i++) {
          const diffTime = Math.abs(
            new Date(dates[i]).getTime() - new Date(dates[i - 1]).getTime()
          );
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          dateDiffs.push(diffDays);
        }
        const minDateDiff = Math.min(...dateDiffs);

        // Comparacao com a ultima msg enviada
        // let reminderDiff = 0;
        // if (lastReminderSent !== null) {
        //   const diffTime = Math.abs(
        //     currentDate.getTime() - new Date(lastReminderSent).getTime()
        //   );
        //   reminderDiff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        // }

        console.log({
          "User: ": name,
          "Media de dias: ": dateDiffs,
          "Dia de validacao: ": lastReminderSent,
          //"Ultima MSG: ": reminderDiff,
        });

        return { id, name, phoneNumber, dates, lastReminderSent };
      });

      //console.log({ baseMessage: warnMessage });

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
