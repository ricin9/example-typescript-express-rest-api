import db from "../db";
import { Request, Response, NextFunction } from "express";
import AuthenticatedRequest from "../common/interfaces/AuthenticatedRequest";

export const getCategorys = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const categorys = await db.category.findMany();
        res.json(categorys);
    } catch (err) {
        res.status(404);
        next(new Error("no categorys found"));
    }
};

export const getCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = parseInt(req.params.id);
    try {
        const category = await db.category.findUnique({
            where: {
                id,
            },
            include: { Food: true },
        });
        res.json(category);
    } catch (err) {
        res.status(404);
        next(Error("no categorys found"));
    }
};

export const createCategory = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const authorId: number = parseInt(req.user?.sub || "0");
    try {
        const category = await db.category.create({
            data: req.body,
        });
        res.json(category);
    } catch (err) {
        res.status(400);
        next(new Error("bad data frr"));
    }
};

export const updateCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = parseInt(req.params.id);

    try {
        const category = await db.category.update({
            where: { id },
            data: req.body,
        });
        res.json(category);
    } catch (err) {
        res.status(400);
        throw new Error("bad data frr wela not found jcp lmfao");
    }
};

export const deleteCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = parseInt(req.params.id);

    try {
        const category = await db.category.delete({
            where: {
                id,
            },
        });
        res.json(category);
    } catch (err) {
        res.status(404);
        throw new Error("category not found");
    }
};
