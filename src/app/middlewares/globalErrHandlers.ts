import { NextFunction, Request, Response } from "express"
import { envVars } from "../config/env"
import AppError from "../ErrorHelpers/appError"
import { object } from "zod"

export const globalErrHandler =(err:any,req:Request,res:Response,next:NextFunction)=>{

    console.log("global:--------",err)

       let errorSources:any=[
        {
            path:"isDeleted",
            message:"validation err isDeteled is boolean"
        }
    ]

    let status = 500
    let message = `something went wrong ${err.message}`
    const errors = Object.values(err.errors)
 
    errors.forEach((errObj:any)=>errorSources.push({
        path:errObj.path,
        message:errObj.message
    }))
    console.log("path:-------",errorSources)

    if(err.name === "CastError"){
        status=400,
        message="Please provide valid id"
    }

    if(err.code === 11000){
        
        const dublicate = err.message.match(/"([^"]*)" /)
        status=400,
        message=`${dublicate[1]} already exists`
    }

   else if(err instanceof AppError){
        status = err.statusCode,
        message= err.message
    }else if(err instanceof Error){
        status = 500, 
        message = err.message
    }

    res.status(status).json({
       success: false,
       message: message, 
       err,
       errorSources,
       stack: envVars.node_env ==="development" ? err.stack : null
    })
}