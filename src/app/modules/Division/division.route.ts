
import { Request, Response } from "express";
import { router } from "../../routes";
import { divisionController } from "./division.controller";

router.post("/create",divisionController.createDivisionType)

router.get("/",divisionController.getAllDivision)


router.patch("/:id",divisionController.updateDivision)

router.delete("/:id",divisionController.deleteDivision)

export const tourRoute = router;