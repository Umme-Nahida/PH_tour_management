import { Types } from "mongoose";

export enum Role{
   SUPER_ADMIN = "SUPER_ADMIN",
   ADMIN = "ADMIN",
   USER = "USER",
   GUIDE = "GUIDE"
}
export interface IAuthProvider{
    provider: string;
    providerId: string;
}

export enum isActive{
    ACTIVE = "ACTIVE",
    INACTIVE= "INACTIVE"
}


export interface IUser{
    name:string;
    email: string;
    password?: string;
    phone?: number;
    image?: string;
    address?: string;
    isActive?: isActive;
    isDeleted?: string;
    isVerified?: string;
    role: Role
    auth: IAuthProvider[]; 
    bookings?: Types.ObjectId[];
    guides?: Types.ObjectId[]

}