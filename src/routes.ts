import { Router } from "express";

import createUserController from "./controllers/user/createUserController";
import AuthUserController from "./controllers/user/AuthUserController";

import CreateClientController from "./controllers/clients/createClientsController";
import UpdateClientController from "./controllers/clients/updateClientsController";
import GetClientsController from "./controllers/clients/getClientsController";

import CreateAutomationController from "./controllers/automation/createAutomationController";
import SearchUserByKey from "./controllers/user/searchUserByKey";

const router = Router();

// Create Owner Users
router.post("/user", new createUserController().handle);
router.get("/session", new AuthUserController().handle);
router.post("/key", new SearchUserByKey().handle);

// Create Client Users
router.get("/client", new GetClientsController().handle);
router.post("/client", new CreateClientController().handle);
router.patch("/client/:id", new UpdateClientController().handle);

// Create Automation For Clients
router.post("/api", new CreateAutomationController().handle);

export { router };
