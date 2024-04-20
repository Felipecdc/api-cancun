import { Request, Response } from "express";
import AuthUser from "../../models/user/AuthUserService";
import { compare } from "bcrypt";

class AuthUserController {
  async handle(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      console.log("Dados recebidos: ", email, password);

      const user = await AuthUser.findOne({ email }).exec();
      console.log("User encontrado no banco de dados: ", user);

      if (!user) {
        console.log("Usuário não encontrado");
        return res.status(401).json({ message: "E-mail ou senha incorretos" });
      }

      const passwordMatch = await compare(password, user.password);
      console.log("Senha correta:", passwordMatch);

      if (!passwordMatch) {
        return res.status(401).json({ message: "E-mail ou senha incorretos" });
      }

      return res.status(200).json({ message: "Autenticação bem-sucedida" });
    } catch (error) {
      console.error("Erro ao logar usuário: ", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

export default new AuthUserController();
