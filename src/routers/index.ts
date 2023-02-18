import { Router } from "express";
import errorHandler from "../middlewares/errorHandler";
import authRouter from "./auth.router";
import postRouter from "./post.router";
import userRouter from "./user.router";

const mainRouter = Router();

mainRouter.use("/users", userRouter);
mainRouter.use("/posts", postRouter);
mainRouter.use("/auth", authRouter);

mainRouter.use(errorHandler);

export default mainRouter;
