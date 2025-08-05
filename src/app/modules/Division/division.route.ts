
import { Request, Response, Router } from "express";
import { divisionController } from "./division.controller";
import { checkAuth } from "../../utils/checkAuth";
import { Role } from "../user/user.interface";
import { multerStorage } from "../../config/multer.config";
import { validateCreateUserSchema } from "../../middlewares/validateRequest";
import { divisionZodSchema } from "./division.zodSchema";

const router = Router()

router.post("/create",
    // checkAuth(Role.ADMIN,Role.SUPER_ADMIN),
    multerStorage.single("file"),
    validateCreateUserSchema(divisionZodSchema),
    divisionController.createDivision
)

router.get("/",divisionController.getAllDivision)


router.get("/:slug",divisionController.getSingleDivision)
router.patch("/:id", multerStorage.single("file"),
    divisionController.updateDivision)

router.delete("/:id",divisionController.deleteDivision)

export const divisionRoute = router;