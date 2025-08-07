import { Router } from "express";
import { userController } from "./user.controler";
import { createZodSchema } from "./user.createZodSchema";
import { validateCreateUserSchema } from "../../middlewares/validateRequest";
import { Role } from "./user.interface";
import { checkAuth } from "../../utils/checkAuth";

const route = Router();



route.post('/register',
    validateCreateUserSchema(createZodSchema),
    userController.createUser);

route.get('/all-user',checkAuth(Role.ADMIN,Role.SUPER_ADMIN), userController.getAllUser);
route.get('/getMe',checkAuth(Role.ADMIN,Role.SUPER_ADMIN), userController.getMe);
route.patch('/:id',checkAuth(...Object.keys(Role)), userController.updateUser);

export const userRoute = route;




// zod schema ta 2ta time ai lage update and create er somoy