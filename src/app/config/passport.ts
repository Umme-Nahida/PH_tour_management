import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { envVars } from "./env";
import { Users } from "../modules/user/user.model";
import { isActive, Role } from "../modules/user/user.interface";
import { Strategy as LocalStrategy } from "passport-local";
import bcryptjs from "bcryptjs"



passport.use(
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, async (email: string, password: string, done) => {
        console.log("passport-pass",password)
        try {
            const isUserExist = await Users.findOne({ email })
            console.log("userPass",isUserExist?.password)

            if (!isUserExist) {
                return done(null, false, { message: "user does not exist" })
            }

              if(isUserExist.isVerified === false){
                return done(null, false, { message: "user is not verified"})
            }

            if(isUserExist.isActive === isActive.INACTIVE || isUserExist.isActive === isActive.BLOCKED){
                 return done(null, false, { message:`user is ${isUserExist.isActive}` })
            }

            if(isUserExist.isDeleted){
                return done(null, false, { message: "user is Deleted"})
            }

        

            const isGoogleAutheticate = isUserExist.auth.some(providerObjects=>providerObjects.provider === "google")

             if(isGoogleAutheticate && !isUserExist.password){
                 return done(null, false, {message:"you have authenticated throgh Google. So if you want to login with createntials then at first login with google and set a password for your email and then you can login with email and password"})
             }
           

            const isPasswordMatch = await bcryptjs.compare(password as string, isUserExist?.password as string)

            if (!isPasswordMatch) {
               return  done(null,false,{message: "password does not match"})
            }

            return done(null, isUserExist)
        } catch (err) {
            done(err)
        }
    }
    )
)

passport.use(
    new GoogleStrategy(

        {
            clientID: envVars.GOOGLE_CLIENT_ID,
            clientSecret: envVars.GOOGLE_CLIENT_SECRET,
            callbackURL: envVars.GOOGLE_CALLBACK_URL
        }, async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {

            try {

                const email = profile.emails?.[0].value as string
                if (!email) {
                    return done(null, false, { message: "no email find" })
                }

                let isUserExist = await Users.findOne({ email });

                            if(isUserExist?.isVerified === false){
                return done(null, false, { message: "user is not verified"})
            }

            if(isUserExist?.isActive === isActive.INACTIVE || isUserExist?.isActive === isActive.BLOCKED){
                 return done(null, false, { message:`user is ${isUserExist.isActive}` })
            }

            if(isUserExist?.isDeleted){
                return done(null, false, { message: "user is Deleted"})
            }

                if (!isUserExist) {
                    isUserExist = await Users.create(({
                        email,
                        name: profile.displayName,
                        image: profile.photos?.[0].value,
                        role: Role.USER,
                        isVerified: true,
                        auth: [
                            {
                                provider: "google",
                                providerId: profile.id
                            }
                        ]
                    }))

                    return done(null, isUserExist, { message: "user created successfully known from passport" })
                }


            } catch (err) {
                console.log("google stratagy error", err)
                done(err)
            }
        }
    )
)






passport.serializeUser((user: any, done: (err: any, id: any) => void) => {
    done(null, user.id);
})

passport.deserializeUser((id: string, done: any) => {
    try {
        const user = Users.findById(id)
        done(null, user)
    } catch (err) {
        console.log(err)
    }
})