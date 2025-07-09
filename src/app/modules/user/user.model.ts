import { model, Schema } from "mongoose";
import { IAuthProvider, isActive, IUser, Role } from "./user.interface";


const authProviderScema = new Schema<IAuthProvider>({
    provider:{type: String, required:true},
    providerId: {type:String, required:true}
},{
    _id: false,
    versionKey: false
})

const userSchema = new Schema<IUser>({
    name: {type: String, requred: true},
    email: {type: String, requred: true, unique:true},
    password: {type:String},
    role: {type: String, enum: Object.values(Role), default: Role.USER},
    phone: {type:String},
    image: {type:String},
    address: {type:String},
    isDeleted: {type:String, default: false},
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