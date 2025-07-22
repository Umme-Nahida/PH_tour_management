import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"

const createTour = catchAsync(async(req:Request,res:Response, next: NextFunction)=>{

   const result = req.body;

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message:"user login successfully",
        data: result

    })
 
})

export const tourController = {
    createTour
}