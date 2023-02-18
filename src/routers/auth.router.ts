import { Router } from "express";
import { login } from "../handlers/auth.handler";
import dataValidation from "../middlewares/dataValidation";
import loginSchema from "../schemas/auth/loginSchema";

const authRouter = Router();

authRouter.post("/login", dataValidation(loginSchema), login);

export default authRouter;
