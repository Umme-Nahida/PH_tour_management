import AppError from "../../ErrorHelpers/appError";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";
import httpStatus from "http-status-codes"


const createDivision = async(payload:IDivision)=>{
    const division = payload;

    const isExistDivision = await Division.findOne({name:payload.name})

    if(isExistDivision){
        throw new AppError(httpStatus.BAD_REQUEST,"A Division with this name already exist ")
    }

    //   const baseSlug = payload.name?.toLocaleLowerCase().split(" ").join("-")

    //  let slug = `${baseSlug}-division`;
    //  let counter = 0
    // while(await Division.exists({slug})){
    //     slug =  `${slug}-${counter++}`
    // }

    // payload.slug = slug;

    const addDivision = await Division.create(division);
    return addDivision;
}

const getAllDivision = async()=>{

    const allDivision = await Division.find({});
    const countDivision = await Division.countDocuments()
    return {
        data:allDivision,
        meta:{
            total: countDivision
        }
    };
}

const updateDivision = async(divisionId:string, payload:Partial<IDivision>)=>{
    const isExistDivision = await Division.findById(divisionId)

    if(!isExistDivision){
      throw new AppError(httpStatus.NOT_FOUND,"this division does not exist")
    }

    // -------------check is this division already exist in another id 
    const dublicateDivision = await Division.findOne({
        name: payload.name,
        _id: {$ne:divisionId}
    })
    
    if(dublicateDivision){
        throw new AppError(httpStatus.NOT_FOUND,"this division is already exist")
    }

    //--------------------------------- what is purpose of runValidators: true
    const updatedDivision = await Division.findByIdAndUpdate(divisionId,payload,{new:true,runValidators:true})
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