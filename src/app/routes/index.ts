import { Router } from "express";
import { userRoute } from "../modules/user/user.route";

export const router = Router();

const moduleRoutes = [
    {
        path:"/user",
        route: userRoute
    }
    // {
    //     path:"/tour",
    //     route: tourRoute
    // }, 
]


moduleRoutes.forEach((route)=>{
    router.use(route.path, route.route)
})

// router.use("/user", userRoute)
// router.use("/tour", tourRoute)
// router.use("/division", divisionRoute)
// router.use("/booking", bookingRoute)
