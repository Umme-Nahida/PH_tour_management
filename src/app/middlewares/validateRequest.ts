import { NextFunction, Request, Response } from "express"
import { AnyZodObject } from "zod"


export const validateCreateUserSchema= (zodSchema: AnyZodObject)=>async(req: Request, res: Response, next: NextFunction) => {

    req.body = await zodSchema.parseAsync(req.body) 
    next()
}
