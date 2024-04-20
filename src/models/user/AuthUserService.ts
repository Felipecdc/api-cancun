import { Schema, model, Document } from "mongoose";

export interface AuthUserProps extends Document {
  email: string;
  password: string;
}

const AuthUserSchema = new Schema<AuthUserProps>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default model<AuthUserProps>("UserAuth", AuthUserSchema);
