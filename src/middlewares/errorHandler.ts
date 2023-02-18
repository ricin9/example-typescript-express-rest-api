import { NextFunction, Request, Response } from "express";

export default (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const status = res.statusCode == 200 ? 500 : res.statusCode;

    res.status(status).json({
        error: "error",
        message: err.message,
    });
};
