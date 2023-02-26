import db from "../db";
import { Request, Response, NextFunction } from "express";
import AuthenticatedRequest from "../common/interfaces/AuthenticatedRequest";

export const getRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restaurants = await db.restaurant.findMany({ ...(req.query as any) });
    res.json(restaurants);
  } catch (err) {
    res.status(404);
    next(new Error("no restaurants found"));
  }
};

export const getRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);
  try {
    const restaurant = await db.restaurant.findUnique({
      where: {
        id,
      },
      include: { Food: true },
    });
    res.json(restaurant);
  } catch (err) {
    res.status(404);
    next(Error("no restaurants found"));
  }
};

export const createRestaurant = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const restaurant = await db.restaurant.create({
      data: req.body,
    });
    res.json(restaurant);
  } catch (err) {
    res.status(400);
    next(new Error("bad data frr"));
  }
};

export const updateRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);

  try {
    const restaurant = await db.restaurant.update({
      where: { id },
      data: req.body,
    });
    res.json(restaurant);
  } catch (err) {
    res.status(400);
    throw new Error("bad data frr wela not found jcp lmfao");
  }
};

export const deleteRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);

  try {
    const restaurant = await db.restaurant.delete({
      where: {
        id,
      },
    });
    res.json(restaurant);
  } catch (err) {
    res.status(404);
    throw new Error("restaurant not found");
  }
};
