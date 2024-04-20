import { Request, Response } from "express";
import User from "../../models/user/createUserService";
import { hash } from "bcrypt";

class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const hashedPassword = await hash(password, 8);

      const existentUser = await User.findOne({ email });
      if (existentUser) {
        return res.status(400).json({ message: "E-mail já está em uso" });
      }

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      res.status(200).json(newUser);
    } catch (error) {
      console.error("Erro ao criar usuário: ", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

export default new CreateUserController();
