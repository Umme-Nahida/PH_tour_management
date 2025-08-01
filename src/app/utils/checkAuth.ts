import { NextFunction, Request, Response } from "express";
import AppError from "../ErrorHelpers/appError";
import { verifyToken } from "./jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";

export const checkAuth =(...restRoles: string[])=> async (req: Request, res: Response, next: NextFunction) => {
    try {

        const accessToken = req.headers.authorization;

        if (!accessToken) {
            throw new AppError(403, "token isn't available")
        }

        const tokenVarify = verifyToken(accessToken, envVars.secret) as JwtPayload
        console.log("tokenVarify", tokenVarify)
        console.log("restRoles", restRoles)

        if(!restRoles.includes(tokenVarify.role)){
            throw new AppError(403, "you are not allowed to access this route")
        }
        req.user= tokenVarify;
        next()
    } catch (err) {
        next(err)
    }

}
