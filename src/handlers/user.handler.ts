import db from "../db";
import { Request, Response, NextFunction } from "express";
import { generateHash } from "../common/crypto";
export const getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await db.user.findMany();
        res.json(users);
    } catch (err) {
        res.status(404);
        next(Error("no users found"));
    }
};

export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = parseInt(req.params.id);
    try {
        const user = await db.user.findUnique({
            where: {
                id,
            },
        });
        res.json(user);
    } catch (err) {
        res.status(404);
        next(new Error("no users found"));
    }
};

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password, name } = req.body;
    try {
        const user = await db.user.create({
            data: {
                email,
                password: await generateHash(password),
                name,
            },
        });
        res.json(user);
    } catch (err) {
        res.status(400);
        next(new Error("bad data frr"));
    }
};

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = parseInt(req.params.id);
    const { email, password, name } = req.body;

    try {
        const user = await db.user.update({
            where: { id },
            data: {
                email,
                password,
                name,
            },
        });
        res.json(user);
    } catch (err) {
        res.status(400);
        next(Error("bad data frr wela not found jcp lmfao"));
    }
};

export const getUserPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = parseInt(req.params.id);
    try {
        const user = await db.post.findMany({
            where: {
                authorId: id,
            },
        });
        res.json(user);
    } catch (err) {
        res.status(404);
        next(new Error("no users found"));
    }
};

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = parseInt(req.params.id);

    try {
        const user = await db.user.delete({
            where: {
                id,
            },
        });
        res.json(user);
    } catch (err) {
        res.status(404);
        next(Error("user not found"));
    }
};
