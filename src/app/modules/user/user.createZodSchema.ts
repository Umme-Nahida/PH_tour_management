import z, { object } from "zod";
import { isActive, Role } from "./user.interface";


export const createZodSchema = z.object({
        name: z.string({ invalid_type_error: "name must be string" }).min(2, { message: "minimum 2 characters is required" }).max(50, { message: "max character is 50" }),
        email: z.string().email(),
        password: z.string().min(8).regex(/^(?=.*[A-Z])/, { message: "Password must contain 1 uppercase" })
            .regex(/^(?=.*[!@#$%^&*])/, { message: "password must be contain 1 spcecial characters" })
            .regex(/^(?=.*\d)/, { message: "password must contain at least 1 number" })
            .optional(),
        phone: z.string({ invalid_type_error: "Phone number must be a string" })
            .regex(/^(?:\+8801\d{9}|01\d{9})$/, { message: "Phone number must be valid for Bangladesh, format: +8801XXXXXXXXX or 01XXXXXXXXX" })
            .optional(),
        address: z.string({ invalid_type_error: "adrees must be a string" }).min(200, { message: "address can not exceed 200 characters" }).optional(),
         isDeleted: z.boolean({message:"isDeleted must be true or false"}).optional(),
        isVerified: z.boolean({message:"isVerified must be true or false"}).optional(),
    })


export const updateZodSchema = z.object({
        name: z.string({ invalid_type_error: "name must be string" }).min(2, { message: "minimum 2 characters is required" }).max(50, { message: "max character is 50" }).optional(),
        password: z.string().min(8).regex(/^(?=.*[A-Z])/, { message: "Password must contain 1 uppercase" })
            .regex(/^(?=.*[!@#$%^&*])/, { message: "password must be contain 1 spcecial characters" })
            .regex(/^(?=.*\d)/, { message: "password must contain at least 1 number" })
            .optional(),
        phone: z.string({ invalid_type_error: "Phone number must be a string" })
            .regex(/^(?:\+8801\d{9}|01\d{9})$/, { message: "Phone number must be valid for Bangladesh, format: +8801XXXXXXXXX or 01XXXXXXXXX" })
            .optional(),
        isActive: z.enum(Object.values(isActive) as [string]).optional(),
        isDeleted: z.boolean({message:"isDeleted must be true or false"}).optional(),
        isVerified: z.boolean({message:"isVerified must be true or false"}).optional(),
        role: z.enum(Object.values(Role) as [string]).optional(),
        address: z.string({ invalid_type_error: "adrees must be a string" }).min(200, { message: "address can not exceed 200 characters" })
        .optional()
    })