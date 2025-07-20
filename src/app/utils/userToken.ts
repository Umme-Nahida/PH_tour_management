import { envVars } from "../config/env"
import { IUser } from "../modules/user/user.interface"
import { generateToken } from "./jwt"

export const createUserTokens = (user: Partial<IUser>) => {
    const jwtPayload = {
        userId: user?._id,
        email: user.email,
        role: user.role
    }
    const accessToken = generateToken(jwtPayload, envVars.secret, envVars.expiresIn)

    const refreshToken = generateToken(jwtPayload, envVars.secret, envVars.expiresIn)


    return {
        accessToken,
        refreshToken
    }
}