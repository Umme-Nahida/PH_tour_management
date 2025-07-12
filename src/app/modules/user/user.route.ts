import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controler";
import { createZodSchema } from "./user.createZodSchema";
import { validateCreateUserSchema } from "../../middlewares/validateRequest";
import AppError from "../../ErrorHelpers/appError";
import jwt, { JwtPayload } from "jsonwebtoken"
import { Role } from "./user.interface";

const route = Router();


route.post('/register',
    validateCreateUserSchema(createZodSchema),
    userController.createUser);

route.get('/all-user', async (req: Request, res: Response, next: NextFunction) => {
    try {

        const accessToken = req.headers.authorization;

        if (!accessToken) {
            throw new AppError(403, "token isn't available")
        }

        const tokenVarify = jwt.verify(accessToken as string, "sicret")
        console.log("tokenVarify", tokenVarify)
        if((tokenVarify as JwtPayload).role !== Role.ADMIN || Role.SUPER_ADMIN){
            throw new AppError(403, "you are not allowed to access this route")
        }
        next()
    } catch (err) {
        next(err)
    }

}, userController.getAllUser);

export const userRoute = route;




// zod schema ta 2ta time ai lage update and create er somoy