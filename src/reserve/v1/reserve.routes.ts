import { Router, Request, Response } from "express";
import { createReserve, readReserves } from "./reserve.controller";
import { readBook,updateBook } from "../../book/v1/book.controller";

// INIT ROUTES
const reserveRoutes = Router();

// DECLARE ENDPOINT FUNCTIONS
async function reserve(request:Request,response:Response){
    let reserves = await readReserves({book_id:request.body.book_id});
    reserves = reserves.filter((reserve)=>reserve.returned===false);
    if(reserves.length>0){
        return response.status(400).json({
            message: "Book Unavailable"
        });
    }
    
    await createReserve(request.body);
    return response.status(200).json({
        
    });
}
// DECLARE ENDPOINTS
reserveRoutes.post("/new", reserve);

// EXPORT ROUTES
export default reserveRoutes;