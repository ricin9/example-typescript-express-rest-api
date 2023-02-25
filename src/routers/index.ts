import { Router } from "express";
import errorHandler from "../middlewares/errorHandler";
import authRouter from "./auth.router";
import foodRouter from "./food.router";
import restaurantRouter from "./restaurant.router";
import userRouter from "./user.router";

const mainRouter = Router();

mainRouter.use("/users", userRouter);
mainRouter.use("/auth", authRouter);
mainRouter.use("/restaurants", restaurantRouter);
mainRouter.use("/foods", foodRouter);

mainRouter.use(errorHandler);

export default mainRouter;
