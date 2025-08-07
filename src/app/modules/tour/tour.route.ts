import { Request, Response, Router } from "express";
import { tourController } from "./tour.controler";
import { checkAuth } from "../../utils/checkAuth";
import { Role } from "../user/user.interface";
import { createTourZodSchema, updateTourZodSchema } from "./tour.validation";
import { validateCreateUserSchema } from "../../middlewares/validateRequest";
import { multerStorage } from "../../config/multer.config";


const router = Router()


// ---------------------------------------------tour-types routes
router.post("/create-tour-type",tourController.createTourType)

router.get("/tour-types",tourController.getAllTourType)

router.patch("/tour-types/:id",tourController.updateTourType)

router.delete("/tour-types/:id",tourController.deleteTourType)


/* --------------------- TOUR ROUTES ---------------------- */
router.get("/", tourController.getAllTours);

router.post(
    "/create",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    multerStorage.array("files"),
    validateCreateUserSchema(createTourZodSchema),
    tourController.createTour
);

router.patch(
    "/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    multerStorage.array("files"),
    validateCreateUserSchema(updateTourZodSchema),
    tourController.updateTour
);

router.delete("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), tourController.deleteTour);







export const tourRoute = router;