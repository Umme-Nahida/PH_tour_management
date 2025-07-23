import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"
import { catchAsync } from "../../utils/catchAsync";
import { divisionServices } from "./division.service";

const createDivision = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const division = await divisionServices.createDivision(req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "division created successfully",
        data: division
    })
})


const getAllDivision = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const division = await divisionServices.getAllDivision();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "division retrive successfully",
        data: division
    })
})
const getSingleDivision = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.slug;
    console.log(slug)
    const division = await divisionServices.getSignleDivision(slug)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Single division is retrive successfully",
        data: division
    })
})

const updateDivision = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const divisionInfo = req.body;

    const division = await divisionServices.updateDivision(id, divisionInfo)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "division updated successfully",
        data: division
    })
})


const deleteDivision = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const divisionInfo = req.body;
    const division:any = await divisionServices.updateDivision(id, divisionInfo)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: " division deleted successfully",
        data: division.data,
        meta:division.meta
    })
})



export const divisionController = {
    createDivision,
    getAllDivision,
    getSingleDivision,
    updateDivision,
    deleteDivision
}