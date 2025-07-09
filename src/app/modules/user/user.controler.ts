import { Request, Response } from "express";
import { Users } from "./user.model";
import httpStatus from "http-status-codes"


const createUser = async(req:Request,res:Response)=>{
    try{

        const {name,email} = req.body;

        const result = await Users.create({
            name,
            email
        })
        result.save()
        res.status(httpStatus.CREATED).json({
            message: "user created successfully",
            result
        })

    }catch(err: any){
        res.status(httpStatus.BAD_REQUEST).json({"message": ` something went wrong`, err})
    }
}

export const userController = {
    createUser
}