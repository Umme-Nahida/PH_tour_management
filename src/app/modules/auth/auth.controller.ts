import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"
import AppError from "../../ErrorHelpers/appError";
import { JwtPayload } from "jsonwebtoken";
import { createUserTokens } from "../../utils/userToken";
import { setAuthCookie } from "../../utils/setCookie";
import { envVars } from "../../config/env";
import passport from "passport";

const credentialsLogin = catchAsync(async(req:Request,res:Response, next: NextFunction)=>{

    passport.authenticate("local",
        (err:any, user:any,info:any)=>{

       if(err){
        return next(new AppError(401, info?.message || err));
       }

       if (!user) {
          return next(new AppError(401, info?.message || "User does not exist"));
        }

       const userToken = createUserTokens(user)
       console.log("userToken",userToken)

         res.cookie("token",userToken.refreshToken,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite:"strict"
       })

  
    delete user.toObject().password;

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message:"user login successfully",
        data: {
            accessToken: userToken.accessToken,
            refreshToken: userToken.refreshToken,
            user: user
        }

    })

    }
)(req,res,next)

  
    // console.log(users)
})

// passport.use(new LocalStrategy(
//   { usernameField: "email" }, // tell passport to use `email` instead of `username`
//   async (email, password, done) => {
//     try {
//       const user = await Users.findOne({ email });
//       if (!user) {
//         return done(null, false, { message: "Incorrect email" });
//       }

//       const isMatch = await bcrypt.compare(password, user.password as string);
//       if (!isMatch) {
//         return done(null, false, { message: "Incorrect password" });
//       }

//       return done(null, user);
//     } catch (err) {
//       return done(err);
//     }
//   }
// ));


const logout = catchAsync(async(req:Request,res:Response, next:NextFunction)=>{
        
        res.clearCookie("token",{
            httpOnly:true,
            secure:false,
            sameSite:"lax"
        })

        res.clearCookie("refreshToken",{
            httpOnly:true,
            secure:false,
            sameSite:"lax"
        })
        sendResponse(res,{
            success: true,
            statusCode: httpStatus.CREATED,
            message: "user logout successfully",
            data: {}
        })
})

const resetPassword = catchAsync(async(req:Request,res:Response, next:NextFunction)=>{
        
       const decodeToken = req.user as JwtPayload;
       await authService.resetPassword(req.body,decodeToken)

        sendResponse(res,{
            success: true,
            statusCode: httpStatus.OK,
            message: "password change successfully",
            data: null
        })
})


const changePassword = catchAsync(async(req:Request,res:Response, next:NextFunction)=>{
        
       const decodeToken = req.user as JwtPayload;

       const getNewPass = req.body.newPass;
       const getOldPass = req.body.oldPass;

       await authService.changePassword(getOldPass,getNewPass,decodeToken)

        sendResponse(res,{
            success: true,
            statusCode: httpStatus.OK,
            message: "password change successfully",
            data: null
        })
})


const setPassword = catchAsync(async(req:Request,res:Response, next:NextFunction)=>{
        
       const decodeToken = req.user as JwtPayload;

       const {password} = req.body; 

       await authService.setPassword(decodeToken.userId, password)

        sendResponse(res,{
            success: true,
            statusCode: httpStatus.OK,
            message: "password change successfully",
            data: null
        })
})


const forgetPassword = catchAsync(async(req:Request,res:Response, next:NextFunction)=>{

       
       const {email} = req.body; 

       await authService.forgetPassword(email)

        sendResponse(res,{
            success: true,
            statusCode: httpStatus.OK,
            message: "Email send successfully",
            data: null
        })
})


const getRefreshToken = catchAsync(async(req:Request,res:Response, next: NextFunction)=>{
    const token = req.cookies.token;
    if(!token){
        throw new AppError(httpStatus.BAD_REQUEST,"token is not found")
    }
    const loginInfoDecoded = await authService.getNewRefreshToken(token as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message:"user login successfully",
        data: loginInfoDecoded

    })
    // console.log(users)
})


const googleCallback = catchAsync(async(req:Request,res:Response, next: NextFunction)=>{
    
    let state = req.query.state ? req.query.state  as string : "";
    console.log("state",state)

    if(state.startsWith("/")){
      state = state.slice(1)
    }

    const user = req.user;
    console.log("user",user)
    if(!user){
        throw new AppError(httpStatus.BAD_REQUEST,"user not found")
    }

    const tokenInfo = createUserTokens(user)

    setAuthCookie(res, tokenInfo)
    res.redirect(`http://localhost:5000`)
    
})


export const authController= {
    credentialsLogin,
    getRefreshToken,
    logout,
    resetPassword,
    changePassword,
    googleCallback,
    setPassword,
    forgetPassword
}
