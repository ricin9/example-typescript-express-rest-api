import { Router } from "express";
import {
  createRestaurant,
  deleteRestaurant,
  getRestaurant,
  getRestaurants,
  updateRestaurant,
} from "../handlers/restaurant.handler";
import authentication from "../middlewares/authentication";
import dataValidation from "../middlewares/dataValidation";
import queryValidation from "../middlewares/queryValidation";
import createRestaurantSchema from "../schemas/restaurant/createRestaurantSchema";
import queryRestaurantSchema from "../schemas/restaurant/queryRestaurantSchema";
import updateRestaurantSchema from "../schemas/restaurant/updateRestaurantSchema";

const router = Router();

router.get("/", queryValidation(queryRestaurantSchema), getRestaurants);
router.get("/:id", getRestaurant);

router.use(authentication);
router.post("/", dataValidation(createRestaurantSchema), createRestaurant);
router.patch("/:id", dataValidation(updateRestaurantSchema), updateRestaurant);
router.delete("/:id", deleteRestaurant);

export default router;
