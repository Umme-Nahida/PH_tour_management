import AppError from "../../ErrorHelpers/appError";
import { IAuthProvider, isActive, IUser, Role } from "./user.interface";
import { Users } from "./user.model";
import httpStatus from "http-status-codes"
import becryptjs from "bcryptjs"
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";



const addUser = async(payload: Partial<IUser>)=>{

      const {email,password,...rest} = payload;
      console.log("addUserPayload",payload)

      const exceedUser = await Users.findOne({email})

      if(exceedUser){
        throw new AppError(httpStatus.BAD_REQUEST, "User already exceed")
      }

      const hashedPassword = await becryptjs.hash(password as string,Number(envVars.becrypt_salt_round))

      const authProvider: IAuthProvider = {provider:'credential', providerId:email as string}

         const addUser = await Users.create({
             email,
             password: hashedPassword,
             auth: [authProvider],
             ...rest
         })
     
        return addUser

}

const getAllUser = async()=>{

        const getUsers = await Users.find()
        const totalUser = await Users.countDocuments()
        return {
            data: getUsers,
            meta: {total: totalUser}
        }

}


const getMe = async(userId: string)=>{

     const user = await Users.findById(userId).select("-password");
     
     if(user?.isDeleted || user?.isActive === isActive.BLOCKED || !user){
        throw new AppError(httpStatus.BAD_REQUEST, "user is not found or deleted or blocked")
     }
   
     return {
        data: user
     }
    

}

const updateUser =async (userId:string, userInfo: Partial<IUser>, decodedToken:JwtPayload)=>{

    const isUserExist = await Users.findById(userId)
    console.log("isUserExist",isUserExist)
    if(!isUserExist){
            throw new AppError(httpStatus.NOT_FOUND,"user not found ")
    }


    if(userInfo.role){
        if(userInfo.role === Role.USER || decodedToken.role === Role.GUIDE){
            throw new AppError(httpStatus.BAD_REQUEST,"you are anAuthorized")
        }

        if(userInfo.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN){
            throw new AppError(httpStatus.BAD_REQUEST,"you are anAuthorized")
        }
    }

    if(userInfo.isActive || userInfo.isDeleted || userInfo.isVerified){

          if(decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE){
            throw new AppError(httpStatus.BAD_REQUEST,"you are anAuthorized")
        }
    }

    if(userInfo.password){
         userInfo.password = await becryptjs.hash(userInfo.password as string,Number(envVars.becrypt_salt_round))
    }

    const updateNewUser = await Users.findByIdAndUpdate(userId,userInfo,{new: true})
    return updateNewUser;
}


export const userServices = {
    addUser,
    getAllUser,
    updateUser,
    getMe
}