import { NextFunction, Request, Response } from "express"
import { envVars } from "../config/env"
import AppError from "../ErrorHelpers/appError"

export const globalErrHandler =(err:any,req:Request,res:Response,next:NextFunction)=>{

    let status = 500
    let message = ` something went wrong ${err.message}`

    if(err instanceof AppError){
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
       stack: envVars.node_env ==="development" ? err.stack : null
    })
}