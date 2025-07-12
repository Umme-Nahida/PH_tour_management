import { Router } from "express";
import { userCredentials } from "./auth.controller";

const route = Router()

route.post("/login", userCredentials.credentialsLogin)

export const authRoute = route;