import express from "express";
import {
  getAllUsers,
  getMe,
  updatePicture,
  updateUsername,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.get("/me", isAuthenticated, getMe);
router.put(
  "/update-picture",
  upload.single("profilePic"),
  isAuthenticated,
  updatePicture
);
router.put("/update-username", isAuthenticated, updateUsername);

router.get("/", isAuthenticated, getAllUsers);

export default router;
