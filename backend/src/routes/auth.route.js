import { Router } from "express";
import {
  checkAuth,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", isAuthenticated, logoutUser);
router.get("/check", isAuthenticated, checkAuth);

export default router;
