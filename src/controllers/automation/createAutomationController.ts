import { Request, Response } from "express";
import Client from "../../models/clients/createClientsService";
import twilio from "twilio";

class CreateAutomationController {
  async handle(req: Request, res: Response) {
    try {
      const clients = await Client.find();
      if (!clients || clients.length === 0) {
        return res.status(401).json({ message: "Nenhum cliente encontrado" });
      }

      const currentDate: Date = new Date();
      const twilioClient = twilio(
        process.env.ACCOUNT_SID,
        process.env.AUTH_TOKEN
      );

      for (const client of clients) {
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
          if (currentDate.getDate() === nextNotified.getDate()) {
            twilioClient.messages
              .create({
                body: `*Aplicando automação*\n\nOlá ${name}, espero que esteja bem. Percebi que precisamos marcar mais um corte!\n\nCaso concorde, podemos marcar para hoje, que tal?`,
                from:
                  process.env.TWILIO_PHONE_NUMBER || "whatsapp:+14155238886",
                to: `whatsapp:+55${phoneNumber}`,
              })
              .then((message) => {
                console.log(message);
              })
              .catch((error) => {
                console.log(error);
              });

            console.log({
              Message: "--- Mensagem enviada ---",
              name: name,
              userId: id,
              Phone: phoneNumber,
              envio: nextNotified,
              minDate: minDateDiff,
            });
          } else if (
            currentDate.getDate() > nextNotified.getDate() &&
            currentDate.getDay() === nextNotified.getDay() + 2
          ) {
            twilioClient.messages
              .create({
                body: `*Aplicando automação*\n\nOlá ${name}, espero que esteja bem. Já se passou dois dias do dia que você geralmente passa qui!\n\nCaso queira marcar um serviço, podemos marcar para hoje, que tal?`,
                from:
                  process.env.TWILIO_PHONE_NUMBER || "whatsapp:+14155238886",
                to: `whatsapp:+55${phoneNumber}`,
              })
              .then((message) => {
                console.log(message);
              })
              .catch((error) => {
                console.log(error);
              });

            console.log({
              Message: "--- Mensagem enviada ---",
              name: name,
              userId: id,
              Phone: phoneNumber,
              envio: nextNotified,
              minDate: minDateDiff,
            });
          } else if (
            currentDate.getTime() >
            nextNotified.getTime() + 10 * 24 * 60 * 60 * 1000
          ) {
            await Client.updateOne({ _id: id }, { dates: [] });
            console.log({
              Message: "--- Datas do cliente limpas por inatividade ---",
              name: name,
              userId: id,
              Phone: phoneNumber,
            });
          } else {
            console.log({
              Message: "--- Algum problema com datas ---",
              userId: id,
              envio: nextNotified,
              minDate: minDateDiff,
            });
          }
        }
      }

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
