import express from "express";
const router = express.Router();
import { register, login, updateUser, deleteUser, getUsers } from "../controllers/UserController.js";
import { authMiddleware } from "../middleware/auth.js";

router.post("/register", register);
router.post("/login", login);
router.put("/update/:id", authMiddleware, updateUser);
router.delete("/delete/:id", deleteUser);
router.get("/", getUsers)

export default router;
