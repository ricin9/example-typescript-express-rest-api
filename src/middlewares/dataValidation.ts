import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export default (schema: z.AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const validatedData = schema.parse(req.body);
            req.body = validatedData;
            next();
        } catch (error) {
            res.status(400);
            res.json(error);
        }
    };
