import { NextFunction, Request, Response, Router } from "express";
import { authController } from "./auth.controller";
import { checkAuth } from "../../utils/checkAuth";
import { object } from "zod";
import { Role } from "../user/user.interface";
import passport from "passport";

const route = Router()

route.post("/login", authController.credentialsLogin)
route.post("/refresh-token", authController.getRefreshToken)
route.post("/logout",authController.logout)
route.get("/reset-pass", checkAuth(...Object.values(Role)), authController.resetPassword)

// route.get("/google",passport.authenticate("google",{failureRedirect:"/login"}),async(req:Request,res:Response,next:NextFunction)=>{
    
//     const redirect = req.query.redirect || "/"
//     passport.authenticate("google", {scope:["openid","profile","email"], state:redirect as string})(req,res,next)
// })

route.get("/google", async (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.query.redirect || "/"
    passport.authenticate("google", { scope: ["profile", "email"], state: redirect as string })(req, res, next)
})

route.get("/google/callback",passport.authenticate("google",{failureRedirect:"/login"}),authController.googleCallback)

export const authRoute = route;