import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import upload from "../utils/multer.js";
import {
  getMessages,
  getUsersForSideBar,
  sendMessage,
} from "../controllers/message.controller.js";

const router = Router();

router.get("/users", isAuthenticated, getUsersForSideBar);
router.get("/:receiverId", isAuthenticated, getMessages);
router.post(
  "/send/:receiverId",
  isAuthenticated,
  upload.single("image"),
  sendMessage
);

export default router;
