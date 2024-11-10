import { Router, Request, Response } from "express";
import { createReserve, readReserves, endReserve } from "./reserve.controller";
import { readBook, updateBook } from "../../book/v1/book.controller";
import { AuthMiddleware } from "../../middleware/auth";
import { ReserveAuthMiddleware } from "../../middleware/reserve_auth";

// INIT ROUTES
const reserveRoutes = Router();

// DECLARE ENDPOINT FUNCTIONS
async function reserve(request: Request, response: Response) {
    let reserves = await readReserves({ book_id: request.body.book_id, returned: false });

    if (reserves.length > 0) {
        return response.status(400).json({
            message: "Book Unavailable"
        });
    }

    await createReserve(request.body);
    return response.status(200).json({
        message: "Book reserved successfully"
    });
}
async function EndReserve(request: Request, response: Response) {
    let reserve = await endReserve(request.body.book_id);
    if (reserve === null) {
        return response.status(400).json({ message: "Something went wrong." });
    }
    return response.status(200).json({
        message: "Book returned.",
        info: reserve
    });
}
// DECLARE ENDPOINTS
reserveRoutes.post("/new", ReserveAuthMiddleware, reserve);
reserveRoutes.patch("/return", AuthMiddleware,EndReserve);

// EXPORT ROUTES
export default reserveRoutes;