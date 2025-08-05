import { v2 as cloudinary } from "cloudinary";
import { envVars } from "./env";

// Amader folder -> image -> form data -> File -> Multer -> Amader project / pc te Nijer ekta folder(temporary) -> Req.file

//req.file -> cloudinary(req.file) -> url -> mongoose -> mongodb

cloudinary.config({
    cloud_name: envVars.CLOUDINARY.CLOUDINARY_CLOUD_NAME,
    api_key: envVars.CLOUDINARY.CLOUDINARY_API_KEY,
    api_secret: envVars.CLOUDINARY.CLOUDINARY_API_SECRET
})

export const deletecloudinaryImage = async(url: string)=>{
    //https://res.cloudinary.com/djzppynpk/image/upload/v1753126572/ay9roxiv8ue-1753126570086-download-2-jpg.jpg.jpg

     try{
           const regex = /\/v\d+\/(.*?)\.(jpg|jpeg|png|gif|webp)$/i;
        const match = url.match(regex);

        if(match && match[1]){
            const publicId = match[1];
            await cloudinary.uploader.destroy(publicId)
            console.log(`delete image from cloudinary successfully: ${publicId}`)
        }
     }catch(err){
        console.error("Error failed to delete image from cloudinary:",err)
     }
}

export const cloudinaryUploads = cloudinary





//Multer storage cloudinary
//Amader folder -> image -> form data -> File -> Multer -> storage in cloudinary -> url ->  req.file  -> url  -> mongoose -> mongodb