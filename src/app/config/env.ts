import dotenv from "dotenv";

dotenv.config();

interface IEnvVars {
    port: string,
    DB_Url: string,
    node_env: string
}

const loadEnvVars =(): IEnvVars =>{
   const requiredEnvVars: string[] = ["port", "DB_Url", "node_env"]
   
   requiredEnvVars.forEach(key=>{
       if(!process.env[key]){
           throw new Error(`Missing require environment variable ${key}`)
       }
   })

   return {
    port: process.env.port as string,
    DB_Url: process.env.DB_URL!,
    node_env: process.env.node_env as string
}
}
export const envVars = loadEnvVars()