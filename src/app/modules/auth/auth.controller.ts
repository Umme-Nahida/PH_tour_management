import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"

const credentialsLogin = catchAsync(async(req:Request,res:Response, next: NextFunction)=>{
    const loginInfo = await authService.credentialsLogin(req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message:"user login successfully",
        data: loginInfo

    })
    // console.log(users)
})


export const userCredentials= {
    credentialsLogin
}
