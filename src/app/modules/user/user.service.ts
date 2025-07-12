import AppError from "../../ErrorHelpers/appError";
import { IAuthProvider, IUser } from "./user.interface";
import { Users } from "./user.model";
import httpStatus from "http-status-codes"
import becryptjs from "bcryptjs"


const addUser = async(payload: Partial<IUser>)=>{

      const {name,email,password,...rest} = payload;

      const exceedUser = await Users.findOne({email})

      if(exceedUser){
        throw new AppError(httpStatus.BAD_REQUEST, "User already exceed")
      }

      const hashedPassword = await becryptjs.hash(password as string,10)

      const authProvider: IAuthProvider = {provider:'credential', providerId:email as string}

         const addUser = await Users.create({
             name,
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

export const userServices = {
    addUser,
    getAllUser
}