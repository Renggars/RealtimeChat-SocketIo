import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.js";
import { createMessageSchema } from "../validations/message.validation.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";

const router = Router();

router.get("/", isAuthenticated, getMessages);

router.post("/", isAuthenticated, validate(createMessageSchema), sendMessage);

export default router;
