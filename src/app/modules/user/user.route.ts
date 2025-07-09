import { Router } from "express";
import { userController } from "./user.controler";

const route = Router();

route.post('/register', userController.createUser);

export const userRoute = route;