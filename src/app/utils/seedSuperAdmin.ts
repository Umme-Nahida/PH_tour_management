import { envVars } from "../config/env"
import bcryptjs from 'bcryptjs'
import { Users } from "../modules/user/user.model"
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface"


export const seedSuperAdmin = async()=>{

    try{
      
    const isSuperAdmin = await Users.findOne({email: envVars.super_admin_email})
    // console.log("isSuperAdmin",isSuperAdmin)
    // console.log("isSuperAdmin",envVars.super_admin_email)

    if(isSuperAdmin){
         return console.log('super admin is already exists');
    }

    const encryptPass = await bcryptjs.hash(envVars.super_admin_pass as string,Number(envVars.becrypt_salt_round))

    const authProvider: IAuthProvider = {
       provider:"credential",
       providerId: envVars.super_admin_email
    }

    const payload: IUser={
        name:"Developer Nahida",
        email: envVars.super_admin_email,
        role:Role.SUPER_ADMIN,
        password:encryptPass,
        isVerified:true,
        auth:[authProvider]
    }

    const createSuperAdmin =await Users.create(payload);
    console.log("super admin has been created successfully", createSuperAdmin)

    }catch(err){
        console.log(err)
    }
  

}