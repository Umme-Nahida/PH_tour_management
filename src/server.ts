import { Server } from "http"
import mongoose from "mongoose"
import app from "./app"
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";
import { connectRedis } from "./app/config/redis.config";

const port = 5000

let server: Server;
let user;

const startServer = async () => {

    try {
        
        await mongoose.connect(envVars.DB_Url);
        console.log('mongoose connected successfully')
        console.log(envVars.DB_Url)
        server = app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })

    } catch (err) {
        console.log(err)
    }
}

(async()=>{
   await connectRedis();
   await startServer();
   await seedSuperAdmin()
}
)()



process.on('SIGTERM',()=>{

    console.log('sigtern is recieved and shutting down our server..');
    
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})

process.on('SIGINT',()=>{

    console.log('SIGINT SIGNAL is recieved and shutting down our server..');
    
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})

process.on('unhandledRejection',(err)=>{

    console.log('unhandleRejection error is detected',err);
    
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})

// uncaght rejection err handling
process.on('uncaughtException',(err)=>{

    console.log('uncaughtException error is detected',err);
    
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})

// Promise.reject(new Error("I forgot to handle promise err"))
// throw new Error("I forgot to handle uncaght error")

// unhandle rejection error 
// uncaght rejection error
// signal termination (sigterm)