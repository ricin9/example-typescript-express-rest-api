import db from "../db";
import { Request, Response, NextFunction } from "express";
import AuthenticatedRequest from "../common/interfaces/AuthenticatedRequest";

export const getPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const posts = await db.post.findMany({ include: { author: true } });
        res.json(posts);
    } catch (err) {
        res.status(404);
        next(new Error("no posts found"));
    }
};

export const getPost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = parseInt(req.params.id);
    try {
        const post = await db.post.findUnique({
            where: {
                id,
            },
            include: { author: true },
        });
        res.json(post);
    } catch (err) {
        res.status(404);
        next(Error("no posts found"));
    }
};

export const createPost = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const { title, content } = req.body;
    const authorId: number = parseInt(req.user?.sub || "0");
    try {
        const post = await db.post.create({
            data: {
                title,
                content,
                authorId,
            },
        });
        res.json(post);
    } catch (err) {
        res.status(400);
        next(new Error("bad data frr"));
    }
};

export const updatePost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;

    try {
        const post = await db.post.update({
            where: { id },
            data: {
                title,
                content,
            },
        });
        res.json(post);
    } catch (err) {
        res.status(400);
        throw new Error("bad data frr wela not found jcp lmfao");
    }
};

export const deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = parseInt(req.params.id);

    try {
        const post = await db.post.delete({
            where: {
                id,
            },
        });
        res.json(post);
    } catch (err) {
        res.status(404);
        throw new Error("post not found");
    }
};
