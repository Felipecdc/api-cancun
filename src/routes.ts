import { Router } from "express";

import createUserController from "./controllers/user/createUserController";
import AuthUserController from "./controllers/user/AuthUserController";

const router = Router();

router.post("/user", new createUserController().handle);
router.post("/session", new AuthUserController().handle);

export { router };
