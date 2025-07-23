
import AppError from "../../ErrorHelpers/appError";
import httpStatus from "http-status-codes"
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";
import { exitToruQuery, searchField } from "./tour.constand";
import { Query } from "mongoose";
import { QueryModel } from "../../utils/QueryBuilder";


const createTour = async(payload:Partial<ITour>)=>{
    const tourInfo = payload;

    const addTour = await Tour.create(tourInfo);
    return addTour;
}


//---------------------- get tour old---------------------
// const getAllTour = async(query: Record<string,string>)=>{
//     console.log(query)
//     const searchTerm = query.searchTerm || "";
//     const sort = query.sort || "-createdAt";
//     const page = Number(query.page) || 1;
//     const limit = Number(query.limit) || 5;
//     const skip = (page - 1) * limit;

//     //--------------------------- this fil filtering will be used when you dont need to all property------------
//     const select = query.select.split(",").join(" ") || "";
   
//     // delete query["searchTerm"]
//     // delete query["sort"]

//     for(const field of exitToruQuery){
//         delete query[field]
//     }
//     // ---------------------created searchArray with dynamically------------------
//     const searchArray = searchField.map(field=>({[field]:{$regex:searchTerm,$options:"i"}}))
    
    
//     // const searchingQuery = {
//     //     $or: searchArray
//     // }
    
//     const allDivision = await Tour.find({
//         // title:{$regex:searchQuery,$options:"i"}

//         // $or:[
//         //     {title:{$regex:searchQuery,$options:"i"}},
//         //     {location:{$regex:searchQuery,$options:"i"}},
//         //     {description:{$regex:searchQuery,$options:"i"}},
//         // ]

//         $or:searchArray
//     }).find(query).sort(sort).select(select).skip(skip).limit(limit);


//     const totalDivision = await Tour.countDocuments()
//     const totalPage = Math.ceil(totalDivision / limit);
//     return {
//         data:allDivision,
//         meta:{
//             page:page,
//             limit:limit,
//             totalPage:totalPage,
//             total: totalDivision
//         }
//     }


// }





// -------------------get All tour-----------------
const getAllTour = async(query: Record<string,string>)=>{
    
    const queryBuilder = new QueryModel(Tour.find(),query)
    const tourResult = await queryBuilder
                      .search(searchField)
                      .filter()
                      .sort()
                      .select()
                      .pagination()
                      .build()

    const metaData = await queryBuilder.getMeta()

    // const queryExecuted = await Promise.all([
    //     queryBuilder.build(),
    //     queryBuilder.getMeta()
    // ])

    // console.log(queryExecuted)
    return {
        data:tourResult,
        meta:metaData
    }


}




// ----------------------------update tour------------------//
const updatetour = async(divisionId:string, payload:Partial<ITour>)=>{
    const isExistDivision = await Tour.findById(divisionId)

    if(!isExistDivision){
      throw new AppError(httpStatus.NOT_FOUND,"this division does not exist")
    }

    const updatedDivision = await Tour.findByIdAndUpdate(divisionId,payload,{new:true})
    return updatedDivision;
}


//----------------------------delete tour--------------------//
const deletedTour = async(divisionId:string)=>{
    const isExistDivision = await Tour.findById(divisionId)

    if(!isExistDivision){
      throw new AppError(httpStatus.NOT_FOUND,"this division does not exist")
    }

    const deleteDivision = await Tour.findByIdAndDelete(divisionId)
    return deleteDivision;
}


// ---------------------------(tour-types)----------// 
const createTourType = async (name: ITourType) => {
    console.log("name:",name)
    const existingTourType = await TourType.findOne({ name: name });

    if (existingTourType) {
        throw new Error("Tour type already exists.");
    }

    return await TourType.create({ name });
};


//--------------------get tour-types----------------
const getAllTourTypes = async () => {
    return await TourType.find();
};

const updateTourType = async (id: string, payload: ITourType) => {
    const existingTourType = await TourType.findById(id);
    if (!existingTourType) {
        throw new Error("Tour type not found.");
    }

    const updatedTourType = await TourType.findByIdAndUpdate(id, payload, { new: true });
    return updatedTourType;
};

const deleteTourType = async (id: string) => {
    const existingTourType = await TourType.findById(id);
    if (!existingTourType) {
        throw new Error("Tour type not found.");
    }

    return await TourType.findByIdAndDelete(id);
};




export const tourServices = {
    createTour,
    getAllTour,
    updatetour,
    deletedTour,
    createTourType,
    getAllTourTypes,
    updateTourType,
    deleteTourType
}