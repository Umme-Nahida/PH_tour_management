
import AppError from "../../ErrorHelpers/appError";
import httpStatus from "http-status-codes"
import { ITour } from "./tour.interface";
import { Tour } from "./tour.model";


const createTour = async(payload:Partial<ITour>)=>{
    const tourInfo = payload;

    const addTour = await Tour.create(tourInfo);
    return addTour;
}

const getAllTour = async()=>{

    const allDivision = await Tour.find();
    return allDivision;
}

const updatetour = async(divisionId:string, payload:Partial<ITour>)=>{
    const isExistDivision = await Tour.findById(divisionId)

    if(!isExistDivision){
      throw new AppError(httpStatus.NOT_FOUND,"this division does not exist")
    }

    const updatedDivision = await Tour.findByIdAndUpdate(divisionId,payload,{new:true})
    return updatedDivision;
}


const deletedTour = async(divisionId:string, payload:Partial<ITour>)=>{
    const isExistDivision = await Tour.findById(divisionId)

    if(!isExistDivision){
      throw new AppError(httpStatus.NOT_FOUND,"this division does not exist")
    }

    const deleteDivision = await Tour.findByIdAndDelete(divisionId,payload)
    return deleteDivision;
}

export const tourServices = {
    createTour,
    getAllTour,
    updatetour,
    deletedTour
}