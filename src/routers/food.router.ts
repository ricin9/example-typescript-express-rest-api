import { Router } from "express";
import {
    createFood,
    deleteFood,
    getFood,
    getFoods,
    updateFood,
} from "../handlers/food.handler";
import authentication from "../middlewares/authentication";
import dataValidation from "../middlewares/dataValidation";
import createFoodSchema from "../schemas/food/createFoodSchema";
import updateFoodSchema from "../schemas/food/updateFoodSchema";

const router = Router();

router.get("/", getFoods);
router.get("/:id", getFood);

router.use(authentication);
router.post("/", dataValidation(createFoodSchema), createFood);
router.patch("/:id", dataValidation(updateFoodSchema), updateFood);
router.delete("/:id", deleteFood);

export default router;
