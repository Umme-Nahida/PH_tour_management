
import { Request, Response, Router } from "express";
import { divisionController } from "./division.controller";
import { checkAuth } from "../../utils/checkAuth";
import { Role } from "../user/user.interface";

const router = Router()

router.post("/create",
    // checkAuth(Role.ADMIN,Role.SUPER_ADMIN),
    divisionController.createDivision
)

router.get("/",divisionController.getAllDivision)


router.get("/:slug",divisionController.getSingleDivision)
router.patch("/:id",divisionController.updateDivision)

router.delete("/:id",divisionController.deleteDivision)

export const divisionRoute = router;