import { Router } from "express";

import createUserController from "./controllers/user/createUserController";
import AuthUserController from "./controllers/user/AuthUserController";

const router = Router();

router.post("/user", createUserController.handle);
router.get("/session", AuthUserController.handle);

export { router };
