import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"
import { tourServices } from "./tour.services";

const createTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const files = req.files as Express.Multer.File[];
    const payload = {
        ...req.body,
        images: files.map(file => file.path)
    }

    const result = await tourServices.createTour(payload)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "user login successfully",
        data: result

    })

})

const getAllTours = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    const result = await tourServices.getAllTour(query as Record<string, string>)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tours retrieved successfully',
        data: result.data,
        meta: result.meta
    });

});

const updateTour = catchAsync(async (req: Request, res: Response) => {

    const files = req.files as Express.Multer.File[];
    console.log({
        images: files,
        body: req.body
    })
    const payload = {
        ...req.body,
        images: files.map(file => file.path)
    }


    const result = await tourServices.updatetour(req.params.id, payload);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tour updated successfully',
        data: result,
    });
});

const deleteTour = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await tourServices.deletedTour(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tour deleted successfully',
        data: result,
    });
});

const createTourType = catchAsync(async (req: Request, res: Response) => {
    const { name } = req.body;
    const result = await tourServices.createTourType(name)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tour deleted successfully',
        data: result,
    });
})

const getAllTourType = catchAsync(async (req: Request, res: Response) => {
    const result = await tourServices.getAllTourTypes()
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tour deleted successfully',
        data: result,
    });
})


const updateTourType = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const result = await tourServices.updateTourType(id, name);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tour type updated successfully',
        data: result,
    });
});

const deleteTourType = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await tourServices.deleteTourType(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tour type deleted successfully',
        data: result,
    });
});


export const tourController = {
    createTour,
    getAllTours,
    updateTour,
    deleteTour,
    createTourType,
    getAllTourType,
    updateTourType,
    deleteTourType,


}