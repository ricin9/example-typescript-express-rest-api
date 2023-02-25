import { Router } from "express";
import {
    createCategory,
    deleteCategory,
    getCategory,
    getCategorys,
    updateCategory,
} from "../handlers/category.handler";
import authentication from "../middlewares/authentication";
import dataValidation from "../middlewares/dataValidation";
import createCategorySchema from "../schemas/category/createCategorySchema";
import updateCategorySchema from "../schemas/category/updateCategorySchema";

const router = Router();

router.get("/", getCategorys);
router.get("/:id", getCategory);

router.use(authentication);
router.post("/", dataValidation(createCategorySchema), createCategory);
router.patch("/:id", dataValidation(updateCategorySchema), updateCategory);
router.delete("/:id", deleteCategory);

export default router;
