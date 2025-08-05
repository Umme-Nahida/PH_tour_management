import { NextFunction, Request, Response } from "express"
import { envVars } from "../config/env"
import AppError from "../ErrorHelpers/appError"
import { object } from "zod"
import { deletecloudinaryImage } from "../config/cloudinary.config"

export const globalErrHandler = async(err: any, req: Request, res: Response, next: NextFunction) => {

    if (envVars.node_env === "development") {
        console.log("globalerr:--------", err)
    }
    
    if(req.file){
        await deletecloudinaryImage(req.file.path)
    }


    if (req.files && Array.isArray(req.files) && req.files.length) {
        const imageUrls = (req.files as Express.Multer.File[]).map(file => file.path)

        await Promise.all(imageUrls.map(url => deletecloudinaryImage(url)))
    }

    let status = 500
    let message = `something went wrong ${err.message}`
    let errorSources:any = []

    if (err.name === "ValidationError") {
        status=400
        const errors = Object.values(err.errors)

        errors.forEach((errObj: any) => errorSources.push({
            path: errObj.path,
            message: errObj.message
        }))
        // console.log("path:-------", errorSources)
    }

    //------------------------------------------ handle zod validation err
    else if (err.name === "ZodError") {
        status = 400
        message = "ZodError"

        err.issues.forEach((issue: any) => errorSources.push({
            path: issue.path[0],
            //  path:issue.path[issue.path.length - 1],
            message: issue.message
        }))
    }

    // -----------------------------------------------handle cast Error
  else if (err.name === "CastError") {
        status = 400,
            message = "Please provide valid id"
    }

  else if (err.code === 11000) {

        const dublicate = err.message.match(/"([^"]*)" /)
        status = 400,
            message = `${dublicate[1]} already exists`
    }

    else if (err instanceof AppError) {
        status = err.statusCode,
            message = err.message
    } else if (err instanceof Error) {
        status = 500,
            message = err.message
    }

    // console.log(errorSources)
    res.status(status).json({
        success: false,
        message: message,
        err: envVars.node_env === "development" ? err : null,
        errorSources,
        stack: envVars.node_env === "development" ? err.stack : null
    })
}