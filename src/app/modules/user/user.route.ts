import {Router } from "express";
import { userController } from "./user.controler";
import { createZodSchema } from "./user.createZodSchema";
import { validateCreateUserSchema } from "../../middlewares/validateRequest";

const route = Router();


route.post('/register', 
    validateCreateUserSchema(createZodSchema),
    userController.createUser);
route.post('/all-user', userController.getAllUser);

export const userRoute = route;




// zod schema ta 2ta time ai lage update and create er somoy