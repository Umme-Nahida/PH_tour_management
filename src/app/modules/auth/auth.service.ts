import AppError from "../../ErrorHelpers/appError";
import { IUser } from "../user/user.interface";
import { Users } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"


const credentialsLogin = async(payload: Partial<IUser>)=>{
   const {email,password} = payload;

   const isUserExist = await Users.findOne({email})

   if(!isUserExist){
      throw new AppError(httpStatus.BAD_REQUEST,"email does not exist")
   }

   const isPasswordMatch = await bcryptjs.compare(password as string, isUserExist.password as string)
   
    if(!isPasswordMatch){
      throw new AppError(httpStatus.BAD_REQUEST,"password does not match")
   }

   const jwtPayload = {
      userId: isUserExist._id,
      email: isUserExist.email,
      role: isUserExist.role
   }

   const accessToken = jwt.sign(jwtPayload,"sicret",{expiresIn:"1d"})

   return {
     accessToken
   }

}

export const authService = {
    credentialsLogin
}