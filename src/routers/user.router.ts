import { Router } from "express";
import {
    createUser,
    deleteUser,
    getUser,
    getUserPosts,
    getUsers,
    updateUser,
} from "../handlers/user.handler";
import authentication from "../middlewares/authentication";
import dataValidation from "../middlewares/dataValidation";
import createUserSchema from "../schemas/users/createUserSchema";
import updateUserSchema from "../schemas/users/updateUserSchema";

const userRouter = Router();

userRouter.post("/", dataValidation(createUserSchema), createUser);
userRouter.get("/", getUsers);
userRouter.get("/:id/posts", getUserPosts);
userRouter.get("/:id", getUser);

userRouter.use(authentication);

userRouter.patch("/:id", dataValidation(updateUserSchema), updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
