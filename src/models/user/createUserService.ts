import { Schema, model, Document } from "mongoose";

export interface UserProps extends Document {
  name: string;
  email: string;
  password: string;
  key: string;
}

const createUserSchema = new Schema<UserProps>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  key: { type: String, required: true, unique: true },
});

export default model<UserProps>("User", createUserSchema);
