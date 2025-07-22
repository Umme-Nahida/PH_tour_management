
import { Request, Response } from "express";
import { router } from "../../routes";
import { divisionController } from "./division.controller";
import { checkAuth } from "../../utils/checkAuth";
import { Role } from "../user/user.interface";

router.post("/create",
    checkAuth(Role.ADMIN,Role.SUPER_ADMIN),
    divisionController.createDivisionType
)

router.get("/",divisionController.getAllDivision)


router.patch("/:id",divisionController.updateDivision)

router.delete("/:id",divisionController.deleteDivision)

export const tourRoute = router;