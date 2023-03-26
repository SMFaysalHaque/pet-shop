import { Router } from "express";
const router = Router();

import { registerUser } from "../controllers/userController";

router.post("/register", registerUser);

export default router;
