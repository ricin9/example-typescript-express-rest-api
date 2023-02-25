import db from "../db";
import { Request, Response, NextFunction } from "express";
import AuthenticatedRequest from "../common/interfaces/AuthenticatedRequest";

export const getFoods = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const foods = await db.food.findMany();
        res.json(foods);
    } catch (err) {
        res.status(404);
        next(new Error("no foods found"));
    }
};

export const getFood = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = parseInt(req.params.id);
    try {
        const food = await db.food.findUnique({
            where: {
                id,
            },
            include: { category: true, restaurant: true, Review: true },
        });
        res.json(food);
    } catch (err) {
        res.status(404);
        next(Error("no foods found"));
    }
};

export const createFood = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const authorId: number = parseInt(req.user?.sub || "0");
    try {
        const food = await db.food.create({
            data: req.body,
        });
        res.json(food);
    } catch (err) {
        res.status(400);
        next(new Error("bad data frr"));
    }
};

export const updateFood = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = parseInt(req.params.id);

    try {
        const food = await db.food.update({
            where: { id },
            data: req.body,
        });
        res.json(food);
    } catch (err) {
        res.status(400);
        throw new Error("bad data frr wela not found jcp lmfao");
    }
};

export const deleteFood = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = parseInt(req.params.id);

    try {
        const food = await db.food.delete({
            where: {
                id,
            },
        });
        res.json(food);
    } catch (err) {
        res.status(404);
        throw new Error("food not found");
    }
};
