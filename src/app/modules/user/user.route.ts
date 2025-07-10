import { Router } from "express";
import { userController } from "./user.controler";

const route = Router();

route.post('/register', userController.createUser);
route.post('/all-user', userController.getAllUser);

export const userRoute = route;