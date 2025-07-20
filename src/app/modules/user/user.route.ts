import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controler";
import { createZodSchema } from "./user.createZodSchema";
import { validateCreateUserSchema } from "../../middlewares/validateRequest";
import AppError from "../../ErrorHelpers/appError";
import jwt, { JwtPayload } from "jsonwebtoken"
import { Role } from "./user.interface";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { checkAuth } from "../../utils/checkAuth";
import { object } from "zod";

const route = Router();



route.post('/register',
    // validateCreateUserSchema(createZodSchema),
    userController.createUser);

route.get('/all-user',checkAuth(Role.ADMIN,Role.SUPER_ADMIN), userController.getAllUser);
route.patch('/:id',checkAuth(...Object.keys(Role)), userController.updateUser);

export const userRoute = route;




// zod schema ta 2ta time ai lage update and create er somoy