import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
  getMessages,
  getUsersForSideBar,
  sendMessage,
} from "../controllers/message.controller.js";

const router = Router();

router.get("/users", isAuthenticated, getUsersForSideBar);
router.get("/:id", isAuthenticated, getMessages);
router.post("/send/:id", isAuthenticated, sendMessage);

export default router;
