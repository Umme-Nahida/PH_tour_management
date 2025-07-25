import { Router } from "express";
import { userRoute } from "../modules/user/user.route";
import { authRoute } from "../modules/auth/auth.route";
import { tourRoute } from "../modules/tour/tour.route";
import { divisionRoute } from "../modules/Division/division.route";
import { BookingRoutes } from "../modules/booking/booking.route";
import { PaymentRoutes } from "../modules/payment/payment.route";

export const router = Router();

const moduleRoutes = [
    {
        path:"/user",
        route: userRoute
    },
    {
        path:"/auth",
        route: authRoute
    },
    {
        path:"/division",
        route: divisionRoute
    }, 
    {
        path:"/tour",
        route: tourRoute
    }, 
        {
        path: "/booking",
        route: BookingRoutes
    },
    {
        path: "/payment",
        route: PaymentRoutes
    }
]


moduleRoutes.forEach((route)=>{
    router.use(route.path, route.route)
})

// router.use("/user", userRoute)
// router.use("/tour", tourRoute)
// router.use("/division", divisionRoute)
// router.use("/booking", bookingRoute)
