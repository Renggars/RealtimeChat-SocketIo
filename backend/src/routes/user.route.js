import express from "express";
import { getAllUsers, getMe } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/me", isAuthenticated, getMe);

router.get("/", isAuthenticated, getAllUsers);

export default router;
