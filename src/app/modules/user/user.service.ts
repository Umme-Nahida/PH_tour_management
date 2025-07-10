import { IUser } from "./user.interface";
import { Users } from "./user.model";


const addUser = async(payload: Partial<IUser>)=>{

      const {name,email} = payload;

        const addUser = await Users.create({
            name,
            email
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