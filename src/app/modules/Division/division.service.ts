import AppError from "../../ErrorHelpers/appError";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";
import httpStatus from "http-status-codes"


const createDivision = async(payload:Partial<IDivision>)=>{
    const division = payload;

    const addDivision = await Division.create(division);
    return addDivision;
}

const getAllDivision = async()=>{

    const allDivision = await Division.find();
    return allDivision;
}

const updateDivision = async(divisionId:string, payload:Partial<IDivision>)=>{
    const isExistDivision = await Division.findById(divisionId)

    if(!isExistDivision){
      throw new AppError(httpStatus.NOT_FOUND,"this division does not exist")
    }

    const updatedDivision = await Division.findByIdAndUpdate(divisionId,payload,{new:true})
    return updatedDivision;
}


const deletedDivision = async(divisionId:string, payload:Partial<IDivision>)=>{
    const isExistDivision = await Division.findById(divisionId)

    if(!isExistDivision){
      throw new AppError(httpStatus.NOT_FOUND,"this division does not exist")
    }

    const deleteDivision = await Division.findByIdAndDelete(divisionId,payload)
    return deleteDivision;
}


export const divisionServices= {
    createDivision,
    getAllDivision,
    updateDivision,
    deletedDivision
}