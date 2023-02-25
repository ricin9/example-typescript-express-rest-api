import { NextFunction, Request, Response } from "express";
import { verifyHash } from "../common/crypto";
import { generateToken } from "../common/jwt";
import db from "../db";

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = await db.user.findUnique({
        where: { username: req.body.username },
    });

    if (user) {
        if (await verifyHash(req.body.password, user.password)) {
            res.json({
                token: generateToken(user.id),
            });
            return;
        }
    }

    res.status(401);
    next(new Error("Invalid email or password"));
};
