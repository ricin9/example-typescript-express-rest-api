import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AuthenticatedRequest from "../common/interfaces/AuthenticatedRequest";

export default async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const token: string = req.headers.authorization?.split(" ")[1] || "";

    try {
        const jwtPayload = (await jwt.verify(
            token,
            process.env.JWT_SECRET as string
        )) as JwtPayload;

        req.user = jwtPayload;
        next();
    } catch (error) {
        res.status(403);
        next(new Error("You are unauthenticated"));
    }
};
