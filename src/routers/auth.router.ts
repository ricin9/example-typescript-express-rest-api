import { Router } from "express";
import { login } from "../handlers/auth.handler";
import dataValidation from "../middlewares/dataValidation";
import loginSchema from "../schemas/auth/loginSchema";

const router = Router();

router.post("/login", dataValidation(loginSchema), login);

export default router;
