import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes"
import { userServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";


// const createUser = async(req:Request,res:Response, next:NextFunction)=>{
//     try{
//     //   throw new AppError(httpStatus.BAD_REQUEST,"fake Error is generated")
//        const result = await userServices.addUser(req.body)
        
//         res.status(httpStatus.CREATED).json({
//             message: "user created successfully",
//             result
//         })

//     }catch(err: any){
//         // res.status(httpStatus.BAD_REQUEST).json({message: ` something went wrong from controller ${err.message}`, err})
//         next(err)
//     }
// }


const createUser = catchAsync(async(req:Request,res:Response, next:NextFunction)=>{
     const result = await userServices.addUser(req.body)
        
        // res.status(httpStatus.CREATED).json({
        //     message: "user created successfully",
        //     result
        // })

        sendResponse(res,{
            success: true,
            statusCode: httpStatus.CREATED,
            message: "user created successfully",
            data: result
        })
})


const getAllUser = async(req:Request,res:Response, next:NextFunction)=>{
    try{
    //   throw new AppError(httpStatus.BAD_REQUEST,"fake Error is generated")
       const result = await userServices.getAllUser()
        
        sendResponse(res,{
            success: true,
            statusCode: httpStatus.OK,
            message: "All users Retrived successfully",
            data: result.data,
            meta: result.meta
        })

    }catch(err: any){
        // res.status(httpStatus.BAD_REQUEST).json({message: ` something went wrong from controller ${err.message}`, err})
        next(err)
    }
}

export const userController = {
    createUser,
    getAllUser
}


// function => try catch layer => req & res function