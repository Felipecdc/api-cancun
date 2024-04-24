import { Schema, model, Document } from "mongoose";

export interface ClientUserProps extends Document {
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  dates: Date[];
  lastReminderSent: Date | null;
  createdAt: Date;
}

const createUserSchema = new Schema<ClientUserProps>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  dates: [{ type: Date }],
  lastReminderSent: { type: Date, required: true },
  createdAt: { type: Date, required: true },
});

export default model<ClientUserProps>("Client", createUserSchema);

// if (reminderDiff >= minDateDiff) {
//   warnMessage.push({
//     user: name,
//     userId: id,
//     message: "Enviando nova mensagem para o user",
//   });
// }
