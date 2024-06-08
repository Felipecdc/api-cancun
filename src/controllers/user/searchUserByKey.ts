import { Request, Response } from "express";
import User from "../../models/user/createUserService";

class SearchUserByKey {
  async handle(req: Request, res: Response) {
    try {
      const { key } = req.body;
      const user = await User.findOne({ key: key });

      if (!user) {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error("Erro ao encontrar usuário: ", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

export default SearchUserByKey;
