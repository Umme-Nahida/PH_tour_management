import { model, Schema } from "mongoose";
import { IAuthProvider, isActive, IUser, Role } from "./user.interface";
import { boolean } from "zod";


const authProviderScema = new Schema<IAuthProvider>({
    provider:{type: String, required:true},
    providerId: {type:String, required:true}
},{
    _id: false,
    versionKey: false
})

const userSchema = new Schema<IUser>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    password: {type:String},
    role: {type: String, enum: Object.values(Role), default: Role.USER},
    phone: {type:String},
    image: {type:String},
    address: {type:String},
    isDeleted: {type:Boolean,default:false},
    isActive: {type:String, enum: Object.values(isActive)},
    isVerified: {type: Boolean, default: false},
    auth: {
        type: [authProviderScema]
    }

},{
    versionKey:false,
    timestamps: true
})

export const Users = model<IUser>("users",userSchema)