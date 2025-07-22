import { Request, Response, Router } from "express";
import { tourController } from "./tour.controler";


const router = Router()
router.post("/create-tour-type",tourController.createTour)

router.get("/tour-types",(req:Request,res:Response)=>{
    console.log("created tour type")
})

router.patch("/tour-types/:id",(req:Request,res:Response)=>{
    console.log("created tour type")
})

router.delete("/tour-types/:id",(req:Request,res:Response)=>{
    console.log("created tour type")
})

export const tourRoute = router;