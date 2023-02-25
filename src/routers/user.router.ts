import { Router } from "express";
import {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser,
} from "../handlers/user.handler";
import authentication from "../middlewares/authentication";
import dataValidation from "../middlewares/dataValidation";
import createUserSchema from "../schemas/users/createUserSchema";
import updateUserSchema from "../schemas/users/updateUserSchema";

const router = Router();

router.post("/", dataValidation(createUserSchema), createUser);
router.get("/", getUsers);
router.get("/:id", getUser);

router.use(authentication);

router.patch("/:id", dataValidation(updateUserSchema), updateUser);
router.delete("/:id", deleteUser);

export default router;
