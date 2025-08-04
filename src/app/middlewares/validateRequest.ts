import { NextFunction, Request, Response } from "express"
import { AnyZodObject } from "zod"


export const validateCreateUserSchema = (zodSchema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        req.body =JSON.parse(req.body.data) || req.body;
        req.body = await zodSchema.parseAsync(req.body)
        console.log("zod req",req.body)
        next()
    } catch (err) {
        next(err)
    }
}
