import { NextFunction, Request, Response } from "express"


type typeAsyncHandler=(req:Request,res:Response, next:NextFunction)=> Promise<void>
export const catchAsync = (fn: typeAsyncHandler)=>(req:Request,res:Response, next:NextFunction)=>{
    Promise.resolve(fn(req,res,next)).catch((err)=>{
        console.log(err)
        next(err)
    })
}
