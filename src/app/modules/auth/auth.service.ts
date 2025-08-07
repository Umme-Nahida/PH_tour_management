import AppError from "../../ErrorHelpers/appError";
import { IAuthProvider, isActive, IUser } from "../user/user.interface";
import { Users } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken"
import { envVars } from "../../config/env";
import { generateToken, verifyToken } from "../../utils/jwt";
import { sendEmail } from "../../utils/sendEmail";


const credentialsLogin = async (payload: Partial<IUser>) => {
   const { email, password } = payload;

   const isUserExist = await Users.findOne({ email })

   if (!isUserExist) {
      throw new AppError(httpStatus.BAD_REQUEST, "email does not exist")
   }

   const isPasswordMatch = await bcryptjs.compare(password as string, isUserExist.password as string)

   if (!isPasswordMatch) {
      throw new AppError(httpStatus.BAD_REQUEST, "password does not match")
   }

   const jwtPayload = {
      userId: isUserExist._id,
      email: isUserExist.email,
      role: isUserExist.role
   }

   const accessToken = generateToken(jwtPayload, envVars.secret, envVars.expiresIn)
   const refreshToken = generateToken(jwtPayload, envVars.refresh_secret, envVars.refresh_expiresIn)

   const { password: pass, ...rest } = isUserExist.toObject()

   return {
      accessToken,
      refreshToken,
      user: rest
   }

}
const getNewRefreshToken = async (refreshToken: string) => {
   const verifyRefreshToken = verifyToken(refreshToken, envVars.refresh_secret) as JwtPayload

   const isUserExist = await Users.findOne({ email: verifyRefreshToken.email })

   if (!isUserExist) {
      throw new AppError(httpStatus.BAD_REQUEST, "user does not exist")
   }


   if (isUserExist.isActive === isActive.INACTIVE || isUserExist.isActive === isActive.BLOCKED) {
      throw new AppError(httpStatus.BAD_REQUEST, `user is ${isUserExist.isActive}`)
   }

   if (isUserExist.isDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, `user is Deleted`)
   }


   const jwtPayload = {
      userId: isUserExist._id,
      email: isUserExist.email,
      role: isUserExist.role
   }

   const accessToken = generateToken(jwtPayload, envVars.secret, envVars.expiresIn)


   return {
      accessToken
   }

}


// implement reset password
const resetPassword = async (payload: Record<string, any>, decodedToken: JwtPayload) => {

   if(payload._id !== decodedToken.userId){
      throw new AppError(httpStatus.UNAUTHORIZED, "you are not authorized to reset this password")
   }

   const isUserExist = await Users.findById(decodedToken.userId)
   
   if(isUserExist){
      throw new AppError(httpStatus.BAD_REQUEST, "user does not exist")
   }
   const hashedPassword = await bcryptjs.hash(payload.newPass, Number(envVars.becrypt_salt_round))

   if(isUserExist?.password){
      isUserExist.password = hashedPassword;
   }
  
   await isUserExist.save()

   return true
}

const changePassword = async (getOldPass: string, getNewPass: string, decodedToken: JwtPayload) => {



   return {}
}



const setPassword = async (userId: string, password: string) => {
   const user = await Users.findById(userId)

   if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "user does not exist")
   }

   if (user.password && user.auth.some(authObj => authObj.provider === "google")) {
      throw new AppError(httpStatus.BAD_REQUEST, "user already has a password that why you can not set a new password. please reset your password")
   }

   const hashedPassword = await bcryptjs.hash(password, Number(envVars.becrypt_salt_round));

   const credentialsObject: IAuthProvider = {
      provider: "credential",
      providerId: user.email
   }

   const auths = [...user.auth, credentialsObject]

   user.password = hashedPassword;
   user.auth = auths

   return {}
}


const forgetPassword = async (email: string) => {

   if (!email) {
      throw new AppError(httpStatus.BAD_REQUEST, "email is required")
   }

   const isUserExist = await Users.findOne({ email })

   if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, "user does not exist")
   }

   if (isUserExist?.isVerified === false) {
       throw new AppError(httpStatus.BAD_REQUEST, "user is not verified")
   }

   if (isUserExist?.isActive === isActive.INACTIVE || isUserExist?.isActive === isActive.BLOCKED) {
       throw new AppError(httpStatus.BAD_REQUEST,`user is ${isUserExist.isActive}`)
   }

   if (isUserExist?.isDeleted) {
       throw new AppError(httpStatus.BAD_REQUEST, "user is Deleted")
   }

   const jwtPayload = {
      userId: isUserExist._id,
      email: isUserExist.email,
      role: isUserExist.role
   }

   const resetPasswordToken = jwt.sign(jwtPayload, envVars.secret, {expiresIn: "10m"})
   
   const resetPasswordLink = `${envVars.FRONTEND_URL}/reset-password?userId=${isUserExist._id}&token=${resetPasswordToken}`
   sendEmail({
      to: isUserExist.email,
      subject: "Reset Password",
      templateName: "forgetPassword",
      templateData: {
         name: isUserExist.name,
         resetPasswordLink
      }
   })
   return resetPasswordLink
}

export const authService = {
   credentialsLogin,
   getNewRefreshToken,
   resetPassword,
   changePassword,
   setPassword,
   forgetPassword
}