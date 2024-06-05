import { Router } from "express";

import createUserController from "./controllers/user/createUserController";
import AuthUserController from "./controllers/user/AuthUserController";

import CreateClientController from "./controllers/clients/createClientsController";

import CreateAutomationController from "./controllers/automation/createAutomationController";
import UpdateClientController from "./controllers/clients/updateClientsController";

const router = Router();

// Create Owner Users
router.post("/user", new createUserController().handle);
router.get("/session", new AuthUserController().handle);

// Create Client Users
router.post("/client", new CreateClientController().handle);
router.patch("/client/:id", new UpdateClientController().handle);

// Create Automation For Clients
router.post("/api", new CreateAutomationController().handle);

export { router };
