import express from "express";
import { getAllUsers } from "../controllers/users";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.get("/all", verifyToken, getAllUsers);

export default router;
