import { Schema, model, Document } from "mongoose";

export interface ClientUserProps extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  dates: Date[];
  lastReminderSent: Date | null;
  createdAt: Date;
  lastCutie: Date;
}

const createUserSchema = new Schema<ClientUserProps>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  dates: [{ type: Date }],
  lastReminderSent: { type: Date, required: true },
  createdAt: { type: Date, required: true },
  lastCutie: { type: Date, required: true },
});

export default model<ClientUserProps>("Client", createUserSchema);
