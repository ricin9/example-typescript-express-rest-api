import { NextFunction, Request, Response } from "express";
import { verifyHash } from "../common/crypto";
import { generateToken } from "../common/jwt";
import db from "../db";

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body;

    const user = await db.user.findUnique({
        where: { email },
        select: {
            id: true,
            email: true,
            password: true,
        },
    });

    if (user) {
        if (await verifyHash(password, user.password)) {
            res.json({
                token: generateToken(user.id),
            });
            return;
        }
    }

    res.status(401);
    next(new Error("Invalid email or password"));
};
