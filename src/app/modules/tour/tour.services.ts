
import AppError from "../../ErrorHelpers/appError";
import httpStatus from "http-status-codes"
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";


const createTour = async(payload:Partial<ITour>)=>{
    const tourInfo = payload;

    const addTour = await Tour.create(tourInfo);
    return addTour;
}

const getAllTour = async(query: Record<string,string>)=>{
    console.log(query)
    const searchQuery = query.searchTerm || "";
    const searchField = ["title","location","description"]

    // created searchArray with dynamically 
    const searchArray = searchField.map(field=>({[field]:{$regex:searchQuery,$options:"i"}}))
    
    const allDivision = await Tour.find({
        // title:{$regex:searchQuery,$options:"i"}

        // $or:[
        //     {title:{$regex:searchQuery,$options:"i"}},
        //     {location:{$regex:searchQuery,$options:"i"}},
        //     {description:{$regex:searchQuery,$options:"i"}},
        // ]

        $or:searchArray
    });
    const totalDivision = await Tour.countDocuments()
    return {
        data:allDivision,
        meta:{
            total: totalDivision
        }
    }
}

const updatetour = async(divisionId:string, payload:Partial<ITour>)=>{
    const isExistDivision = await Tour.findById(divisionId)

    if(!isExistDivision){
      throw new AppError(httpStatus.NOT_FOUND,"this division does not exist")
    }

    const updatedDivision = await Tour.findByIdAndUpdate(divisionId,payload,{new:true})
    return updatedDivision;
}

const deletedTour = async(divisionId:string)=>{
    const isExistDivision = await Tour.findById(divisionId)

    if(!isExistDivision){
      throw new AppError(httpStatus.NOT_FOUND,"this division does not exist")
    }

    const deleteDivision = await Tour.findByIdAndDelete(divisionId)
    return deleteDivision;
}


// ---------------------------tour-types 
const createTourType = async (name: ITourType) => {
    console.log("name:",name)
    const existingTourType = await TourType.findOne({ name: name });

    if (existingTourType) {
        throw new Error("Tour type already exists.");
    }

    return await TourType.create({ name });
};

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